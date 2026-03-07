import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { chatWithAssistant } from "@/lib/gemini";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages, context } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response:
          "I'm your AI Career Assistant! Add GEMINI_API_KEY to your .env file to enable AI responses. For now, I recommend exploring our personality test and career recommendations.",
      });
    }

    const response = await chatWithAssistant(messages, context);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
