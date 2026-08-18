"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";

export default function Projects() {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView();
  const [refPersonal, inViewPersonal] = useInView();

  // o Acorde (featured) vive na faixa horizontal propria, acima desta secao
  const rest = t.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          {t.sections.projects}
        </h2>
        <p className="text-muted text-sm mb-10">
          {lang === "en"
            ? "Internal tools and test suites I shipped."
            : "Ferramentas internas e suites de teste que entreguei."}
        </p>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((project, i) => {
              const link = project.link as string | null;
              return (
              <SpotlightCard key={project.id}>
                <div
                  className="p-6 flex flex-col h-full"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-base font-semibold text-primary">{project.title}</h3>
                    {project.label && (
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[var(--border)] text-muted tracking-widest whitespace-nowrap">
                        {project.label}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {project.detail && (
                    <ul className="space-y-1.5 mb-4">
                      {project.detail.map((item, j) => (
                        <li key={j} className="flex gap-2 text-xs text-muted">
                          <span className="text-accent font-mono shrink-0">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.metrics && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.metrics.map((m) => (
                        <span key={m} className="font-mono text-[10px] px-2 py-1 border border-accent text-accent">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[11px] px-2 py-1 border border-[var(--border)] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-accent hover:underline mt-4 inline-block"
                    >
                      {link.includes("github.com") ? "github ↗" : link.replace("https://", "")}
                    </a>
                  )}
                </div>
              </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* PERSONAL PROJECTS */}
        <div className="mt-20">
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            {t.sections.personal}
          </h2>
          <p className="text-muted text-sm mb-8">
            {lang === "en" ? "Outside of work." : "Fora do trabalho."}
          </p>

          <div ref={refPersonal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.personal.map((p, i) => (
              <SpotlightCard key={p.id}>
                <div
                  className="p-6 flex flex-col"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: inViewPersonal ? 1 : 0,
                    transform: inViewPersonal ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-base font-semibold text-primary font-mono">{p.title}</h3>
                    <span className="font-mono text-[9px] px-2 py-0.5 border border-[var(--border)] text-muted tracking-widest">
                      {p.platform}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed flex-1">{p.description}</p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-accent hover:underline mt-4"
                    >
                      {p.link.replace("https://www.", "")} ↗
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
