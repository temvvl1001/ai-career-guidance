"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";
import { User, Mail, Brain, Briefcase, TrendingUp, ChevronDown, Edit } from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
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
  const [adviceByCareer, setAdviceByCareer] = useState<
    Record<string, { loading: boolean; advice?: string; error?: string }>
  >({});
  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

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

  useEffect(() => {
    setNameDraft(user?.name ?? "");
  }, [user?.name]);

  useEffect(() => {
    if (!selectedImage) {
      setAvatarPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(selectedImage);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  const personalityType = testResults[0]?.mbtiType;

  const groupedSkillResults = skillResults.reduce<Record<string, SkillResult[]>>(
    (acc, result) => {
      const existing = acc[result.career] ?? [];
      existing.push(result);
      acc[result.career] = existing;
      return acc;
    },
    {}
  );

  const careerEntries = Object.entries(groupedSkillResults).sort((a, b) => {
    const aDate = a[1][0]?.createdAt;
    const bDate = b[1][0]?.createdAt;
    const aTime = aDate ? new Date(aDate).getTime() : 0;
    const bTime = bDate ? new Date(bDate).getTime() : 0;
    return bTime - aTime;
  });

  const progressData = careerEntries.map(([career, results]) => {
    const latest = results[0];
    const previous = results[1];

    return {
      name: career.length > 12 ? career.slice(0, 12) + "..." : career,
      fullName: career,
      latestScore: latest?.score ?? null,
      previousScore: previous?.score ?? null,
      latestDate: latest?.createdAt,
      previousDate: previous?.createdAt,
    };
  });

  const formatScore = (value: number | null | undefined) =>
    typeof value === "number" ? `${value}%` : "-";

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleDateString() : "-";

  const scoreColor = (score: number | null | undefined) => {
    if (typeof score !== "number") return "text-[#6b6c75]";
    if (score >= 70) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const formatDelta = (delta: number | null) => {
    if (delta === null) return "N/A";
    if (delta > 0) return `+${delta}%`;
    return `${delta}%`;
  };

  const buildEncouragement = (
    career: string,
    latestScore: number | null,
    delta: number | null
  ) => {
    if (latestScore === null) {
      return `Take the ${career} test to get a baseline.`;
    }

    const trend =
      delta === null
        ? "Keep building consistency."
        : delta > 0
          ? `Up ${delta} points since last time.`
          : delta < 0
            ? `Down ${Math.abs(delta)} points. Review weak areas.`
            : "Stable score. Keep pushing forward.";

    if (latestScore >= 80) {
      return `Strong result. You are close to being ready for ${career} roles. ${trend}`;
    }
    if (latestScore >= 70) {
      return `Good progress. You are getting close to ${career}. Focus on weak topics and keep practicing. ${trend}`;
    }
    if (latestScore >= 50) {
      return `Solid foundation. Build more projects to reach ${career} readiness. ${trend}`;
    }
    return `Early stage. Focus on fundamentals for ${career} and retake the test after practice. ${trend}`;
  };

  const formatAdvice = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  const compactAdvice = (text: string) => {
    const cleaned = text.replace(/\r/g, "").trim();
    if (!cleaned) return cleaned;

    const lines = cleaned
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const bulletLines = lines.filter(
      (line) => line.startsWith("-") || line.startsWith("*") || line.startsWith("•")
    );
    const normalizeBullet = (line: string) => {
      const stripped = line.replace(/^[-*•]\s*/, "");
      const words = stripped.split(/\s+/).filter(Boolean);
      const trimmed = words.slice(0, 18).join(" ");
      return `- ${trimmed}${words.length > 18 ? "..." : ""}`;
    };

    if (bulletLines.length > 0) {
      return bulletLines.slice(0, 4).map(normalizeBullet).join("\n");
    }

    const words = cleaned.split(/\s+/).filter(Boolean);
    const snippet = words.slice(0, 80).join(" ");
    return `- ${snippet}${words.length > 80 ? "..." : ""}`;
  };

  // Сонгосон карьерын AI анализыг нэг удаа татаж, state-д хадгална.
  const ensureAdvice = async (career: string, score: number | null) => {
    const existing = adviceByCareer[career];
    if (existing?.loading || existing?.advice || existing?.error) {
      return;
    }

    if (!personalityType) {
      setAdviceByCareer((prev) => ({
        ...prev,
        [career]: {
          loading: false,
          error: "Take the personality test to enable AI analysis.",
        },
      }));
      return;
    }

    setAdviceByCareer((prev) => ({
      ...prev,
      [career]: { loading: true },
    }));

    try {
      const response = await fetch("/api/ai/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career,
          personalityType,
          skillScore: score ?? 50,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data = await response.json();
      setAdviceByCareer((prev) => ({
        ...prev,
        [career]: {
          loading: false,
          advice: data?.advice || "AI analysis not available.",
        },
      }));
    } catch {
      setAdviceByCareer((prev) => ({
        ...prev,
        [career]: {
          loading: false,
          error: "AI analysis is not available right now.",
        },
      }));
    }
  };

  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxImageSize = 2 * 1024 * 1024;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileError("");
    setProfileSuccess("");
    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      setProfileError("Unsupported image type. Use JPG, PNG, WEBP, or GIF.");
      event.currentTarget.value = "";
      return;
    }
    if (file.size > maxImageSize) {
      setProfileError("Image size must be 2MB or less.");
      event.currentTarget.value = "";
      return;
    }

    setSelectedImage(file);
  };

  const handleProfileSave = async () => {
    setProfileError("");
    setProfileSuccess("");

    const trimmedName = nameDraft.trim();
    const currentName = (user?.name ?? "").trim();
    const hasNameChange = trimmedName !== currentName;
    const hasImageChange = Boolean(selectedImage);

    if (!hasNameChange && !hasImageChange) {
      setProfileError("No changes to save.");
      return;
    }

    if (hasNameChange && (trimmedName.length < 2 || trimmedName.length > 40)) {
      setProfileError("Name must be between 2 and 40 characters.");
      return;
    }

    const formData = new FormData();
    if (hasNameChange) formData.append("name", trimmedName);
    if (selectedImage) formData.append("image", selectedImage);

    setProfileSaving(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");

      setUser(data.user);
      setSelectedImage(null);
      setProfileSuccess("Profile updated.");
      setIsEditing(false);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setProfileSaving(false);
    }
  };

  const avatarSrc = avatarPreview || user?.image;
  const hasPendingChanges =
    Boolean(selectedImage) ||
    nameDraft.trim() !== (user?.name ?? "").trim();

  const handleEditStart = () => {
    setProfileError("");
    setProfileSuccess("");
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setNameDraft(user?.name ?? "");
    setSelectedImage(null);
    setProfileError("");
    setProfileSuccess("");
    setIsEditing(false);
  };

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
      <main className="pt-16 min-h-screen">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] min-w-0">
            {/* Profile Header - Grey Dark Theme */}
           <div className="w-full min-w-0 rounded-2xl bg-dark-900 border border-dark-700 p-6 sm:p-8 shadow-lg shadow-black/5 dark:shadow-black/40 h-full flex relative">
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditStart}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2 px-3 sm:px-4 sm:py-2 rounded-lg text-ai text-xs sm:text-sm font-medium transition-colors hover:text-accent-blue"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <div className="flex flex-col gap-6 justify-center flex-1">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 w-full pr-24 sm:pr-28">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-800 flex items-center justify-center overflow-hidden border border-dark-700">
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt={user?.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-dark-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h1
                        className="text-xl sm:text-2xl font-bold text-dark-100 truncate"
                        title={user?.name || "User"}
                      >
                        {user?.name || "User"}
                      </h1>
                      <div className="flex items-center gap-2 text-dark-400 mt-1 min-w-0">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span
                          className="min-w-0 flex-1 truncate"
                          title={user?.email || ""}
                        >
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <>
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                      <div className="w-full max-w-[320px] md:max-w-md">
                        <label
                          htmlFor="profile-name"
                          className="block text-sm font-medium text-dark-200 mb-2"
                        >
                          Display name
                        </label>
                        <input
                          id="profile-name"
                          type="text"
                          value={nameDraft}
                          onChange={(event) => setNameDraft(event.target.value)}
                          placeholder="Add a display name"
                          className="w-full px-4 py-3 rounded-lg bg-dark-950 border border-dark-700 text-dark-100 focus:border-ai focus:ring-1 focus:ring-ai outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 w-full md:w-auto md:justify-end">
                        <label className="px-4 py-3 rounded-lg bg-dark-950 border border-dark-700 text-dark-200 text-sm font-medium cursor-pointer hover:border-ai transition-colors">
                          Upload photo
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                        {selectedImage && (
                          <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="px-4 py-3 rounded-lg border border-dark-700 text-dark-400 text-sm font-medium hover:text-dark-100 hover:border-dark-600 transition-colors"
                          >
                            Clear
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="px-4 py-3 rounded-lg border border-dark-700 text-dark-400 text-sm font-medium hover:text-dark-100 hover:border-dark-600 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleProfileSave}
                          disabled={!hasPendingChanges || profileSaving}
                          className="px-4 py-3 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50 hover:bg-primary-hover transition-colors"
                        >
                          {profileSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-dark-400">
                      Supported formats: JPG, PNG, WEBP, GIF. Max size 2MB.
                    </p>
                  </>
                )}

                {profileError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    {profileError}
                  </div>
                )}
                {profileSuccess && (
                  <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                    {profileSuccess}
                  </div>
                )}
              </div>
            </div>

            {/* Personality Results */}
            <div className="w-full min-w-0 rounded-2xl bg-dark-900 border border-dark-700 p-6 shadow-lg shadow-black/5 dark:shadow-black/40">
              <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai" />
                Personality Results
              </h2>
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl bg-dark-950 border border-dark-700"
                    >
                      <span className="text-xl font-bold text-ai">
                        {r.mbtiType}
                      </span>
                      <p className="text-dark-400 text-xs mt-1">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-dark-400 text-sm mb-4">
                  Take the personality test to see your results.
                </p>
              )}
              <Link
                href="/test"
                className="text-primary hover:underline text-sm font-medium"
              >
                View Recommendations →
              </Link>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="w-full min-w-0 rounded-2xl bg-dark-900 border border-dark-700 p-6 mt-8 shadow-lg shadow-black/5 dark:shadow-black/40">
            <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ai" />
              Progress Overview
            </h2>
            <p className="text-xs text-dark-400 mb-4">
              Latest vs previous skill test per career.
            </p>
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
                        backgroundColor: "#1E293B",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                        color: "#F1F5F9",
                      }}
                      formatter={(value) =>
                        formatScore(value as number | null | undefined)
                      }
                      labelFormatter={(label, payload) => {
                        const item =
                          Array.isArray(payload) && payload.length
                            ? payload[0].payload
                            : null;
                        return item?.fullName ?? label;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ color: "#9ca3af", fontSize: 12 }}
                    />
                    <Bar
                      dataKey="previousScore"
                      name="Previous"
                      fill="#94A3B8"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="latestScore"
                      name="Latest"
                      fill="#6366F1"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-dark-400 text-sm">
                Complete skill tests to see your progress here.
              </p>
            )}
          </div>

          <div className="mt-8">
            {/* Skill Results */}
            <div className="w-full min-w-0 rounded-2xl bg-dark-900 border border-dark-700 p-6 shadow-lg shadow-black/5 dark:shadow-black/40">
              <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-ai" />
                Skill Test Results
              </h2>
              {careerEntries.length > 0 ? (
                <div className="space-y-4">
                  {careerEntries.map(([career, results]) => {
                    const latest = results[0];
                    const previous = results[1];
                    const latestScore =
                      typeof latest?.score === "number" ? latest.score : null;
                    const previousScore =
                      typeof previous?.score === "number" ? previous.score : null;
                    const delta =
                      typeof latestScore === "number" &&
                        typeof previousScore === "number"
                        ? latestScore - previousScore
                        : null;
                    const adviceState = adviceByCareer[career];

                    return (
                      <details
                        key={career}
                        className="group rounded-xl bg-dark-950 border border-dark-700 p-4"
                        onToggle={(event) => {
                          if (event.currentTarget.open) {
                            ensureAdvice(career, latestScore);
                          }
                        }}
                      >
                        <summary className="flex items-center justify-between gap-3 min-w-0 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-dark-100 font-semibold truncate"
                              title={career}
                            >
                              {career}
                            </div>
                            <div className="text-xs text-dark-400 mt-1">
                              Latest {formatScore(latestScore)} | Previous{" "}
                              {formatScore(previousScore)} | Change{" "}
                              {formatDelta(delta)}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-sm font-bold ${scoreColor(
                                latestScore
                              )}`}
                            >
                              {formatScore(latestScore)}
                            </span>
                            <ChevronDown className="w-4 h-4 text-dark-400 transition-transform group-open:rotate-180" />
                          </div>
                        </summary>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="rounded-lg bg-dark-900 border border-dark-700 p-4">
                            <h3 className="text-sm font-semibold text-dark-100 mb-3">
                              Attempt Comparison
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between text-dark-200">
                                <span>Latest</span>
                                <span
                                  className={`font-semibold ${scoreColor(
                                    latestScore
                                  )}`}
                                >
                                  {formatScore(latestScore)} -{" "}
                                  {formatDate(latest?.createdAt)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-dark-200">
                                <span>Previous</span>
                                <span
                                  className={`font-semibold ${scoreColor(
                                    previousScore
                                  )}`}
                                >
                                  {previousScore === null
                                    ? "No previous attempt"
                                    : `${formatScore(previousScore)} - ${formatDate(
                                      previous?.createdAt
                                    )}`}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-dark-200">
                                <span>Change</span>
                                <span
                                  className={`font-semibold ${delta === null
                                    ? "text-dark-400"
                                    : delta >= 0
                                      ? "text-emerald-400"
                                      : "text-red-400"
                                    }`}
                                >
                                  {formatDelta(delta)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 rounded-lg bg-dark-950 border border-dark-700 p-3 text-xs text-dark-200">
                              {buildEncouragement(career, latestScore, delta)}
                            </div>
                          </div>

                          <div className="rounded-lg bg-dark-900 border border-dark-700 p-4">
                            <h3 className="text-sm font-semibold text-dark-100 mb-3">
                              AI Analysis
                            </h3>
                            {adviceState?.loading ? (
                              <p className="text-dark-400 text-sm">
                                Generating AI analysis...
                              </p>
                            ) : adviceState?.advice ? (
                              <div
                                className="text-dark-200 text-sm leading-relaxed [&_strong]:text-dark-50"
                                dangerouslySetInnerHTML={{
                                  __html: formatAdvice(
                                    compactAdvice(adviceState.advice)
                                  ),
                                }}
                              />
                            ) : adviceState?.error ? (
                              <p className="text-dark-400 text-sm">
                                {adviceState.error}
                              </p>
                            ) : (
                              <p className="text-dark-400 text-sm">
                                Open this card to generate AI analysis.
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-dark-100 mb-2">
                            All Attempts
                          </h4>
                          <div className="space-y-2">
                            {results.map((attempt) => (
                              <div
                                key={attempt.id}
                                className="flex items-center justify-between rounded-lg bg-dark-900 border border-dark-700 px-3 py-2 text-sm"
                              >
                                <span className="text-dark-400">
                                  {formatDate(attempt.createdAt)}
                                </span>
                                <span
                                  className={`font-semibold ${scoreColor(
                                    attempt.score
                                  )}`}
                                >
                                  {attempt.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              ) : (
                <p className="text-dark-400 text-sm mb-4">
                  Complete skill tests for your target careers.
                </p>
              )}
              <Link
                href="/results"
                className="text-primary hover:underline text-sm font-medium"
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
