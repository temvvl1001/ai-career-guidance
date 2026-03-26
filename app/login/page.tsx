"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const setUser = useAuthStore((s) => s.setUser);
  const { language } = useUiStore();
  const isMn = language === "mn";

  // Google Login хийх функц
  const handleGoogleSignIn = async () => {
    try {
      // "google" provider-ийг ашиглан шууд Google-ийн нэвтрэх цонх руу үсрэнэ
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(isMn ? "Google-ээр нэвтрэхэд алдаа гарлаа" : "Failed to sign in with Google");
    }
  };

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

      // Хэрэв сервер 500 алдаа өгвөл JSON биш текст ирдэг тул catch хийх хэрэгтэй
      const data = await res.json().catch(() => ({ error: "Server error" }));

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (data.user) {
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
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center px-4 bg-dark-900">
        <div className="w-full max-w-md bg-dark-800 rounded-2xl border border-dark-600 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">
              {isLogin
                ? isMn ? "Тавтай морил" : "Welcome Back"
                : isMn ? "Шинэ аккаунт үүсгэх" : "Create Account"}
            </h1>
            <p className="text-sm text-dark-400">
              {isMn
                ? "Мэргэжил сонголтын AI зөвлөхөд тавтай морил."
                : "Your AI-powered career guidance companion."}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">
                  {isMn ? "Нэр" : "Full Name"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-600 text-white focus:border-accent-purple outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                {isMn ? "И-мейл" : "Email Address"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-600 text-white focus:border-accent-purple outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                {isMn ? "Нууц үг" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-600 text-white focus:border-accent-purple outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent-purple hover:bg-opacity-90 text-white font-semibold shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (isMn ? "Түр хүлээнэ үү..." : "Loading...") : (isLogin ? (isMn ? "Нэвтрэх" : "Sign In") : (isMn ? "Бүртгүүлэх" : "Register"))}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-dark-800 px-2 text-dark-400">{isMn ? "Эсвэл" : "Or continue with"}</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Google товчлуур одоо шууд харагдана */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 rounded-lg bg-white text-dark-900 font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isMn ? "Google-ээр нэвтрэх" : "Continue with Google"}
            </button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm text-dark-400 hover:text-accent-purple transition-colors text-center"
            >
              {isLogin
                ? isMn ? "Бүртгэлгүй юу? Шинэ аккаунт үүсгэх" : "Need an account? Sign up"
                : isMn ? "Аккаунттай юу? Нэвтрэх" : "Have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}