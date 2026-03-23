"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react";

import AIHelper from "@/components/AIHelper";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { language, theme, setLanguage, setTheme } = useUiStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    if (!profileOpen && !settingsOpen && !menuOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const inProfile = profileRef.current?.contains(target);
      const inSettings =
        settingsButtonRef.current?.contains(target) ||
        settingsPanelRef.current?.contains(target);
      const inMenu =
        menuButtonRef.current?.contains(target) ||
        menuPanelRef.current?.contains(target);

      if (inProfile || inSettings || inMenu) return;

      setProfileOpen(false);
      setSettingsOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [menuOpen, profileOpen, settingsOpen]);

  const isMn = language === "mn";
  const navLinks = useMemo(
    () => [
      { href: "/", label: isMn ? "Нүүр" : "Home" },
      { href: "/dashboard", label: isMn ? "Хяналтын самбар" : "Dashboard" },
      { href: "/results", label: isMn ? "Үр дүн" : "Results" },
    ],
    [isMn]
  );

  const showCompactAI =
    Boolean(pathname) && pathname !== "/" && !pathname.startsWith("/test");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    setProfileOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                {isMn ? "AI Мэргэжил Сонголт" : "AI Career Guide"}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    mounted && pathname === link.href
                      ? "text-accent-purple"
                      : "text-dark-300 hover:text-dark-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => {
                      setProfileOpen((v) => !v);
                      setSettingsOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
                  >
                    <User className="w-5 h-5 text-accent-purple" />
                    <span className="hidden sm:inline text-sm">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-800 rounded-xl shadow-xl border border-dark-600">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-700"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-dark-700 text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                  {isMn ? "Нэвтрэх" : "Sign In"}
                </Link>
              )}

              <div className="relative">
                <button
                  ref={settingsButtonRef}
                  onClick={() => {
                    setSettingsOpen((v) => !v);
                    setProfileOpen(false);
                  }}
                  className="p-2 rounded-full transition-colors"
                  aria-label={isMn ? "Тохиргоо" : "Settings"}
                  title={isMn ? "Тохиргоо" : "Settings"}
                >
                  <Settings className="w-4 h-4 text-accent-purple" />
                </button>

                {settingsOpen && (
                  <div
                    className="fixed inset-0 z-[70]"
                    onClick={() => setSettingsOpen(false)}
                  >
                    <div
                      ref={settingsPanelRef}
                      className="absolute inset-y-0 right-0 w-[min(90vw,22rem)] h-[100dvh] bg-white text-slate-800 border-l border-slate-200 shadow-2xl p-5 dark:bg-dark-900 dark:text-dark-100 dark:border-dark-700"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-dark-700">
                        <div className="text-lg font-semibold">
                          {isMn ? "Тохиргоо" : "Settings"}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSettingsOpen(false)}
                          className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
                          aria-label={isMn ? "Хаах" : "Close"}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 dark:border-dark-700 dark:bg-dark-950/60">
                          <div>
                            <div className="text-sm font-medium text-slate-800 dark:text-dark-100">
                              {isMn ? "Хэл" : "Language"}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-dark-400">
                              {isMn ? "Монгол (MN)" : "English (EN)"}
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={language === "mn"}
                            aria-label={isMn ? "Хэл солих" : "Toggle language"}
                            onClick={() =>
                              setLanguage(language === "mn" ? "en" : "mn")
                            }
                            className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/60 ${
                              language === "mn"
                                ? "bg-gradient-to-r from-accent-purple to-accent-blue border-transparent shadow-[0_0_0_1px_rgba(139,92,246,0.45)]"
                                : "bg-slate-200 border-slate-300 shadow-inner dark:bg-dark-900/70 dark:border-dark-600"
                            }`}
                          >
                            <span
                              className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white text-[11px] font-bold leading-none text-slate-900 shadow-md transition-transform duration-200 ${
                                language === "mn" ? "translate-x-5" : "translate-x-1"
                              }`}
                            >
                              {language === "mn" ? "MN" : "EN"}
                            </span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 dark:border-dark-700 dark:bg-dark-950/60">
                          <div>
                            <div className="text-sm font-medium text-slate-800 dark:text-dark-100">
                              {isMn ? "Өнгөний горим" : "Theme"}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-dark-400">
                              {theme === "dark"
                                ? isMn
                                  ? "Хар"
                                  : "Dark"
                                : isMn
                                  ? "Гэрэл"
                                  : "Light"}
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={theme === "dark"}
                            aria-label={isMn ? "Өнгө солих" : "Toggle theme"}
                            onClick={() =>
                              setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/60 ${
                              theme === "dark"
                                ? "bg-gradient-to-r from-accent-purple to-accent-blue border-transparent shadow-[0_0_0_1px_rgba(139,92,246,0.45)]"
                                : "bg-slate-200 border-slate-300 shadow-inner dark:bg-dark-900/70 dark:border-dark-600"
                            }`}
                          >
                            <span
                              className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ${
                                theme === "dark" ? "translate-x-5" : "translate-x-1"
                              }`}
                            >
                              {theme === "dark" ? (
                                <Moon className="w-3 h-3 text-slate-700" />
                              ) : (
                                <Sun className="w-3 h-3 text-amber-500" />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                ref={menuButtonRef}
                className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setSettingsOpen(false);
                  setProfileOpen(false);
                }}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {menuOpen && (
            <div
              ref={menuPanelRef}
              className="md:hidden py-4 border-t border-dark-700"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      mounted && pathname === link.href
                        ? "bg-dark-800 text-accent-purple"
                        : "hover:bg-dark-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {showCompactAI && <AIHelper compact />}
    </>
  );
}

