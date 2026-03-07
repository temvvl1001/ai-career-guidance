import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { career, score, answers } = await request.json();

    if (!career || typeof score !== "number") {
      return NextResponse.json(
        { error: "Career and score are required" },
        { status: 400 }
      );
    }

    const result = await prisma.skillResult.create({
      data: {
        userId: user.userId,
        career,
        score,
        answers: answers || [],
      },
    });

    return NextResponse.json({
      result: {
        id: result.id,
        career,
        score,
      },
    });
  } catch (error) {
    console.error("Skill submit error:", error);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  }
}
