"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 border-b bg-white/80 backdrop-blur">
      <Link href="/" className="font-semibold text-lg">
        Career AI
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-gray-700 hover:text-black">
          Dashboard
        </Link>
        <button className="rounded-md bg-black text-white text-sm px-3 py-1.5 hover:bg-gray-900">
          Login
        </button>
      </div>
    </nav>
  );
}
