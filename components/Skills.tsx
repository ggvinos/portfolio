"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";

export default function Skills() {
  const { t } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          {t.sections.skills}
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {(Object.entries(t.skills) as [string, readonly string[]][]).map(
            ([group, items], gi) => (
              <div
                key={group}
                style={{ transitionDelay: `${gi * 80}ms` }}
                className={`transition-all duration-500 ease-out ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="font-mono text-[11px] text-muted uppercase tracking-widest mb-4">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, si) => (
                    <span
                      key={skill}
                      style={{ transitionDelay: `${gi * 80 + si * 40}ms` }}
                      className={`font-mono text-xs px-3 py-1.5 border border-[var(--border)] text-muted bg-surface hover:border-[#404040] hover:text-[var(--text)] transition-colors duration-150 cursor-default ${
                        inView ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
