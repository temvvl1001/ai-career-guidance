"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

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

      setUser({ id: data.user.id, email: data.user.email, name: data.user.name });
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
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="text-sm text-dark-400">
              Access your dashboard, tests, and personalized career insights.
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
                Email
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
                  Name (optional)
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
                Password
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
              className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {googleAvailable && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 rounded-lg bg-red-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Sign in with Google
              </button>
            )}
            {!googleAvailable && (
              <p className="text-xs text-dark-400 text-center">
                Google sign-in is not configured yet.
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
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

