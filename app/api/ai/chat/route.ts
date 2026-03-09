import { NextResponse } from "next/server";
import { AssistantContext, chatWithAssistant, ChatMessage } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1500;
const GREETING_WORDS = new Set([
  "hi",
  "hello",
  "hey",
  "yo",
  "sain",
  "sainuu",
  "sain uu",
]);

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
    .slice(-MAX_MESSAGES);
}

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

function normalizeMessage(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

function titleCase(input: string): string {
  return input
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getDisplayNameFromEmail(email?: string): string | undefined {
  if (!email) return undefined;

  const localPart = email.split("@")[0]?.trim();
  if (!localPart) return undefined;

  return titleCase(localPart.replace(/[._-]+/g, " "));
}

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

function buildGreetingResponse(
  context?: AssistantContext,
  name?: string
): string {
  const greeting = name ? `Hi ${name}!` : "Hi!";
  const topic = context?.career
    ? `about ${context.career}`
    : "about career, skill test, or roadmap";

  return `${greeting} I am your AI Career Assistant. What would you like to ask ${topic}?`;
}

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = sanitizeMessages(body?.messages);
    const context = sanitizeContext(body?.context);
    const currentUser = await getCurrentUser();

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "career guidance";

    if (isGreetingOnly(lastUserMessage)) {
      const greetingName = await getGreetingName(currentUser);
      return NextResponse.json({
        response: buildGreetingResponse(context, greetingName),
        source: "preset-greeting",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: buildFallbackResponse(lastUserMessage, context),
        source: "fallback",
      });
    }

    try {
      const response = await chatWithAssistant(messages, context);
      return NextResponse.json({
        response,
        source: "gemini",
      });
    } catch (error) {
      console.error("Gemini chat error:", error);
      return NextResponse.json({
        response: buildFallbackResponse(lastUserMessage, context),
        source: "fallback",
      });
    }
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
