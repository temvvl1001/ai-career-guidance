import { NextResponse } from "next/server";
import { getCareersForMBTI } from "@/lib/career-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mbtiType = searchParams.get("mbti");

  if (!mbtiType) {
    return NextResponse.json(
      { error: "MBTI type is required" },
      { status: 400 }
    );
  }

  const careers = getCareersForMBTI(mbtiType.toUpperCase());
  return NextResponse.json({ careers });
}
