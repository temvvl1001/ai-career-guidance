"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const text = {
    en: {
      dashboard: "Dashboard",
      login: "Login",
    },
    mn: {
      dashboard: "Хянах самбар",
      login: "Нэвтрэх",
    },
  } as const;

  const [lang, setLang] = useState<keyof typeof text>("en");

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 border-b border-dark-700 bg-dark-950/80 backdrop-blur">
      <Link href="/" className="font-semibold text-lg text-dark-100">
        Career AI
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-dark-300 hover:text-dark-100">
          {text[lang].dashboard}
        </Link>

        <button className="rounded-md bg-primary text-white text-sm px-3 py-1.5 hover:opacity-90">
          {text[lang].login}
        </button>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setLang("en")}
            className="text-xs border border-dark-700 px-2 py-1 rounded text-dark-200 hover:text-accent-blue"
          >
            EN
          </button>

          <button
            onClick={() => setLang("mn")}
            className="text-xs border border-dark-700 px-2 py-1 rounded text-dark-200 hover:text-accent-blue"
          >
            MN
          </button>
        </div>
      </div>
    </nav>
  );
}