import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateMBTI } from "@/lib/mbti-questions";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { answers } = await request.json();

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: "Invalid answers" },
        { status: 400 }
      );
    }

    const { type, scores } = calculateMBTI(answers);

    const result = await prisma.testResult.create({
      data: {
        userId: user.userId,
        mbtiType: type,
        answers,
        scores: scores as object,
      },
    });

    return NextResponse.json({
      result: {
        id: result.id,
        mbtiType: type,
        scores,
      },
    });
  } catch (error) {
    console.error("MBTI submit error:", error);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  }
}
