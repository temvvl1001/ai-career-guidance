import { GoogleGenAI, type Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL?.trim(),
  ...(process.env.GEMINI_MODELS || "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean),
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
].filter(Boolean) as string[];

function getCandidateModels(): string[] {
  return [...new Set(MODEL_CANDIDATES)];
}

function isModelUnavailableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const err = error as { status?: number; message?: string };
  const status = err.status || 0;
  const message = (err.message || "").toLowerCase();

  if (status === 404) return true;
  if (status === 400 && message.includes("model")) return true;

  return (
    message.includes("not found") ||
    message.includes("not supported") ||
    message.includes("call listmodels") ||
    message.includes("unknown model")
  );
}

function extractText(response: { text?: string; candidates?: { content?: { parts?: { text?: string }[] } }[] }): string {
  const directText = response.text?.trim();
  if (directText) return directText;

  const parts = response.candidates?.[0]?.content?.parts || [];
  const fallbackText = parts.map((part) => part.text || "").join("").trim();
  return fallbackText || "I could not generate a response. Please try again.";
}

async function runWithModelFallback<T>(task: (modelName: string) => Promise<T>): Promise<T> {
  const models = getCandidateModels();
  let lastError: unknown;

  for (const modelName of models) {
    try {
      return await task(modelName);
    } catch (error) {
      lastError = error;
      if (isModelUnavailableError(error)) {
        console.warn(`Gemini model unavailable: ${modelName}. Trying next model.`);
        continue;
      }
      throw error;
    }
  }

  if (lastError instanceof Error) {
    throw new Error(`No available Gemini model. Last error: ${lastError.message}`);
  }
  throw new Error("No available Gemini model.");
}

export interface AssistantContext {
  personalityType?: string;
  career?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateCareerAdvice(params: {
  career: string;
  personalityType: string;
  skillScore: number;
}): Promise<string> {
  const prompt = `You are a career guidance expert. Provide personalized advice for the following:

User wants to become: ${params.career}
Personality type (MBTI): ${params.personalityType}
Skill test score: ${params.skillScore}%

Please provide a structured response with:
1. **Learning Roadmap** - A step-by-step plan (3-6 months) to develop the necessary skills
2. **Recommended Courses/Resources** - Specific courses, platforms, or resources to consider
3. **Skills to Improve** - Key skills to focus on based on their current level
4. **Career Tips** - Practical advice for someone with their personality type entering this field

Keep the response concise but actionable. Use markdown formatting for readability.`;

  return runWithModelFallback(async (modelName) => {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return extractText(response);
  });
}

export async function chatWithAssistant(
  messages: ChatMessage[],
  context?: AssistantContext
): Promise<string> {
  const cleanMessages = messages
    .filter((message) => message && typeof message.content === "string")
    .map((message): ChatMessage => ({
      role: message.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: message.content.trim(),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-12);

  const systemContext = context
    ? `Context: User's personality type is ${context.personalityType || "unknown"}. Interested in ${context.career || "career exploration"}.`
    : "";

  const historyMessages = cleanMessages.slice(0, -1);
  const baseHistory: Content[] = [
    {
      role: "user",
      parts: [
        {
          text: `You are an AI Career Assistant. ${systemContext} Help users with career guidance, skill development, and job market insights. Reply in the same language as the user's latest message. Keep answers concise and actionable.`,
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "I'm your AI Career Assistant! I can help you with career guidance, skill development, and exploring opportunities. How can I assist you today?" }],
    },
  ];

  const history: Content[] = [...baseHistory];

  for (const message of historyMessages.slice(-10)) {
    history.push({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    });
  }

  const lastMessage = cleanMessages[cleanMessages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return "Please send a message to get a response.";
  }

  return runWithModelFallback(async (modelName) => {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history,
        { role: "user", parts: [{ text: lastMessage.content }] },
      ],
    });

    return extractText(response);
  });
}
