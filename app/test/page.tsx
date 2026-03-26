"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import MBTITest from "@/components/MBTITest";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const { user } = useAuthStore();
  const { language } = useUiStore();
  const isMn = language === "mn";
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) { router.push("/"); return; }
        const data = await res.json();
        if (!data.user) { router.push("/"); return; }
      } catch {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleComplete = async (answers: { questionId: number; value: number }[]) => {
    try {
      const res = await fetch("/api/mbti/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (res.ok) {
        router.push("/preferences");
      } else {
        const data = await res.json();
        alert(data.error || (isMn ? "Үр дүн хадгалахад алдаа гарлаа" : "Failed to save results"));
      }
    } catch {
      alert(isMn ? "Үр дүн хадгалахад алдаа гарлаа" : "Failed to save results");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-dark-400">
            {isMn ? "Уншиж байна..." : "Loading..."}
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
            {isMn ? "Зан чанарын үнэлгээ" : "Personality Assessment"}
          </h1>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            {isMn
              ? "Дараах асуултуудад үнэнчээр хариулна уу. Зөв буруу хариулт гэж байхгүй — бид таны байгалийн хандлагыг ойлгохыг хүсч байна."
              : "Answer the following questions honestly. There are no right or wrong answers—we want to understand how you naturally approach the world."}
          </p>
          <MBTITest onComplete={handleComplete} />
        </div>
      </main>
    </>
  );
}