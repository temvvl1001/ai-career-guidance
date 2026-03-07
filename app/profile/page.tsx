"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";
import { User, Mail, Brain, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TestResult {
  id: string;
  mbtiType: string;
  createdAt: string;
}

interface SkillResult {
  id: string;
  career: string;
  score: number;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [skillResults, setSkillResults] = useState<SkillResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authRes, mbtiRes, skillRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/mbti/results"),
          fetch("/api/profile/results"),
        ]);

        if (authRes.ok) {
          const authData = await authRes.json();
          setUser(authData.user);
        } else {
          window.location.href = "/";
          return;
        }

        if (mbtiRes.ok) {
          const mbtiData = await mbtiRes.json();
          setTestResults(mbtiData.results || []);
        }

        if (skillRes.ok) {
          const skillData = await skillRes.json();
          setSkillResults(skillData.results || []);
        }
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUser]);

  const progressData = skillResults.map((r) => ({
    name: r.career.length > 12 ? r.career.slice(0, 12) + "..." : r.career,
    score: r.score,
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
      <main className="pt-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header - Grey Dark Theme */}
          <div className="rounded-2xl bg-[#2d2e35] border border-[#3d3e45] p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#3d3e45] flex items-center justify-center">
                <User className="w-10 h-10 text-[#6b6c75]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#e4e4e7]">
                  {user?.name || "User"}
                </h1>
                <div className="flex items-center gap-2 text-[#9ca3af] mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="rounded-2xl bg-[#2d2e35] border border-[#3d3e45] p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#e4e4e7] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#8b5cf6]" />
              Progress Overview
            </h2>
            {skillResults.length > 0 ? (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#9ca3af" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2d2e35",
                        border: "1px solid #3d3e45",
                        borderRadius: "8px",
                        color: "#e4e4e7",
                      }}
                    />
                    <Bar
                      dataKey="score"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-[#6b6c75] text-sm">
                Complete skill tests to see your progress here.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personality Results */}
            <div className="rounded-2xl bg-[#2d2e35] border border-[#3d3e45] p-6">
              <h2 className="text-lg font-semibold text-[#e4e4e7] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#8b5cf6]" />
                Personality Results
              </h2>
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl bg-[#1a1b26] border border-[#3d3e45]"
                    >
                      <span className="text-xl font-bold text-[#8b5cf6]">
                        {r.mbtiType}
                      </span>
                      <p className="text-[#6b6c75] text-xs mt-1">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#6b6c75] text-sm mb-4">
                  Take the personality test to see your results.
                </p>
              )}
              <Link
                href="/test"
                className="text-[#8b5cf6] hover:underline text-sm font-medium"
              >
                {testResults.length ? "Retake Test" : "Start Test"} →
              </Link>
            </div>

            {/* Skill Results */}
            <div className="rounded-2xl bg-[#2d2e35] border border-[#3d3e45] p-6">
              <h2 className="text-lg font-semibold text-[#e4e4e7] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#8b5cf6]" />
                Skill Test Results
              </h2>
              {skillResults.length > 0 ? (
                <div className="space-y-3">
                  {skillResults.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl bg-[#1a1b26] border border-[#3d3e45] flex justify-between items-center"
                    >
                      <span className="text-[#e4e4e7] font-medium">
                        {r.career}
                      </span>
                      <span
                        className={`font-bold ${
                          r.score >= 70
                            ? "text-emerald-400"
                            : r.score >= 50
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {r.score}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#6b6c75] text-sm mb-4">
                  Complete skill tests for your target careers.
                </p>
              )}
              <Link
                href="/results"
                className="text-[#8b5cf6] hover:underline text-sm font-medium"
              >
                View Recommendations →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
