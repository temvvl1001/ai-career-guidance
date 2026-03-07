import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateCareerAdvice(params: {
  career: string;
  personalityType: string;
  skillScore: number;
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export async function chatWithAssistant(
  messages: { role: "user" | "assistant"; content: string }[],
  context?: { personalityType?: string; career?: string }
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemContext = context
    ? `Context: User's personality type is ${context.personalityType || "unknown"}. Interested in ${context.career || "career exploration"}.`
    : "";

  const historyMessages = messages.slice(0, -1);
  const history: { role: "user" | "model"; parts: { text: string }[] }[] = [
    {
      role: "user",
      parts: [{ text: `You are an AI Career Assistant. ${systemContext} Help users with career guidance, skill development, and job market insights. Be concise and helpful.` }],
    },
    {
      role: "model",
      parts: [{ text: "I'm your AI Career Assistant! I can help you with career guidance, skill development, and exploring opportunities. How can I assist you today?" }],
    },
    ...historyMessages.slice(-10).flatMap((m) =>
      m.role === "user"
        ? [{ role: "user" as const, parts: [{ text: m.content }] }]
        : [{ role: "model" as const, parts: [{ text: m.content }] }]
    ),
  ];

  const chat = model.startChat({ history });

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return "Please send a message to get a response.";
  }

  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
