"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginPopup({ isOpen, onClose, onSuccess }: LoginPopupProps) {
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

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setUser({ id: data.user.id, email: data.user.email, name: data.user.name });
      onSuccess?.();
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-dark-800 rounded-2xl border border-dark-600 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-dark-600">
          <h2 className="text-xl font-semibold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="popup-email"
              className="block text-sm font-medium text-dark-300 mb-2"
            >
              Email
            </label>
            <input
              id="popup-email"
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
                htmlFor="popup-name"
                className="block text-sm font-medium text-dark-300 mb-2"
              >
                Name (optional)
              </label>
              <input
                id="popup-name"
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
              htmlFor="popup-password"
              className="block text-sm font-medium text-dark-300 mb-2"
            >
              Password
            </label>
            <input
              id="popup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-colors"
              placeholder="********"
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

        <div className="px-6 pb-6 flex flex-col gap-3">
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
            className="text-sm text-accent-purple hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
