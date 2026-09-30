"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";

type ProjectData = {
  id: string;
  title: string;
  description: string;
  detail: readonly string[] | null;
  metrics: readonly string[] | null;
  tags: readonly string[];
  label: string | null;
  link: string | null;
};

// distancia de scroll entre a chegada de uma carta e a da seguinte
const STEP_VH = 70;

// sobra de leitura garantida pra ultima carta, que nao tem nenhuma depois
// pra lhe dar motivo de continuar presa
const TAIL_VH = 120;

// cada carta gruda um pouco mais abaixo que a anterior: e essa diferenca de
// "top" que deixa a faixa de titulo da carta de baixo espiando por cima da
// que esta por cima dela, ao inves dela simplesmente desaparecer
const PEEK_PX = 34;

/**
 * Empilhamento por acumulo: o wrapper de cada carta e absolutamente
 * posicionado do seu instante de chegada ate o fim do trilho inteiro
 * (top crescente, bottom: 0), entao o elemento sticky por dentro dele
 * permanece grudado no topo ate o trilho acabar, nao so ate a proxima
 * carta chegar. Resultado: conforme rola, as cartas anteriores nao somem,
 * ficam empilhadas como faixas de titulo visiveis por cima da carta atual,
 * uma sobre a outra, de baixo para cima na pagina, crescendo a pilha.
 *
 * Abaixo de `prefers-reduced-motion`, ou com 1 projeto so (pilha de 1 nao
 * faz sentido), cai numa grade estatica com o fade que ja existia.
 */
export default function ProjectStack({ projects }: { projects: ProjectData[] }) {
  const [empilhado, setEmpilhado] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEmpilhado(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!empilhado || projects.length <= 1) {
    return <StaticGrid projects={projects} />;
  }

  const total = projects.length;
  const totalVh = (total - 1) * STEP_VH + TAIL_VH;

  return (
    <div className="relative" style={{ height: `${totalVh}vh` }}>
      {projects.map((project, i) => (
        <div key={project.id} className="absolute inset-x-0 bottom-0" style={{ top: `${i * STEP_VH}vh` }}>
          <div
            className="sticky flex justify-center px-4 pb-6"
            style={{ top: `${64 + i * PEEK_PX}px`, zIndex: i + 1 }}
          >
            <StackedCardContent project={project} index={i} total={total} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StackedCardContent({ project, index, total }: { project: ProjectData; index: number; total: number }) {
  const link = project.link;

  return (
    <SpotlightCard className="w-full max-w-2xl bg-page shadow-xl shadow-black/10">
      <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto p-6 sm:gap-5 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-xl font-semibold text-primary sm:text-3xl">{project.title}</h3>
          {project.label && (
            <span className="whitespace-nowrap border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted">
              {project.label}
            </span>
          )}
          <span className="ml-auto font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, "0")}–{String(total).padStart(2, "0")}
          </span>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-lg">{project.description}</p>

        {project.detail && (
          <ul className="space-y-1.5 sm:space-y-2">
            {project.detail.map((item, j) => (
              <li key={j} className="flex gap-2 text-xs text-muted sm:text-sm">
                <span className="shrink-0 font-mono text-accent">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {project.metrics && (
          <div className="flex flex-wrap gap-1.5">
            {project.metrics.map((m) => (
              <span key={m} className="border border-accent px-2 py-1 font-mono text-[10px] text-accent">
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-muted">
              {tag}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1.5 font-mono text-xs text-accent hover:underline"
          >
            {link.includes("github.com") ? "github ↗" : link.replace("https://", "")}
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

/** Fallback: grade estática com o mesmo fade por IntersectionObserver de sempre. */
function StaticGrid({ projects }: { projects: ProjectData[] }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, i) => {
        const link = project.link;
        return (
          <SpotlightCard key={project.id}>
            <div
              className="flex h-full flex-col p-6"
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-base font-semibold text-primary">{project.title}</h3>
                {project.label && (
                  <span className="whitespace-nowrap border border-[var(--border)] px-2 py-0.5 font-mono text-[9px] tracking-widest text-muted">
                    {project.label}
                  </span>
                )}
              </div>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

              {project.detail && (
                <ul className="mb-4 space-y-1.5">
                  {project.detail.map((item, j) => (
                    <li key={j} className="flex gap-2 text-xs text-muted">
                      <span className="shrink-0 font-mono text-accent">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block py-1.5 font-mono text-xs text-accent hover:underline"
                >
                  {link.includes("github.com") ? "github ↗" : link.replace("https://", "")}
                </a>
              )}
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
