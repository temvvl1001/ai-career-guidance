"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

const INTEREST_OPTIONS = [
  "technology",
  "analysis",
  "design",
  "creativity",
  "security",
  "business",
  "education",
  "health",
  "media",
  "entrepreneurship",
  "ai",
  "problem-solving",
  "research",
  "innovation",
  "leadership",
  "strategy",
  "user experience",
  "psychology",
  "content creation",
  "writing",
  "people",
  "communication",
  "marketing",
  "events",
  "planning",
  "social media",
  "storytelling",
  "systems",
  "organization",
  "customer service",
  "sales",
  "art",
];

const SUBJECT_OPTIONS = [
  "math",
  "computer-science",
  "statistics",
  "physics",
  "art",
  "design",
  "biology",
  "economics",
  "psychology",
  "engineering",
  "networking",
  "business",
  "english",
  "communication",
  "marketing",
  "entrepreneurship",
  "media studies",
];

const normalize = (value: string) => value.trim().toLowerCase();

export default function PreferencesPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [interests, setInterests] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  const [interestInput, setInterestInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setInterests(data?.user?.interests ?? []);
        setSubjects(data?.user?.favoriteSubjects ?? []);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router, setUser]);

  const toggleValue = (
    value: string,
    list: string[],
    setList: (next: string[]) => void
  ) => {
    const normalized = normalize(value);
    if (list.map(normalize).includes(normalized)) {
      setList(list.filter((item) => normalize(item) !== normalized));
    } else {
      setList([...list, value]);
    }
  };

  const addCustom = (
    raw: string,
    list: string[],
    setList: (next: string[]) => void,
    reset: () => void
  ) => {
    const value = normalize(raw);
    if (!value) return;
    if (list.map(normalize).includes(value)) {
      reset();
      return;
    }
    setList([...list, value]);
    reset();
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const formData = new FormData();
      // Clear legacy skills preferences since we no longer use them.
      formData.append("skills", JSON.stringify([]));
      formData.append("interests", JSON.stringify(interests));
      formData.append("favoriteSubjects", JSON.stringify(subjects));

      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save preferences.");

      setUser(data.user);
      setSuccess("Preferences saved.");
      setTimeout(() => {
        router.push("/results");
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save preferences.");
    } finally {
      setSaving(false);
    }
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
      <main className="pt-24 min-h-screen pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Career Preferences</h1>
            <p className="text-dark-400">
              Choose your interests and favorite subjects to improve recommendations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-800/50 border border-slate-200 dark:border-dark-600 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Interests</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {INTEREST_OPTIONS.map((option) => {
                  const active = interests.map(normalize).includes(normalize(option));
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleValue(option, interests, setInterests)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        active
                          ? "bg-accent-purple text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600 border border-slate-400/30"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustom(interestInput, interests, setInterests, () => setInterestInput(""));
                    }
                  }}
                  placeholder="Add custom interest"
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    addCustom(interestInput, interests, setInterests, () => setInterestInput(""))
                  }
                  className="px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Favorite Subjects</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {SUBJECT_OPTIONS.map((option) => {
                  const active = subjects.map(normalize).includes(normalize(option));
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleValue(option, subjects, setSubjects)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        active
                          ? "bg-accent-purple text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustom(subjectInput, subjects, setSubjects, () => setSubjectInput(""));
                    }
                  }}
                  placeholder="Add favorite subject"
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple outline-none"
                />
                <button
                  type="button"
                  onClick={() => addCustom(subjectInput, subjects, setSubjects, () => setSubjectInput(""))}
                  className="px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-lg bg-dark-700 hover:bg-dark-600"
            >
              Skip
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="px-6 py-3 rounded-lg bg-accent-purple text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
