"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/context";

const ITEMS = [
  "about",
  "projects",
  "experience",
  "education",
  "skills",
  "writing",
  "contact",
] as const;

export default function Nav() {
  const { t, lang, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-default bg-white/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="absolute left-4 top-2 -translate-y-20 bg-page px-4 py-2 text-sm focus:translate-y-0 z-50"
      >
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <nav
        aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6"
      >
        <a
          href="#hero"
          aria-label={
            lang === "pt"
              ? "Vinicios Ferreira — início"
              : "Vinicios Ferreira — home"
          }
          className="font-mono text-sm font-semibold"
        >
          VF<span className="text-muted">.</span>
        </a>
        <div className="hidden items-center gap-5 text-sm md:flex">
          {ITEMS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="py-3 text-muted hover:text-primary"
            >
              {t.nav[key]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              toggle();
              setOpen(false);
            }}
            aria-label={
              lang === "pt" ? "Switch to English" : "Mudar para português"
            }
            className="min-h-11 min-w-11 border border-default px-3 font-mono text-xs hover:border-black"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              lang === "pt"
                ? open
                  ? "Fechar menu"
                  : "Abrir menu"
                : open
                  ? "Close menu"
                  : "Open menu"
            }
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span aria-hidden="true" className="text-2xl">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-default bg-page px-6 md:hidden"
      >
        {ITEMS.map((key) => (
          <a
            key={key}
            href={`#${key}`}
            onClick={() => setOpen(false)}
            className="block border-b border-default py-3 text-base last:border-0"
          >
            {t.nav[key]}
          </a>
        ))}
      </div>
    </header>
  );
}
