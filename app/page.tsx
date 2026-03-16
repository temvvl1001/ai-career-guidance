"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LoginPopup from "@/components/LoginPopup";
import CareerCard from "@/components/CareerCard";
import { Sparkles, Target, BarChart3, Brain } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useUiStore();
  const isMn = language === "mn";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/careers?locale=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
        setLoading(false);
      });
  }, [language]);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-transparent to-accent-blue/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-900 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                {isMn ? "Ирээдүйн" : "Discover Your"}{" "}
                <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                  {isMn ? "Мэргэжлээ Олоорой" : "Ideal Career"}
                </span>
              </h1>
              <p className="text-xl text-dark-300 mb-10 animate-slide-up">
                {isMn
                  ? "Хувь хүний тест бөглөж, AI-оор дүн шинжилгээ хийлгэн, өөрт тохирох мэргэжил болон хөгжүүлэх ур чадвараа тодорхойлоорой."
                  : "Take our personality test, get AI-powered career recommendations, and build the skills you need to succeed."}
              </p>
              <button
                onClick={() => setLoginOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-accent-purple/25 animate-slide-up"
              >
                {isMn ? "Тест Эхлүүлэх" : "Start Career Test"}
              </button>
            </div>
          </div>
        </section>

        {/* Platform Introduction */}
        <section className="py-20 border-t border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isMn ? "Хэрхэн Ажилладаг вэ?" : "How It Works"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-accent-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isMn ? "Хувь Хүний Тест" : "Personality Test"}
                </h3>
                <p className="text-dark-400 text-sm">
                  {isMn
                    ? "MBTI хэв маягийн тест бөглөж өөрийн давуу тал, зан төлвийн онцлогийг олж мэдээрэй."
                    : "Take our MBTI-style assessment to discover your unique strengths and preferences."}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isMn ? "Тохирох Мэргэжил" : "Career Match"}
                </h3>
                <p className="text-dark-400 text-sm">
                  {isMn
                    ? "Таны зан төлөвт үндэслэн хамгийн тохирох мэргэжлийн санал авах."
                    : "Get personalized career recommendations based on your personality type."}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-accent-emerald" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isMn ? "Ур Чадварын Шалгалт" : "Skill Assessment"}
                </h3>
                <p className="text-dark-400 text-sm">
                  {isMn
                    ? "Сонгосон мэргэжилдээ шаардлагатай ур чадвараа хэр зэрэг эзэмшсэнээ шалгаарай."
                    : "Test your skills for your target career and identify gaps."}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-accent-purple/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isMn ? "AI Хөгжлийн Замнал" : "AI Roadmap"}
                </h3>
                <p className="text-dark-400 text-sm">
                  {isMn
                    ? "AI-д суурилсан хувийн хөгжлийн төлөвлөгөө, суралцах замналаа аваарай."
                    : "Receive a personalized learning roadmap powered by AI."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Careers */}
        <section className="py-20 border-t border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isMn ? "Эрэлттэй Мэргэжлүүд" : "Top Demanded Careers"}
            </h2>
            <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
              {isMn
                ? "Технологи болон бусад салбарт хамгийн эрэлттэй байгаа мэргэжлүүдийг судлаарай."
                : "Explore the most in-demand careers in tech and beyond"}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {loading ? (
                <p className="text-dark-400 col-span-5 text-center">
                  {isMn ? "Уншиж байна..." : "Loading..."}
                </p>
              ) : (
                careers.map((career: any) => (
                  <CareerCard key={career.id} career={career} />
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => setLoginOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:opacity-90 transition-opacity"
              >
                {isMn ? "Тест Эхлүүлэх" : "Start Career Test"}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-400 text-sm">
            <p>
              {isMn
                ? "© 2025 AI Мэргэжил Сонголтын Платформ. Next.js & Gemini AI ашиглан бүтээгдсэн."
                : "© 2025 AI Career Guidance Platform. Built with Next.js & Gemini AI."}
            </p>
          </div>
        </footer>
      </main>

      <LoginPopup
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => (window.location.href = "/dashboard")}
      />
    </>
  );
}