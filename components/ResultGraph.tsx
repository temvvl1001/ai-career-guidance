"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { MBTIScores } from "@/lib/mbti-questions";

interface ResultGraphProps {
  mbtiType: string;
  scores: MBTIScores;
  strengths: string[];
  weaknesses: string[];
  locale?: "en" | "mn";
}

// ── Static text translations ───────────────────────────────────────────────

const T = {
  en: {
    personalityDimensions: "Personality Dimensions",
    howToRead: "How to read this chart",
    howToReadDesc1:
      "Each axis is a personality trait. The farther the point is from the center, the stronger your preference.",
    howToReadDesc2: (type: string) =>
      `Labels shown in red match your MBTI type (${type}). Blue dots show the strength of each trait (0–100%).`,
    strengths: "Strengths",
    areasToGrow: "Areas to Develop",
    traits: {
      E: "Extroverted (E)",
      S: "Sensing (S)",
      F: "Feeling (F)",
      J: "Judging (J)",
      I: "Introverted (I)",
      N: "iNtuition (N)",
      T: "Thinking (T)",
      P: "Perceiving (P)",
    },
    legend: [
      "E ↔ I: Extroverted vs Introverted",
      "S ↔ N: Sensing vs iNtuition",
      "T ↔ F: Thinking vs Feeling",
      "J ↔ P: Judging vs Perceiving",
    ],
  },
  mn: {
    personalityDimensions: "Зан чанарын хэмжээсүүд",
    howToRead: "Графикийг хэрхэн унших вэ",
    howToReadDesc1:
      "Тэнхлэг бүр нь зан чанарын шинж чанарыг илэрхийлнэ. Цэг нь төвөөс холдох тусам таны хандлага илүү хүчтэй байна.",
    howToReadDesc2: (type: string) =>
      `Улаанаар харагдах шошго нь таны MBTI төрөлтэй (${type}) таарна. Цэнхэр цэгүүд нь шинж чанар бүрийн хүчийг (0–100%) харуулна.`,
    strengths: "Давуу талууд",
    areasToGrow: "Хөгжүүлэх талууд",
    traits: {
      E: "Экстраверт (E)",
      S: "Мэдрэхүй (S)",
      F: "Мэдрэмж (F)",
      J: "Шийдэмгий (J)",
      I: "Интроверт (I)",
      N: "Зөн совин (N)",
      T: "Сэтгэлгээ (T)",
      P: "Уян хатан (P)",
    },
    legend: [
      "E ↔ I: Экстраверт vs Интроверт",
      "S ↔ N: Мэдрэхүй vs Зөн совин",
      "T ↔ F: Сэтгэлгээ vs Мэдрэмж",
      "J ↔ P: Шийдэмгий vs Уян хатан",
    ],
  },
};

const TRAIT_ORDER = ["E", "S", "F", "J", "I", "N", "T", "P"] as const;

export default function ResultGraph({
  mbtiType,
  scores,
  strengths,
  weaknesses,
  locale = "en",
}: ResultGraphProps) {
  const t = T[locale];

  const normalizeScore = (value: number) =>
    Math.round(((value + 10) / 20) * 100);

  const eScore = normalizeScore(scores["E-I"]);
  const sScore = normalizeScore(scores["S-N"]);
  const tScore = normalizeScore(scores["T-F"]);
  const jScore = normalizeScore(scores["J-P"]);

  const traitValues: Record<string, number> = {
    E: eScore,    I: 100 - eScore,
    S: sScore,    N: 100 - sScore,
    T: tScore,    F: 100 - tScore,
    J: jScore,    P: 100 - jScore,
  };

  const radarData = TRAIT_ORDER.map((key) => ({
    trait: key,
    label: t.traits[key],
    value: traitValues[key],
  }));

  const dominantTraits = new Set(mbtiType.split(""));

  return (
    <div className="space-y-8">
      {/* Radar chart */}
      <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
        <h3 className="text-lg font-semibold mb-4">{t.personalityDimensions}</h3>
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={radarData}
                margin={{ top: 28, right: 36, bottom: 28, left: 36 }}
                outerRadius="70%"
              >
                <PolarGrid stroke="#4b5563" />
                <PolarAngleAxis
                  dataKey="label"
                  radius={130}
                  tick={(props) => {
                    const trait = props?.payload?.payload?.trait as string | undefined;
                    const isDominant = trait ? dominantTraits.has(trait) : false;
                    return (
                      <text
                        x={props.x}
                        y={props.y}
                        textAnchor={props.textAnchor}
                        fill={isDominant ? "#ef4444" : "#9ca3af"}
                        fontSize={12}
                        fontWeight={isDominant ? 600 : 400}
                        key={`trait-${trait}`}
                      >
                        {props.payload?.value}
                      </text>
                    );
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.4}
                  dot={(props): any => {
                    const trait = props?.payload?.trait as string | undefined;
                    const isDominant = trait ? dominantTraits.has(trait) : false;
                    if (props.cx == null || props.cy == null) return null;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={isDominant ? 6 : 4}
                        fill={isDominant ? "#ef4444" : "#93c5fd"}
                        stroke="#1f2937"
                        strokeWidth={1}
                        key={`dot-${trait ?? "na"}-${props.index ?? "x"}-${props.cx}-${props.cy}`}
                      />
                    );
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend / explanation */}
          <div className="text-sm text-dark-300 space-y-3">
            <p className="text-dark-200 font-medium">{t.howToRead}</p>
            <p>{t.howToReadDesc1}</p>
            <p>{t.howToReadDesc2(mbtiType)}</p>
            <div className="grid gap-2 text-sm text-dark-200 sm:grid-cols-2">
              <div>E: {traitValues.E}% / I: {traitValues.I}%</div>
              <div>S: {traitValues.S}% / N: {traitValues.N}%</div>
              <div>T: {traitValues.T}% / F: {traitValues.F}%</div>
              <div>J: {traitValues.J}% / P: {traitValues.P}%</div>
            </div>
            <div className="space-y-2">
              {t.legend.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">{t.strengths}</h3>
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
          <h3 className="text-lg font-semibold mb-4 text-amber-400">{t.areasToGrow}</h3>
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