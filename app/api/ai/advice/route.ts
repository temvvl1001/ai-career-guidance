import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { generateCareerAdvice } from "@/lib/gemini";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { career, personalityType, skillScore } = await request.json();

    if (!career || !personalityType) {
      return NextResponse.json(
        { error: "Career and personality type are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          advice: `**Learning Roadmap for ${career}**\n\n1. **Months 1-2**: Build foundational skills through online courses (Coursera, Udemy)\n2. **Months 3-4**: Work on portfolio projects to demonstrate skills\n3. **Months 5-6**: Apply for internships or entry-level positions\n\n**Recommended Resources**:\n- FreeCodeCamp\n- Codecademy\n- YouTube tutorials\n\n**Skills to Improve**: Based on your ${personalityType} personality and ${skillScore}% skill score, focus on practical application and building projects.\n\n*Note: Add GEMINI_API_KEY to .env for AI-powered personalized advice.*`,
        },
        { status: 200 }
      );
    }

    const advice = await generateCareerAdvice({
      career,
      personalityType,
      skillScore: skillScore ?? 50,
    });

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("AI advice error:", error);
    return NextResponse.json(
      { error: "Failed to generate advice" },
      { status: 500 }
    );
  }
}
