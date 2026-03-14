import { NextResponse } from "next/server";
import { ALL_CAREERS, recommendCareers } from "@/lib/career-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mbtiType = searchParams.get("mbti");

  if (!mbtiType) {
    return NextResponse.json(
      { error: "MBTI type is required" },
      { status: 400 }
    );
  }

  // API endpoint version of the same matching algorithm.
  const recommendations = recommendCareers(
    {
      mbti: mbtiType.toUpperCase(),
      interests: [],
      favoriteSubjects: [],
    },
    ALL_CAREERS
  );
  return NextResponse.json({ recommendations });
}
