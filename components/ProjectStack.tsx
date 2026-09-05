"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
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

/**
 * Pilha de cards: o de cima sai (sobe, apaga, encolhe) revelando o de
 * baixo, que já está pronto e parado no lugar — não precisa animar
 * "entrada", só aparecer conforme o de cima some. Um card a menos que o
 * total de segmentos de scroll: o último nunca sai, só fica.
 *
 * Abaixo de `prefers-reduced-motion`, ou com 1 projeto só (pilha de 1 não
 * faz sentido), cai numa grade estática com o fade que já existia.
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

  return <StackedTrack projects={projects} />;
}

function StackedTrack({ projects }: { projects: ProjectData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const total = projects.length;
  const segments = Math.max(total - 1, 1);

  return (
    <div ref={ref} style={{ height: `${segments * 70}vh` }}>
      <div className="sticky top-16 mx-auto max-w-3xl" style={{ height: "82dvh" }}>
        <span className="absolute -top-10 right-0 font-mono text-[11px] text-muted">
          {String(1).padStart(2, "0")}–{String(total).padStart(2, "0")}
        </span>

        {projects.map((p, i) => (
          <StackedCard
            key={p.id}
            project={p}
            index={i}
            total={total}
            segments={segments}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

/** 0 enquanto o card está no topo da pilha; vai a 1 conforme ele sai. */
function useStep(progress: MotionValue<number>, index: number, segments: number) {
  const from = index / segments;
  const to = (index + 1) / segments;
  return useTransform(progress, [from, to], [0, 1], { clamp: true });
}

function StackedCard({
  project,
  index,
  total,
  segments,
  progress,
}: {
  project: ProjectData;
  index: number;
  total: number;
  segments: number;
  progress: MotionValue<number>;
}) {
  // chamado sempre, até no último card — hooks não podem ser condicionais.
  // o valor só não é aplicado quando isLast (ver style abaixo).
  const local = useStep(progress, Math.min(index, segments - 1), segments);
  const isLast = index === total - 1;

  const y = useTransform(local, [0, 1], [0, -60]);
  const opacity = useTransform(local, [0, 0.75, 1], [1, 1, 0]);
  const scale = useTransform(local, [0, 1], [1, 0.95]);

  const link = project.link;

  return (
    // bg-page e essencial aqui, nao so estetico: o SpotlightCard nao tem
    // fundo opaco (o gradiente dele vira transparente depois de 60% da
    // diagonal), pensado pra ficar sozinho num grid sobre a pagina. Com 4
    // cards empilhados na mesma posicao, sem isso todos aparecem ao mesmo
    // tempo, um vazando por cima do outro.
    <motion.div
      className="absolute inset-0 bg-page"
      style={{
        zIndex: total - index,
        y: isLast ? 0 : y,
        opacity: isLast ? 1 : opacity,
        scale: isLast ? 1 : scale,
      }}
    >
      {/* h-full + overflow-y-auto: rede de seguranca — se um projeto tiver
          conteudo demais pra caber na altura fixa da pilha, rola por dentro
          do card em vez de cortar texto sem aviso */}
      <SpotlightCard className="h-full">
        <div className="flex h-full flex-col justify-start gap-4 overflow-y-auto p-6 sm:justify-center sm:gap-5 sm:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold text-primary sm:text-3xl">{project.title}</h3>
            {project.label && (
              <span className="whitespace-nowrap border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted">
                {project.label}
              </span>
            )}
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-lg">
            {project.description}
          </p>

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
    </motion.div>
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

              {project.metrics && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.metrics.map((m) => (
                    <span key={m} className="border border-accent px-2 py-1 font-mono text-[10px] text-accent">
                      {m}
                    </span>
                  ))}
                </div>
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
