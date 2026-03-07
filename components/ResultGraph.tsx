"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { MBTIScores } from "@/lib/mbti-questions";

interface ResultGraphProps {
  mbtiType: string;
  scores: MBTIScores;
  strengths: string[];
  weaknesses: string[];
}

const DIMENSION_LABELS: Record<string, string> = {
  "E-I": "Extraversion vs Introversion",
  "S-N": "Sensing vs Intuition",
  "T-F": "Thinking vs Feeling",
  "J-P": "Judging vs Perceiving",
};

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"];

export default function ResultGraph({
  mbtiType,
  scores,
  strengths,
  weaknesses,
}: ResultGraphProps) {
  const radarData = Object.entries(scores).map(([key, value]) => ({
    dimension: key,
    score: Math.abs(value) + 3,
    fullMark: 5,
  }));

  const barData = [
    { name: "Strengths", count: strengths.length, fill: "#10b981" },
    { name: "Weaknesses", count: weaknesses.length, fill: "#f59e0b" },
  ];

  const dimensionBarData = Object.entries(scores).map(([key, value]) => ({
    name: key,
    value: value,
    fill: value >= 0 ? "#8b5cf6" : "#3b82f6",
  }));

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
        <h3 className="text-lg font-semibold mb-4">Personality Dimensions</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#4b5563" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(v) => DIMENSION_LABELS[v] || v}
              />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#6b7280" }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
        <h3 className="text-lg font-semibold mb-4">Dimension Balance</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dimensionBarData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" domain={[-10, 10]} tick={{ fill: "#9ca3af" }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#9ca3af" }} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2b32",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e4e4e7" }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {dimensionBarData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-dark-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">Areas to Develop</h3>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-center gap-2 text-dark-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
