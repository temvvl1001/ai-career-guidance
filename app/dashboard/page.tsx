"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CareerCard from "@/components/CareerCard";
import { useAuthStore } from "@/store/auth-store";
import { ALL_CAREERS, TOP_CAREERS, recommendCareers, UserProfile } from "@/lib/career-data";
import { Brain, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [mbtiType, setMbtiType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          window.location.href = "/";
        }
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch("/api/mbti/results");
      if (res.ok) {
        const data = await res.json();
        if (data.results?.length > 0) {
          setMbtiType(data.results[0].mbtiType);
        }
      }
    };
    fetchResults();
  }, []);

  const recommendationItems = mbtiType
    ? recommendCareers(
        {
          mbti: mbtiType,
          // Use stored preferences to refine ranking.
          interests: user?.interests ?? [],
          favoriteSubjects: user?.favoriteSubjects ?? [],
        } satisfies UserProfile,
        ALL_CAREERS
      )
    : [];

  const displayItems = mbtiType
    ? recommendationItems.slice(0, 4)
    : TOP_CAREERS.slice(0, 4).map((career) => ({
        career,
        score: undefined,
      }));

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-dark-400">Loading...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-dark-400 mb-12">
            Continue your career discovery journey
          </p>

          <div className="space-y-8">
            {/* Start Personality Test */}
            <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-accent-purple" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Personality Test</h2>
                    <p className="text-dark-400 text-sm">
                      {mbtiType
                        ? `Your type: ${mbtiType} - Retake to update`
                        : "Discover your MBTI personality type"}
                    </p>
                  </div>
                </div>
                <Link
                  href="/test"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-purple/20 text-accent-purple font-medium hover:bg-accent-purple/30 transition-colors"
                >
                  {mbtiType ? "Retake" : "Start"}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Career Preferences */}
            <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-blue/20 flex items-center justify-center">
                    <Target className="w-7 h-7 text-accent-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Career Preferences</h2>
                    <p className="text-dark-400 text-sm">
                      Add interests and favorite subjects.
                    </p>
                  </div>
                </div>
                <Link
                  href="/preferences"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue/20 text-accent-blue font-medium hover:bg-accent-blue/30 transition-colors"
                >
                  Start
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Explore Top Careers */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-blue" />
                {mbtiType ? "Recommended for You" : "Explore Top Careers"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {displayItems.map((item) => (
                  <CareerCard
                    key={item.career.id}
                    career={item.career}
                    showSkillTest={!!mbtiType}
                    matchScore={item.score}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
