"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context";

export default function CaseNav() {
  const { t, lang, toggle } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--bg-alpha)" }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs text-muted hover:text-primary transition-colors duration-150"
        >
          ← {t.acordeCase.back}
        </Link>

        <button
          onClick={toggle}
          className="font-mono text-xs border border-[var(--border)] px-3 py-1.5 text-muted hover:border-accent hover:text-accent transition-colors duration-150"
        >
          {lang === "pt" ? "EN" : "PT"}
        </button>
      </nav>
    </header>
  );
}
