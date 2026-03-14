import { NextResponse } from "next/server";
import { AssistantContext, chatWithAssistant, ChatMessage } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_PROMPT_MESSAGES = 12;
const MAX_HISTORY_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 2000;
const GREETING_WORDS = new Set([
  "hi",
  "hello",
  "hey",
  "yo",
  "sain",
  "sainuu",
  "sain uu",
]);

type DbMessageRow = {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
};

let ensureHistoryTablePromise: Promise<void> | null = null;

// Клиентээс ирсэн messages массивыг цэвэрлэж, урт/тоо хэмжээний хязгаар тавина.
function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((item): item is { role?: unknown; content?: unknown } => Boolean(item))
    .map((item): ChatMessage => ({
      role: item.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: typeof item.content === "string" ? item.content.trim() : "",
    }))
    .filter((item) => item.content.length > 0)
    .map((item) => ({
      ...item,
      content:
        item.content.length > MAX_MESSAGE_LENGTH
          ? item.content.slice(0, MAX_MESSAGE_LENGTH)
          : item.content,
    }))
    .slice(-MAX_PROMPT_MESSAGES);
}

// Нэг мессежийг шалгаж, trim хийж, уртыг хязгаарлаж буцаана.
function sanitizeSingleMessage(raw: unknown): string | null {
  if (typeof raw !== "string") return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  return trimmed.length > MAX_MESSAGE_LENGTH
    ? trimmed.slice(0, MAX_MESSAGE_LENGTH)
    : trimmed;
}

// Request body-оос хэрэглэгчийн сүүлийн мессежийг олж авна (хуучин формат дэмжинэ).
function getUserMessageFromBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const payload = body as { message?: unknown; messages?: unknown };

  const directMessage = sanitizeSingleMessage(payload.message);
  if (directMessage) return directMessage;

  const legacyMessages = sanitizeMessages(payload.messages);
  const lastUserMessage = [...legacyMessages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  return sanitizeSingleMessage(lastUserMessage ?? null);
}

// AI-д дамжуулах контекстийг шүүн, утгын уртыг хязгаарлана.
function sanitizeContext(raw: unknown): AssistantContext | undefined {
  if (!raw || typeof raw !== "object") return undefined;

  const context = raw as { personalityType?: unknown; career?: unknown };
  return {
    personalityType:
      typeof context.personalityType === "string"
        ? context.personalityType.slice(0, 30)
        : undefined,
    career:
      typeof context.career === "string" ? context.career.slice(0, 100) : undefined,
  };
}

// Мэндчилгээ танихын тулд текстийг normalize хийнэ (үсэг/тоон бус тэмдэг арилгана).
function normalizeMessage(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Мессеж зөвхөн мэндчилгээ эсэхийг шалгана.
function isGreetingOnly(input: string): boolean {
  const normalized = normalizeMessage(input);
  if (!normalized) return false;

  if (GREETING_WORDS.has(normalized)) return true;

  const tokens = normalized.split(" ");
  if (tokens.length <= 3 && GREETING_WORDS.has(tokens[0])) {
    return true;
  }

  if (tokens.length === 2 && tokens[0] === "sain" && tokens[1] === "uu") {
    return true;
  }

  return false;
}

// Нэрийг уншихад амар болгохын тулд үг бүрийн эхний үсгийг том болгоно.
function titleCase(input: string): string {
  return input
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Email-ийн local хэсгээс дэлгэцэнд харуулах нэр үүсгэнэ.
function getDisplayNameFromEmail(email?: string): string | undefined {
  if (!email) return undefined;

  const localPart = email.split("@")[0]?.trim();
  if (!localPart) return undefined;

  return titleCase(localPart.replace(/[._-]+/g, " "));
}

// DB-аас нэр олж, байхгүй бол email-оос нэр гаргана.
async function getGreetingName(user?: { userId: string; email: string } | null): Promise<string | undefined> {
  if (!user) return undefined;

  try {
    const profile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { name: true, email: true },
    });

    const dbName = profile?.name?.trim();
    if (dbName) return dbName.slice(0, 40);

    return getDisplayNameFromEmail(profile?.email || user.email);
  } catch {
    return getDisplayNameFromEmail(user.email);
  }
}

