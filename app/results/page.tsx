"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CareerCard from "@/components/CareerCard";
import CareerComparison from "@/components/CareerComparison";
import ResultGraph from "@/components/ResultGraph";
import { ALL_CAREERS, recommendCareers, UserProfile } from "@/lib/career-data";
import { getPersonalityDescription } from "@/lib/mbti-questions";
import { MBTIScores } from "@/lib/mbti-questions";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [scores, setScores] = useState<MBTIScores | null>(null);
  const [userPrefs, setUserPrefs] = useState<{
    interests: string[];
    favoriteSubjects: string[];
  }>({ interests: [], favoriteSubjects: [] });
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Load MBTI results + user preferences in parallel for scoring.
        const [mbtiRes, authRes] = await Promise.all([
          fetch("/api/mbti/results"),
          fetch("/api/auth/me"),
        ]);

        if (!mbtiRes.ok) {
          router.push("/test");
          return;
        }
        const data = await mbtiRes.json();
        if (!data.results?.length) {
          router.push("/test");
          return;
        }
        const latest = data.results[0];
        setMbtiType(latest.mbtiType);
        setScores(latest.scores as MBTIScores);

        if (authRes.ok) {
          const authData = await authRes.json();
          // Preferences come from profile/preferences page.
          setUserPrefs({
            interests: authData?.user?.interests ?? [],
            favoriteSubjects: authData?.user?.favoriteSubjects ?? [],
          });
        }
      } catch {
        router.push("/test");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-dark-400">Loading results...</div>
        </main>
      </>
    );
  }

  if (!mbtiType || !scores) return null;

  const { strengths, weaknesses } = getPersonalityDescription(mbtiType);

  const profile: UserProfile = {
    mbti: mbtiType,
    interests: userPrefs.interests,
    favoriteSubjects: userPrefs.favoriteSubjects,
  };

  // Algorithmic recommendations with match scores.
  const recommendations = recommendCareers(profile, ALL_CAREERS);
  const careers = recommendations.map((item) => item.career);

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Your Personality Type</h1>
            <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue text-3xl font-bold text-white">
              {mbtiType}
            </div>
          </div>

          <div className="space-y-8">
            <ResultGraph
              mbtiType={mbtiType}
              scores={scores}
              strengths={strengths}
              weaknesses={weaknesses}
            />

            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Recommended Careers for {mbtiType}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {recommendations.map((item) => (
                  <CareerCard
                    key={item.career.id}
                    career={item.career}
                    showSkillTest
                    matchScore={item.score}
                  />
                ))}
              </div>
              {careers.length >= 2 && (
                <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
                  <h3 className="text-lg font-semibold mb-4">Career Comparison</h3>
                  <CareerComparison careers={careers.slice(0, 4)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
