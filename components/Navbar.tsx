"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [lang, setLang] = useState("en");

  const text = {
    en: {
      dashboard: "Dashboard",
      login: "Login"
    },
    mn: {
      dashboard: "Хянах самбар",
      login: "Нэвтрэх"
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 border-b bg-white/80 backdrop-blur">
      <Link href="/" className="font-semibold text-lg">
        Career AI
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-gray-700 hover:text-black">
          {text[lang].dashboard}
        </Link>

        <button className="rounded-md bg-black text-white text-sm px-3 py-1.5 hover:bg-gray-900">
          {text[lang].login}
        </button>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setLang("en")}
            className="text-xs border px-2 py-1 rounded"
          >
            EN
          </button>

          <button
            onClick={() => setLang("mn")}
            className="text-xs border px-2 py-1 rounded"
          >
            MN
          </button>
        </div>
      </div>
    </nav>
  );
}