// Монгол хэлтэй эсэхийг таньж мэндчилгээг Монгол/Англи болгоно.
function shouldUseMongolianGreeting(input: string): boolean {
  if (/[А-Яа-яӨөҮүЁё]/.test(input)) return true;

  const normalized = normalizeMessage(input);
  if (!normalized) return false;

  const mongolianGreetingPatterns = new Set([
    "sain",
    "sainuu",
    "sain uu",
    "sain baina uu",
    "sain bn uu",
    "mend uu",
  ]);

  if (mongolianGreetingPatterns.has(normalized)) return true;

  const tokens = normalized.split(" ");
  return tokens[0] === "sain" || tokens[0] === "mend";
}

// Мэндчилгээний богино, ойлгомжтой хариуг үүсгэнэ.
function buildGreetingResponse(
  userMessage: string,
  context?: AssistantContext,
  name?: string
): string {
  if (shouldUseMongolianGreeting(userMessage)) {
    const greeting = name ? `Сайн уу, ${name}!` : "Сайн уу!";
    const topic = context?.career
      ? `${context.career}-ийн талаар`
      : "мэргэжил, ур чадварын тест эсвэл roadmap-ын талаар";
    return `${greeting} Би таны AI Career Assistant байна. Та ${topic} юу асуумаар байна?`;
  }

  const greeting = name ? `Hi ${name}!` : "Hi!";
  const topic = context?.career
    ? `about ${context.career}`
    : "about career, skill test, or roadmap";
  return `${greeting} I am your AI Career Assistant. What would you like to ask ${topic}?`;
}

// AI ажиллахгүй үед fallback зөвлөгөө бэлдэнэ.
function buildFallbackResponse(message: string, context?: AssistantContext): string {
  const topic = context?.career ? `${context.career} career` : "career path";
  const personality = context?.personalityType
    ? `Your ${context.personalityType} personality can be an advantage when you stay consistent.`
    : "Pick a direction, build one project, and improve from feedback.";

  return [
    `I cannot reach the AI service right now, but here is a quick guide for your question about "${message.slice(0, 120)}":`,
    `1. Focus on one ${topic} goal for the next 30 days.`,
    "2. Learn one core skill and apply it in a small real project.",
    "3. Share that project publicly (GitHub/portfolio) and request feedback.",
    `4. ${personality}`,
    "",
    "Send your exact goal and current level, and I will give you a step-by-step plan.",
  ].join("\n");
}

// DB-д хадгалагдсан role-ийг "user"/"assistant" болгож хэвийн болгоно.
function normalizeDbRole(role: string): "user" | "assistant" {
  return role === "assistant" ? "assistant" : "user";
}

