"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Languages, LogOut, Menu, Moon, Sun, User } from "lucide-react";

import AIHelper from "@/components/AIHelper";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { language, theme, toggleLanguage, toggleTheme } = useUiStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const isMn = language === "mn";
  const navLinks = useMemo(
    () => [
      { href: "/", label: isMn ? "Нүүр" : "Home" },
      { href: "/dashboard", label: isMn ? "Хяналтын самбар" : "Dashboard" },
      { href: "/test", label: isMn ? "Хувь хүний тест" : "Personality Test" },
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
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
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

              <button
                onClick={toggleLanguage}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs text-dark-200 transition-colors"
              >
                <Languages className="w-3 h-3" />
                <span>{isMn ? "MN" : "EN"}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
                aria-label={
                  theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-accent-blue" />
                )}
              </button>

              <button
                className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden py-4 border-t border-dark-700">
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

