"use client";

import Header from "@/components/Header";
import { useUiStore } from "@/store/ui-store";
import { Languages, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { language, theme, setLanguage, setTheme } = useUiStore();
  const isMn = language === "mn";

  const optionBase =
    "px-4 py-2 rounded-lg border text-sm font-medium transition-colors";
  const optionInactive =
    "bg-dark-900/60 border-dark-600 text-dark-300 hover:bg-dark-700";
  const optionActive =
    "bg-accent-purple text-white border-accent-purple shadow-sm";

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isMn ? "Тохиргоо" : "Settings"}
            </h1>
            <p className="text-dark-400">
              {isMn
                ? "Хэл болон өнгөний тохиргоогоо эндээс өөрчилнө."
                : "Update your language and theme preferences here."}
            </p>
          </div>

          <section className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-5 h-5 text-accent-purple" />
              <h2 className="text-lg font-semibold">
                {isMn ? "Хэл" : "Language"}
              </h2>
            </div>
            <p className="text-sm text-dark-400 mb-4">
              {isMn
                ? "Дэлгэцийн хэлийг сонгоно уу."
                : "Choose the display language."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setLanguage("mn")}
                className={`${optionBase} ${
                  language === "mn" ? optionActive : optionInactive
                }`}
                aria-pressed={language === "mn"}
              >
                Монгол (MN)
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`${optionBase} ${
                  language === "en" ? optionActive : optionInactive
                }`}
                aria-pressed={language === "en"}
              >
                English (EN)
              </button>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
            <div className="flex items-center gap-3 mb-4">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-accent-blue" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
              <h2 className="text-lg font-semibold">
                {isMn ? "Өнгөний горим" : "Theme"}
              </h2>
            </div>
            <p className="text-sm text-dark-400 mb-4">
              {isMn
                ? "Light эсвэл Dark горим сонгоно уу."
                : "Choose between Light and Dark mode."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`${optionBase} ${
                  theme === "light" ? optionActive : optionInactive
                }`}
                aria-pressed={theme === "light"}
              >
                {isMn ? "Гэрэл (Light)" : "Light"}
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`${optionBase} ${
                  theme === "dark" ? optionActive : optionInactive
                }`}
                aria-pressed={theme === "dark"}
              >
                {isMn ? "Хар (Dark)" : "Dark"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
