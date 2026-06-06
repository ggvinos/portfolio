"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";
import { useState, useCallback } from "react";

type TooltipItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

type TooltipState = {
  x: number;
  y: number;
  flipX: boolean;
  item: TooltipItem;
};

export default function Experience() {
  const { t } = useLanguage();
  const [refExp, inViewExp] = useInView();
  const [refAch, inViewAch] = useInView();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, item: TooltipItem) => {
      const flipX = e.clientX > window.innerWidth * 0.55;
      setTooltip({ x: e.clientX, y: e.clientY, flipX, item });
    },
    []
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

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
          {t.experience.map((item, i) => (
            <div
              key={i}
              onMouseMove={(e) => handleMouseMove(e, item)}
              onMouseLeave={handleMouseLeave}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`relative cursor-default select-none transition-all duration-500 ease-out group ${
                inViewExp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="absolute -left-[2.15rem] top-1.5 w-2.5 h-2.5 rounded-full bg-page border-2 border-accent transition-colors duration-150 group-hover:bg-accent" />
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-primary font-semibold group-hover:text-accent transition-colors duration-150">
                  {item.company}
                </span>
                {item.role && (
                  <span className="text-muted text-sm">{item.role}</span>
                )}
              </div>
              <div className="font-mono text-xs text-accent tracking-wide">
                {item.period}
              </div>
            </div>
          ))}
        </div>

        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none w-72 border border-[var(--border)] p-5"
            style={{
              left: tooltip.flipX ? tooltip.x - 304 : tooltip.x + 16,
              top: tooltip.y - 60,
              background: "var(--surface)",
            }}
          >
            <div className="text-sm font-semibold text-[var(--text)] mb-1">
              {tooltip.item.role}
            </div>
            <div className="font-mono text-[10px] text-[var(--accent)] tracking-wide mb-3">
              {tooltip.item.company} · {tooltip.item.period}
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {tooltip.item.description}
            </p>
          </div>
        )}

        <div
          ref={refAch}
          className={`mt-16 transition-all duration-700 ease-out ${
            inViewAch ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            ACHIEVEMENTS
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
