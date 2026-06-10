"use client";

import { useLanguage } from "@/lib/context";

export default function Nav() {
  const { t, lang, toggle } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--bg-alpha)" }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-center">
        <div className="flex items-center gap-6 text-sm">
          {(
            [
              ["about", "#about"],
              ["projects", "#projects"],
              ["experience", "#experience"],
              ["education", "#education"],
              ["skills", "#skills"],
              ["writing", "#writing"],
              ["contact", "#contact"],
            ] as const
          ).map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="text-muted hover:text-primary transition-colors duration-150 hidden sm:block"
            >
              {t.nav[key]}
            </a>
          ))}

          <button
            onClick={toggle}
            className="font-mono text-xs border border-[var(--border)] px-3 py-1 hover:border-accent hover:text-accent transition-colors duration-150 text-muted"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>
      </nav>
    </header>
  );
}
