"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CareerCard from "@/components/CareerCard";
import AIHelper from "@/components/AIHelper";
import { useAuthStore } from "@/store/auth-store";
import { TOP_CAREERS, getCareersForMBTI } from "@/lib/career-data";
import { Brain, Target, MessageCircle, ChevronRight } from "lucide-react";
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

  const recommendedCareers = mbtiType ? getCareersForMBTI(mbtiType) : TOP_CAREERS.slice(0, 5);

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

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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

              {/* Explore Top Careers */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-blue" />
                  {mbtiType ? "Recommended for You" : "Explore Top Careers"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recommendedCareers.slice(0, 4).map((career) => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      showSkillTest={!!mbtiType}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent-emerald" />
                AI Career Assistant
              </h2>
              <AIHelper
                personalityType={mbtiType || undefined}
                career={recommendedCareers[0]?.name}
              />
            </div>
          </div>
        </div>
      </main>

      <AIHelper
        personalityType={mbtiType || undefined}
        career={recommendedCareers[0]?.name}
        compact
      />
    </>
  );
}
