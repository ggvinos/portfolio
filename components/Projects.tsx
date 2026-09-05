"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectStack from "@/components/ProjectStack";

export default function Projects() {
  const { t, lang } = useLanguage();
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

        <ProjectStack projects={rest as unknown as Parameters<typeof ProjectStack>[0]["projects"]} />

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
                      className="font-mono text-xs text-accent hover:underline mt-4 inline-block py-1.5"
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
