"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="py-24 bg-surface border-y border-default">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          {t.sections.about}
        </h2>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <p className="text-lg text-muted leading-relaxed">
              {t.about.bio}
            </p>

            <div className="space-y-4">
              {t.about.differentials.map((d, i) => (
                <div
                  key={d.label}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`border border-default p-5 transition-all duration-500 ease-out ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      {d.label}
                    </span>
                    <span className="font-mono text-sm font-semibold text-accent">
                      {d.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
