"use client";

import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import SkillTest from "@/components/SkillTest";
import AIHelper from "@/components/AIHelper";
import { getSkillQuestionsForCareer, SkillQuestion } from "@/lib/skill-questions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function SkillsContent() {
  const searchParams = useSearchParams();
  const career = searchParams.get("career") || "Software Engineer";
  const [questions, setQuestions] = useState<SkillQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const q = getSkillQuestionsForCareer(career);
    setQuestions(q);
    setLoading(false);
  }, [career]);

  useEffect(() => {
    const fetchMbti = async () => {
      const res = await fetch("/api/mbti/results");
      if (res.ok) {
        const data = await res.json();
        if (data.results?.length) {
          setMbtiType(data.results[0].mbtiType);
        }
      }
    };
    fetchMbti();
  }, []);

  const handleComplete = async (
    finalScore: number,
    answers: { questionId: number; answer: number; isCorrect: boolean }[]
  ) => {
    setScore(finalScore);

    try {
      await fetch("/api/skills/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career,
          score: finalScore,
          answers,
        }),
      });
    } catch {
      console.error("Failed to save skill results");
    }

    setLoadingAdvice(true);
    try {
      const res = await fetch("/api/ai/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career,
          personalityType: mbtiType || "Unknown",
          skillScore: finalScore,
        }),
      });
      const data = await res.json();
      setAdvice(data.advice);
    } catch {
      setAdvice("Unable to load AI advice. Please try again.");
    } finally {
      setLoadingAdvice(false);
    }
  };

  if (loading || questions.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-dark-400">Loading...</div>
        </main>
      </>
    );
  }

  if (score !== null) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Skill Test Results</h1>
              <div
                className={`inline-block px-12 py-6 rounded-2xl text-4xl font-bold ${
                  score >= 70
                    ? "bg-emerald-500/20 text-emerald-400"
                    : score >= 50
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {score}%
              </div>
              <p className="text-dark-400 mt-4">{career} Assessment</p>
            </div>

            {loadingAdvice ? (
              <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-600 text-center">
                <p className="text-dark-400">Generating your learning roadmap...</p>
              </div>
            ) : advice ? (
              <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-600 mb-8">
                <h2 className="text-xl font-semibold mb-4">AI Learning Roadmap</h2>
                <div
                  className="text-dark-300 whitespace-pre-wrap leading-relaxed [&_strong]:text-white"
                  dangerouslySetInnerHTML={{
                    __html: advice
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            ) : null}

            <AIHelper career={career} personalityType={mbtiType || undefined} />

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setScore(null);
                  setAdvice(null);
                }}
                className="px-6 py-3 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
              >
                Retake Test
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            {career} Skill Test
          </h1>
          <p className="text-dark-400 text-center mb-12">
            Test your knowledge for this career path
          </p>

          <SkillTest
            questions={questions}
            career={career}
            onComplete={handleComplete}
          />
        </div>
      </main>
    </>
  );
}

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="pt-24 flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-dark-400">Loading...</div>
          </main>
        </>
      }
    >
      <SkillsContent />
    </Suspense>
  );
}
