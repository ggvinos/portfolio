"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";

export default function Articles() {
  const { t } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section id="writing" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          {t.sections.writing}
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`border border-[var(--border)] bg-surface p-6 flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer hover:border-[#404040] hover:-translate-y-1 hover:bg-[#ececec] group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <span className="font-mono text-[10px] px-2 py-0.5 border border-default text-muted tracking-widest mb-4 inline-block">
                  {article.platform}
                </span>
                <h3 className="text-sm font-semibold text-primary leading-snug mt-3">
                  {article.title}
                </h3>
              </div>
              <div className="mt-6 flex items-center text-muted font-mono text-xs gap-1 group-hover:text-[var(--text)] transition-colors duration-300">
                <span>Read</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
