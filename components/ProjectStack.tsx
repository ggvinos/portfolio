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

// vh de scroll dedicado a cada carta — precisa ser bastante pra dar tempo
// de perceber "essa saiu, essa entrou", nao uma troca de 100-200px
const VH_POR_CARTA = 165;

// quanto cada nivel de profundidade na pilha desce/encolhe em repouso
const OFFSET_POR_NIVEL = 22;
const ESCALA_POR_NIVEL = 0.045;

/**
 * Pilha de cartas de verdade: todas existem e ficam visíveis o tempo
 * todo, desde o início, com profundidade (offset + escala decrescente)
 * simulando cartas físicas empilhadas — a carta 2 e 3 espiam atrás da 1.
 *
 * Quando o scroll avança, a carta da frente sobe/apaga/gira saindo,
 * enquanto TODAS as de trás sobem um nível ao mesmo tempo (a pilha
 * inteira se desloca junto, não só a próxima carta) — é o que acontece
 * fisicamente ao tirar a carta do topo de uma pilha real.
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

  return (
    <div ref={ref} style={{ height: `${total * VH_POR_CARTA}vh` }}>
      <div className="sticky top-16 mx-auto max-w-3xl" style={{ height: "70vh" }}>
        <span className="absolute -top-10 right-0 font-mono text-[11px] text-muted">
          {String(1).padStart(2, "0")}–{String(total).padStart(2, "0")}
        </span>

        {projects.map((p, i) => (
          <StackedCard key={p.id} project={p} index={i} total={total} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function StackedCard({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === total - 1;

  // a ultima carta nunca "sai": congela o progresso dela no instante em
  // que ela chega na frente, senao ela tambem tentaria sair no fim
  const tetoProgresso = isLast ? (total - 1) / total : 1;
  const progressoEfetivo = useTransform(progress, (p) => Math.min(p, tetoProgresso));

  // posicao continua na fila: positivo = ainda empilhada atras (quanto
  // maior, mais no fundo), 0 = na frente, negativo = ja e a vez dela sair.
  // formula unica pra tudo: conforme o progresso avanca, TODA a pilha
  // desliza um nivel de uma vez — nao e "a proxima carta reage", e "a
  // pilha inteira anda", que e como uma pilha fisica se comporta.
  const posicaoNaFila = useTransform(progressoEfetivo, (p) => index - p * total);

  const profundidade = useTransform(posicaoNaFila, (r) => Math.max(0, r));
  const saida = useTransform(posicaoNaFila, (r) => Math.min(1, Math.max(0, -r)));

  const y = useTransform([profundidade, saida], ([prof, sai]: number[]) => prof * OFFSET_POR_NIVEL - sai * 220);
  const scale = useTransform(
    [profundidade, saida],
    ([prof, sai]: number[]) => Math.max(0.8, 1 - prof * ESCALA_POR_NIVEL) * (1 - sai * 0.08),
  );
  const opacity = useTransform(saida, (sai) => 1 - sai);
  const rotate = useTransform(saida, (sai) => sai * (index % 2 === 0 ? -7 : 7));

  const link = project.link;

  return (
    // z-index estatico por indice, nao dinamico: fisicamente, a carta
    // sendo tirada do topo passa POR CIMA da que esta sendo revelada
    // embaixo enquanto e levantada — e assim que uma pilha real se
    // comporta, entao a carta de indice menor sempre pinta por cima.
    <motion.div
      className="absolute inset-0 flex items-start justify-center px-4 pt-2"
      style={{ zIndex: total - index, y, opacity, scale, rotate }}
    >
      {/* bg-page: o SpotlightCard nao tem fundo opaco por padrao (o
          gradiente dele vira transparente depois de 60% da diagonal,
          pensado pra ficar sozinho sobre a pagina). Com varias cartas
          empilhadas na mesma area isso deixava todas se misturando.
          shadow: reforca a leitura de "carta fisica", nao card plano. */}
      <SpotlightCard className="w-full max-w-2xl bg-page shadow-xl shadow-black/10">
        <div className="flex max-h-[65vh] flex-col gap-4 overflow-y-auto p-6 sm:gap-5 sm:p-10">
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