// Чат түүхийн хүснэгт/индексийг DB дээр үүсгэж баталгаажуулна.
async function ensureHistoryTable(): Promise<void> {
  if (!ensureHistoryTablePromise) {
    ensureHistoryTablePromise = (async () => {
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "AiChatMessage" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "role" TEXT NOT NULL,
          "content" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "AiChatMessage_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "AiChatMessage_userId_fkey" FOREIGN KEY ("userId")
            REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        )
      `;

      await prisma.$executeRaw`
        CREATE INDEX IF NOT EXISTS "AiChatMessage_userId_createdAt_idx"
        ON "AiChatMessage" ("userId", "createdAt")
      `;
    })().catch((error) => {
      ensureHistoryTablePromise = null;
      throw error;
    });
  }

  await ensureHistoryTablePromise;
}

// Хэрэглэгчийн чат түүхийг DB-ээс авч, уртыг хязгаарлан буцаана.
async function getHistory(userId: string): Promise<ChatMessage[]> {
  const rows = await prisma.$queryRaw<DbMessageRow[]>`
    SELECT "id", "role", "content", "createdAt"
    FROM (
      SELECT "id", "role", "content", "createdAt"
      FROM "AiChatMessage"
      WHERE "userId" = ${userId}
      ORDER BY
        "createdAt" DESC,
        CASE WHEN "role" = 'assistant' THEN 1 ELSE 0 END DESC,
        "id" DESC
      LIMIT ${MAX_HISTORY_MESSAGES}
    ) AS "recent"
    ORDER BY
      "createdAt" ASC,
      CASE WHEN "role" = 'user' THEN 0 ELSE 1 END ASC,
      "id" ASC
  `;

  return rows.map((row) => ({
    role: normalizeDbRole(row.role),
    content:
      row.content.length > MAX_MESSAGE_LENGTH
        ? row.content.slice(0, MAX_MESSAGE_LENGTH)
        : row.content,
  }));
}

// Шинэ мессежүүдийг DB-д багцаар нэмнэ.
async function appendHistory(userId: string, entries: ChatMessage[]): Promise<void> {
  if (entries.length === 0) return;

  const startedAt = Date.now();
  await prisma.$transaction(
    entries.map((entry, index) =>
      prisma.$executeRaw`
        INSERT INTO "AiChatMessage" ("id", "userId", "role", "content", "createdAt")
        VALUES (
          ${crypto.randomUUID()},
          ${userId},
          ${entry.role},
          ${entry.content},
          ${new Date(startedAt + index)}
        )
      `
    )
  );
}

// Хэрэглэгчийн чат түүхийг бүрэн цэвэрлэнэ.
async function clearHistory(userId: string): Promise<void> {
  await prisma.$executeRaw`
    DELETE FROM "AiChatMessage"
    WHERE "userId" = ${userId}
  `;
}

// Чат түүхийг уншиж буцаана.
export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureHistoryTable();
    const messages = await getHistory(currentUser.userId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("AI chat history load error:", error);
    return NextResponse.json(
      { error: "Failed to load chat history" },
      { status: 500 }
    );
  }
}

// Чат түүхийг цэвэрлээд хоосон түүх буцаана.
export async function DELETE() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureHistoryTable();
    await clearHistory(currentUser.userId);
    return NextResponse.json({ success: true, messages: [] });
  } catch (error) {
    console.error("AI chat history clear error:", error);
    return NextResponse.json(
      { error: "Failed to clear chat history" },
      { status: 500 }
    );
  }
}

// Хэрэглэгчийн мессежийг авч AI-гаас хариу үүсгэж хадгална.
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const userMessage = getUserMessageFromBody(body);
    const context = sanitizeContext((body as { context?: unknown })?.context);

    if (!userMessage) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await ensureHistoryTable();
    const history = await getHistory(currentUser.userId);
    const userEntry: ChatMessage = { role: "user", content: userMessage };
    const promptMessages = [...history, userEntry].slice(-MAX_PROMPT_MESSAGES);

    let assistantResponse = "";
    let source: "preset-greeting" | "fallback" | "gemini" = "fallback";

    if (isGreetingOnly(userMessage)) {
      const greetingName = await getGreetingName(currentUser);
      assistantResponse = buildGreetingResponse(userMessage, context, greetingName);
      source = "preset-greeting";
    } else if (!process.env.GEMINI_API_KEY) {
      assistantResponse = buildFallbackResponse(userMessage, context);
      source = "fallback";
    } else {
      try {
        assistantResponse = await chatWithAssistant(promptMessages, context);
        source = "gemini";
      } catch (error) {
        console.error("Gemini chat error:", error);
        assistantResponse = buildFallbackResponse(userMessage, context);
        source = "fallback";
      }
    }

    const assistantEntry: ChatMessage = {
      role: "assistant",
      content: assistantResponse,
    };

    await appendHistory(currentUser.userId, [userEntry, assistantEntry]);
    const messages = [...history, userEntry, assistantEntry].slice(-MAX_HISTORY_MESSAGES);

    return NextResponse.json({
      response: assistantResponse,
      source,
      messages,
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
