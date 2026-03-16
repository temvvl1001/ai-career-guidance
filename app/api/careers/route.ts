import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const careers = await prisma.career.findMany({ take: 5 });

  const localized = careers.map((career: any) => ({
    id: career.id,
    name: locale === "mn" ? career.nameMn ?? career.name : career.name,
    description: locale === "mn" ? career.descriptionMn ?? career.description : career.description,
    salary: locale === "mn" ? career.salaryMn ?? career.salary : career.salary,
    demandLevel: locale === "mn" ? career.demandLevelMn ?? career.demandLevel : career.demandLevel,
    futureDemand: locale === "mn" ? career.futureDemandMn ?? career.futureDemand : career.futureDemand,
    requiredSkills: locale === "mn" ? career.requiredSkillsMn ?? career.requiredSkills : career.requiredSkills,
  }));

  return NextResponse.json(localized);
}