import { TOP_CAREERS, localizeCareer } from "@/lib/career-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const localized = TOP_CAREERS.slice(0, 5).map((career) =>
    localizeCareer(career, locale)
  );

  return NextResponse.json(localized);
}