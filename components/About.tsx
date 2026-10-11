"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { t } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* label + bio, sticky enquanto os cards são lidos */}
          <div data-bio-col className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
              {t.sections.about}
            </h2>
            <p className="text-lg text-muted leading-relaxed">{t.about.bio}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            {t.about.differentials.map((d, i) => (
              <div
                key={d.label}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`border border-[var(--border)] p-5 sm:p-6 lg:p-9 transition-all duration-500 ease-out hover:border-[#404040] ${
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {d.label}
                  </span>
                  <span className="font-mono text-sm font-semibold text-[var(--text)]">
                    {d.value}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
