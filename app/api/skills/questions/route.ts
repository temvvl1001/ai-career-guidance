import { NextResponse } from "next/server";
import { getSkillQuestionsForCareer } from "@/lib/skill-questions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const career = searchParams.get("career");

  if (!career) {
    return NextResponse.json(
      { error: "Career is required" },
      { status: 400 }
    );
  }

  const questions = getSkillQuestionsForCareer(career);
  return NextResponse.json({ questions });
}
