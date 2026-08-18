"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLanguage } from "@/lib/context";

/** Cores da marca do Acorde. O portfólio é monocromático; aqui o produto entra com a cara dele. */
const CORAL = "#ff7a59";
const ROXO = "#8c30ff";

type PanelData = {
  n: string;
  title: string;
  body: string;
  shot: string;
  alt: string;
};

type Closing = { title: string; body: string; cta: string; visit: string };

/**
 * Faixa horizontal do Acorde.
 *
 * Desktop: container alto com miolo sticky traduz scroll vertical em
 * translateX. Cada painel também reage ao próprio progresso — o do centro
 * fica nítido e em escala cheia, os vizinhos recuam.
 *
 * Celular: carrossel de arrastar com snap. Scroll-jack em touch é hostil.
 */
export default function AcordeShowcase() {
  const { t } = useLanguage();
  const s = t.acordeShowcase;
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setHorizontal(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // resize como rede de seguranca: em zoom e em alguns navegadores o evento
    // change do matchMedia nao chega, e o modo ficaria preso no que carregou.
    window.addEventListener("resize", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section id="acorde" className="relative border-t border-[var(--border)]">
      <Header eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      {horizontal ? (
        <HorizontalTrack panels={s.panels as unknown as PanelData[]} closing={s.closing} />
      ) : (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {s.panels.map((p) => (
            <div key={p.n} className="w-[85vw] shrink-0 snap-center">
              <StaticPanel {...p} />
            </div>
          ))}
          <div className="w-[85vw] shrink-0 snap-center">
            <ClosingPanel closing={s.closing} compact />
          </div>
        </div>
      )}
    </section>
  );
}

function Header({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-10">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</h2>
      <p className="max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        {title}
      </p>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{lead}</p>
    </div>
  );
}

function HorizontalTrack({ panels, closing }: { panels: PanelData[]; closing: Closing }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const total = panels.length + 1;

  // porcentagem do proprio trilho, nao vw: 100vw inclui a barra de rolagem e
  // deixaria o ultimo painel cortado pela largura dela.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((total - 1) / total) * 100}%`]);
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} style={{ height: `${total * 85}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <AuroraFundo progress={scrollYProgress} total={total} />

        <motion.div
          style={{ x, width: `${total * 100}%` }}
          className="relative flex h-full will-change-transform"
        >
          <LinhaGuia total={total} progress={scrollYProgress} />

          {panels.map((p, i) => (
            <div
              key={p.n}
              className="h-full shrink-0"
              style={{ width: `${100 / total}%` }}
            >
              <Panel {...p} index={i} total={total} progress={scrollYProgress} />
            </div>
          ))}
          <div
            className="h-full shrink-0"
            style={{ width: `${100 / total}%` }}
          >
            <ClosingPanel
              closing={closing}
              index={total - 1}
              total={total}
              progress={scrollYProgress}
            />
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-10 mx-auto h-px w-40 bg-[var(--border)]">
          <motion.div style={{ width: barra }} className="h-full bg-[var(--text)]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Progresso local do painel: -1 (chegando pela direita), 0 (centralizado),
 * 1 (saindo pela esquerda). Tudo dentro do painel deriva daqui.
 */
function useLocal(progress: MotionValue<number>, index: number, total: number) {
  const passo = 1 / (total - 1);
  const centro = index * passo;
  return useTransform(progress, [centro - passo, centro, centro + passo], [-1, 0, 1], {
    clamp: true,
  });
}

/** Nebulosa de fundo que troca de cor conforme a faixa avança. */
function AuroraFundo({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const opacidade = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.35]);
  const desloca = useTransform(progress, [0, 1], ["-12%", "12%"]);
  const matiz = useTransform(progress, [0, 0.5, 1], [CORAL, ROXO, CORAL]);
  const fundo = useTransform(
    matiz,
    (c) => `radial-gradient(ellipse 50% 60% at 50% 45%, ${c}22 0%, transparent 65%)`,
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: opacidade, x: desloca, background: fundo, willChange: "transform, opacity" }}
      // total entra só para o gradiente reagir a mudanças de contagem
      data-paineis={total}
    />
  );
}


/**
 * Curva-guia que atravessa a faixa inteira e se desenha conforme o scroll.
 *
 * O SVG e esticado (preserveAspectRatio="none"), o que distorce formas — por
 * isso so a curva mora aqui, com vectorEffect para a espessura nao esticar.
 * Os nos sao HTML posicionado em porcentagem, senao virariam elipses.
 */
function curva(total: number) {
  const pts = Array.from({ length: total }, (_, i) => ({
    x: i * 100 + 50,
    y: 82 + 7 * Math.sin(i * 1.25),
  }));
  let d = `M ${pts[0].x} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = (b.x - a.x) / 2;
    d += ` C ${a.x + dx} ${a.y.toFixed(2)}, ${b.x - dx} ${b.y.toFixed(2)}, ${b.x} ${b.y.toFixed(2)}`;
  }
  return { d, pts };
}

function LinhaGuia({ total, progress }: { total: number; progress: MotionValue<number> }) {
  const { d, pts } = curva(total);

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox={`0 0 ${total * 100} 100`}
        preserveAspectRatio="none"
      >
        {/* trilho apagado: mostra o caminho inteiro desde o inicio */}
        <path
          d={d}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* traco que se desenha com o progresso */}
        <motion.path
          d={d}
          fill="none"
          stroke={CORAL}
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress, filter: `drop-shadow(0 0 6px ${CORAL}88)` }}
        />
      </svg>

      {pts.map((pt, i) => (
        <No key={i} index={i} total={total} progress={progress} left={pt.x} top={pt.y} />
      ))}
    </>
  );
}

