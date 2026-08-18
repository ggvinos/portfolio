"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/context";

const ITEMS = [
  ["about", "#about"],
  ["projects", "#projects"],
  ["experience", "#experience"],
  ["education", "#education"],
  ["skills", "#skills"],
  ["writing", "#writing"],
  ["contact", "#contact"],
] as const;

export default function Nav() {
  const { t, lang, toggle } = useLanguage();
  const [aberto, setAberto] = useState(false);

  // troca de idioma ou de rota fecha o menu; scroll trava enquanto aberto
  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--bg-alpha)" }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-center sm:justify-center relative">
        <div className="flex items-center gap-6 text-sm">
          {ITEMS.map(([key, href]) => (
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
            className="font-mono text-xs border border-[var(--border)] px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-150 text-muted"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>

        {/* hambúrguer: só existe abaixo de sm, onde os links somem */}
        <button
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? (lang === "pt" ? "Fechar menu" : "Close menu") : (lang === "pt" ? "Abrir menu" : "Open menu")}
          aria-expanded={aberto}
          className="absolute right-6 flex h-11 w-11 items-center justify-center sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className="absolute left-0 top-0 h-px w-5 bg-[var(--text)] transition-transform duration-200"
              style={{ transform: aberto ? "translateY(7.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-[var(--text)] transition-opacity duration-150"
              style={{ opacity: aberto ? 0 : 1 }}
            />
            <span
              className="absolute left-0 bottom-0 h-px w-5 bg-[var(--text)] transition-transform duration-200"
              style={{ transform: aberto ? "translateY(-7.5px) rotate(-45deg)" : "none" }}
            />
          </span>
        </button>
      </nav>

      {/* painel do menu mobile */}
      <div
        className="overflow-hidden border-t sm:hidden transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: aberto ? 420 : 0,
          borderColor: aberto ? "var(--border)" : "transparent",
          backgroundColor: "var(--bg)",
        }}
      >
        <div className="flex flex-col px-6 py-2">
          {ITEMS.map(([key, href]) => (
            <a
              key={key}
              href={href}
              onClick={() => setAberto(false)}
              className="border-b border-[var(--border)] py-4 text-base text-primary last:border-none"
            >
              {t.nav[key]}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
