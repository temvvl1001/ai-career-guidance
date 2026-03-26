"use client";

import { Career } from "@/lib/career-data";
import { useUiStore } from "@/store/ui-store";
import { TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

interface CareerCardProps {
  career: Career;
  showSkillTest?: boolean;
  matchScore?: number;
}

export default function CareerCard({
  career,
  showSkillTest = false,
  matchScore,
}: CareerCardProps) {
  const { language } = useUiStore();
  const isMn = language === "mn";

  // demandLevel англи утгаар шалгах (локалчлагдсан ч гэсэн)
  const demandColor =
    career.demandLevel === "High" || career.demandLevel === ("Өндөр" as string)
      ? "text-emerald-400"
      : career.demandLevel === "Medium" || career.demandLevel === ("Дундаж" as string)
      ? "text-amber-400"
      : "text-dark-400";

  return (
    <div className="group relative overflow-hidden p-6 rounded-2xl bg-dark-800/60 border border-dark-600 transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/70 hover:shadow-[0_22px_45px_-30px_rgb(var(--accent-purple)_/_0.45)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(120%_120%_at_100%_0%,rgb(var(--accent-purple)_/_0.18),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark-100 group-hover:text-accent-purple transition-colors">
            {career.name}
          </h3>
          <span className={`flex items-center gap-1 text-xs font-medium ${demandColor}`}>
            <TrendingUp className="w-4 h-4" />
            {career.demandLevel}
          </span>
        </div>

        <p className="text-dark-300 text-sm mb-4 line-clamp-2">
          {career.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
          <DollarSign className="w-4 h-4 text-accent-emerald" />
          <span>{career.salary}</span>
        </div>

        {typeof matchScore === "number" && (
          <div className="mb-4 text-sm font-semibold text-accent-purple">
            {isMn ? "Таарц" : "Match Score"}: {Math.round(matchScore)}%
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {career.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded-lg bg-dark-700/80 text-dark-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="text-xs text-dark-400 mb-4">{career.futureDemand}</p>

        {showSkillTest && (
          <Link
            href={`/skills?career=${encodeURIComponent(career.name)}`}
            className="block w-full py-2 text-center rounded-lg bg-accent-purple/20 text-accent-purple dark:text-white font-medium hover:bg-accent-purple/30 transition-colors"
          >
            {isMn ? "Ур чадварын тест өгөх" : "Take Skill Test"}
          </Link>
        )}
      </div>
    </div>
  );
}