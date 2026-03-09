"use client";

import { Career } from "@/lib/career-data";
import { TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

interface CareerCardProps {
  career: Career;
  showSkillTest?: boolean;
}

export default function CareerCard({ career, showSkillTest = false }: CareerCardProps) {
  const demandColor =
    career.demandLevel === "High"
      ? "text-emerald-400"
      : career.demandLevel === "Medium"
      ? "text-amber-400"
      : "text-dark-400";

  return (
    <div className="group p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/10">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-purple transition-colors">
          {career.name}
        </h3>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${demandColor}`}
        >
          <TrendingUp className="w-4 h-4" />
          {career.demandLevel}
        </span>
      </div>

      <p className="text-dark-300 text-sm mb-4 line-clamp-2">{career.description}</p>

      <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
        <DollarSign className="w-4 h-4 text-accent-emerald" />
        <span>{career.salary}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {career.requiredSkills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-lg bg-dark-700 text-dark-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="text-xs text-dark-400 mb-4">{career.futureDemand}</p>

      {showSkillTest && (
        <Link
          href={`/skills?career=${encodeURIComponent(career.name)}`}
          className="block w-full py-2 text-center rounded-lg bg-accent-purple/20 text-accent-purple font-medium hover:bg-accent-purple/30 transition-colors"
        >
          Take Skill Test
        </Link>
      )}
    </div>
  );
}
