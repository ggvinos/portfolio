"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";
import { useState } from "react";

export default function Experience() {
  const { t } = useLanguage();
  const [refExp, inViewExp] = useInView();
  const [refAch, inViewAch] = useInView();
  // Set em vez de indice unico: abrir um cargo nao fecha os outros que o
  // usuario ja tinha aberto pra comparar.
  const [abertos, setAbertos] = useState<Set<number>>(new Set());

  const alternar = (i: number) => {
    setAbertos((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section id="experience" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          {t.sections.experience}
        </h2>

        <div
          ref={refExp}
          className="relative border-l border-default pl-8 flex flex-col gap-10"
        >
          {t.experience.map((item, i) => {
            const aberto = abertos.has(i);
            return (
              <div
                key={i}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`relative transition-all duration-500 ease-out group ${
                  inViewExp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span
                  className={`absolute -left-[2.15rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent transition-colors duration-150 ${
                    aberto ? "bg-accent" : "bg-page group-hover:bg-accent"
                  }`}
                />

                {/* botao real: funciona em toque, mouse e teclado — a
                    descricao antes so aparecia num tooltip preso ao
                    mousemove, invisivel em qualquer tela sem mouse */}
                <button
                  type="button"
                  onClick={() => alternar(i)}
                  aria-expanded={aberto}
                  aria-controls={`experiencia-detalhe-${i}`}
                  className="flex w-full flex-wrap items-baseline gap-2 text-left"
                >
                  <span className="text-primary font-semibold group-hover:text-accent transition-colors duration-150">
                    {item.company}
                  </span>
                  {item.role && (
                    <span className="text-muted text-sm">{item.role}</span>
                  )}
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-muted transition-transform duration-200"
                    style={{ transform: aberto ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>

                <div className="font-mono text-xs text-accent tracking-wide mt-1">
                  {item.period}
                </div>

                <div
                  id={`experiencia-detalhe-${i}`}
                  className="overflow-hidden transition-[max-height] duration-300 ease-out"
                  style={{ maxHeight: aberto ? 320 : 0 }}
                >
                  <p className="max-w-xl pt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {"languages" in t && Array.isArray((t as any).languages) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {((t as any).languages as {lang: string; level: string}[]).map((l) => (
              <div key={l.lang} className="border border-[var(--border)] px-4 py-2 flex gap-2 items-baseline">
                <span className="text-sm font-semibold text-primary">{l.lang}</span>
                <span className="font-mono text-[10px] text-muted">{l.level}</span>
              </div>
            ))}
          </div>
        )}

        <div
          ref={refAch}
          className={`mt-16 transition-all duration-700 ease-out ${
            inViewAch ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            {t.sections.achievements}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.achievements.map((item, i) => (
              <SpotlightCard key={i}>
                <div
                  className="p-6"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: inViewAch ? 1 : 0,
                    transform: inViewAch ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-primary font-semibold text-sm">{item.title}</span>
                    <span className="font-mono text-[10px] text-accent">{item.result}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