function No({
  index,
  total,
  progress,
  left,
  top,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  left: number;
  top: number;
}) {
  const local = useLocal(progress, index, total);
  const acende = useTransform(local, [-1, -0.35, 0, 0.35, 1], [0.25, 0.6, 1, 0.6, 0.25]);
  const escala = useTransform(local, [-1, 0, 1], [0.7, 1.6, 0.7]);

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute z-0 block h-2 w-2 rounded-full"
      style={{
        left: `${(left / (total * 100)) * 100}%`,
        top: `${top}%`,
        marginLeft: -4,
        marginTop: -4,
        opacity: acende,
        scale: escala,
        background: CORAL,
        boxShadow: `0 0 12px ${CORAL}`,
      }}
    />
  );
}

function Panel({
  n,
  title,
  body,
  shot,
  alt,
  index,
  total,
  progress,
}: PanelData & { index: number; total: number; progress: MotionValue<number> }) {
  const local = useLocal(progress, index, total);

  // o painel do centro fica nítido; os vizinhos recuam e apagam
  const opacity = useTransform(local, [-1, -0.45, 0, 0.45, 1], [0, 0.5, 1, 0.5, 0]);
  const escalaTexto = useTransform(local, [-1, 0, 1], [0.92, 1, 0.92]);

  // parallax interno: aparelho e texto viajam em ritmos diferentes
  const telaX = useTransform(local, [-1, 0, 1], [70, 0, -70]);
  const textoX = useTransform(local, [-1, 0, 1], [190, 0, -190]);
  const numeroX = useTransform(local, [-1, 0, 1], [320, 0, -320]);
  const brilho = useTransform(local, [-1, 0, 1], [0, 1, 0]);

  return (
    <motion.div
      style={{ opacity, willChange: "opacity" }}
      className="relative z-10 flex h-full w-full items-center justify-center px-16"
    >
      <div className="flex max-w-4xl items-center gap-16">
        <motion.div
          // so translate: escala e rotacao 3D reamostram a textura e borram
          style={{ x: telaX }}
          className="relative shrink-0"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
            style={{
              opacity: brilho,
              background: `radial-gradient(circle, ${CORAL}33 0%, transparent 70%)`,
            }}
          />
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-surface p-1.5 shadow-2xl shadow-black/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot}
              alt={alt}
              width={900}
              height={1951}
              loading="lazy"
              className="block rounded-[1.35rem]"
              style={{ width: 250 }}
            />
          </div>
        </motion.div>

        <div className="relative max-w-sm">
          <motion.span
            aria-hidden="true"
            style={{ x: numeroX, willChange: "transform" }}
            className="pointer-events-none absolute -left-4 -top-24 select-none font-mono text-[10rem] font-bold leading-none text-[var(--text)] opacity-[0.04]"
          >
            {n}
          </motion.span>

          <motion.div style={{ x: textoX, scale: escalaTexto, willChange: "transform" }}>
            <span className="font-mono text-xs" style={{ color: CORAL }}>
              {n}
            </span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              {title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{body}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ClosingPanel({
  closing,
  index,
  total,
  progress,
  compact = false,
}: {
  closing: Closing;
  index?: number;
  total?: number;
  progress?: MotionValue<number>;
  compact?: boolean;
}) {
  const conteudo = (
    <>
      <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
        {closing.title}
      </h3>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">{closing.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/projetos/acorde"
          className="bg-accent px-6 py-3 font-mono text-sm text-black transition-opacity duration-150 hover:opacity-80"
        >
          {closing.cta} →
        </Link>
        <a
          href="https://acorde.club"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[var(--border)] px-6 py-3 font-mono text-sm text-primary transition-colors duration-150 hover:border-accent"
        >
          {closing.visit} ↗
        </a>
      </div>
    </>
  );

  if (compact || !progress || index === undefined || total === undefined) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-[var(--border)] bg-surface p-8 text-center">
        {conteudo}
      </div>
    );
  }

  return <AnimatedClosing progress={progress} index={index} total={total} conteudo={conteudo} />;
}

function AnimatedClosing({
  progress,
  index,
  total,
  conteudo,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  conteudo: React.ReactNode;
}) {
  const local = useLocal(progress, index, total);
  const opacity = useTransform(local, [-1, -0.45, 0], [0, 0.5, 1]);
  const y = useTransform(local, [-1, 0], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y, willChange: "opacity" }}
      className="flex h-full w-full flex-col items-center justify-center px-16 text-center"
    >
      {conteudo}
    </motion.div>
  );
}

/** Versão sem scroll para o carrossel do celular. */
function StaticPanel({ n, title, body, shot, alt }: PanelData) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-[var(--border)] bg-surface p-8 text-center">
      <div className="rounded-[1.75rem] border border-[var(--border)] bg-surface p-1.5 shadow-2xl shadow-black/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot}
          alt={alt}
          width={900}
          height={1951}
          loading="lazy"
          className="block rounded-[1.35rem]"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <span className="font-mono text-xs" style={{ color: CORAL }}>
          {n}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary">{title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
