"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const { language } = useUiStore();
  const isMn = language === "mn";

  useEffect(() => {
    let active = true;

    const loadProviders = async () => {
      try {
        const res = await fetch("/api/auth/providers");
        if (!res.ok) {
          if (active) setGoogleAvailable(false);
          return;
        }

        const providers = await res.json();
        if (active) {
          setGoogleAvailable(Boolean(providers?.google));
        }
      } catch {
        if (active) {
          setGoogleAvailable(false);
        }
      }
    };

    loadProviders();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin
        ? { email, password }
        : { email, password, name: name || undefined };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
        skills: data.user.skills ?? [],
        interests: data.user.interests ?? [],
        favoriteSubjects: data.user.favoriteSubjects ?? [],
      });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const callbackUrl = encodeURIComponent("/dashboard");
    window.location.href = `/api/auth/signin/google?callbackUrl=${callbackUrl}`;
  };

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-dark-800 rounded-2xl border border-dark-600 shadow-2xl p-6 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">
              {isLogin
                ? isMn
                  ? "Бүртгэлтэй аккаунтаараа нэвтрэх"
                  : "Sign in to your account"
                : isMn
                ? "Шинэ аккаунт үүсгэх"
                : "Create your account"}
            </h1>
            <p className="text-sm text-dark-400">
              {isMn
                ? "Хяналтын самбар, тестүүд болон AI-д суурилсан зөвлөмжүүддээ нэвтрээрэй."
                : "Access your dashboard, tests, and personalized career insights."}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-dark-300 mb-2"
              >
                {isMn ? "И-мейл" : "Email"}
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="login-name"
                  className="block text-sm font-medium text-dark-300 mb-2"
                >
                  {isMn ? "Нэр (заавал биш)" : "Name (optional)"}
                </label>
                <input
                  id="login-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-dark-300 mb-2"
              >
                {isMn ? "Нууц үг" : "Password"}
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading
                ? isMn
                  ? "Түр хүлээнэ үү..."
                  : "Please wait..."
                : isLogin
                ? isMn
                  ? "Нэвтрэх"
                  : "Sign In"
                : isMn
                ? "Бүртгүүлэх"
                : "Create Account"}
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {googleAvailable && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 rounded-lg bg-dark-900 border border-dark-700 text-dark-100 font-medium hover:border-accent-blue/60 hover:text-accent-blue transition-colors"
              >
                {isLogin
                  ? isMn
                    ? "Google-ээр нэвтрэх"
                    : "Sign in with Google"
                  : isMn
                  ? "Google-ээр бүртгүүлэх"
                  : "Sign up with Google"}
              </button>
            )}
            {!googleAvailable && (
              <p className="text-xs text-dark-400 text-center">
                {isMn
                  ? "Google-ээр нэвтрэх тохиргоо хийгдээгүй байна."
                  : "Google sign-in is not configured yet."}
              </p>
            )}

            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm text-accent-purple hover:underline text-center"
            >
              {isLogin
                ? isMn
                  ? "Бүртгэлгүй юу? Шинэ аккаунт үүсгэх"
                  : "Don't have an account? Sign up"
                : isMn
                ? "Аль хэдийн аккаунттай? Нэвтрэх"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

