"use client";

import { Career } from "@/lib/career-data";
import { TrendingUp, DollarSign, Check } from "lucide-react";

interface CareerComparisonProps {
  careers: Career[];
}

export default function CareerComparison({ careers }: CareerComparisonProps) {
  if (careers.length < 2) return null;

  const allSkills = Array.from(
    new Set(careers.flatMap((c) => c.requiredSkills))
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-dark-600">
            <th className="text-left p-4 text-dark-400 font-medium">Criteria</th>
            {careers.map((c) => (
              <th key={c.id} className="text-left p-4 font-semibold">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-dark-700">
            <td className="p-4 text-dark-400">Salary</td>
            {careers.map((c) => (
              <td key={c.id} className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-accent-emerald" />
                  <span>{c.salary}</span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-dark-700">
            <td className="p-4 text-dark-400">Demand</td>
            {careers.map((c) => (
              <td key={c.id} className="p-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                    c.demandLevel === "High"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : c.demandLevel === "Medium"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-dark-600 text-dark-400"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {c.demandLevel}
                </span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-dark-700">
            <td className="p-4 text-dark-400">Future Outlook</td>
            {careers.map((c) => (
              <td key={c.id} className="p-4 text-sm text-dark-300">
                {c.futureDemand}
              </td>
            ))}
          </tr>
          {allSkills.slice(0, 5).map((skill) => (
            <tr key={skill} className="border-b border-dark-700">
              <td className="p-4 text-dark-400">Requires {skill}</td>
              {careers.map((c) => (
                <td key={c.id} className="p-4">
                  {c.requiredSkills.includes(skill) ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <span className="text-dark-500">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
