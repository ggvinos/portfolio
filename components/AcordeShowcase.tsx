"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";

type PanelData = {
  n: string;
  tag: string;
  title: string;
  body: string;
  shot: string;
  alt: string;
};

type Closing = { title: string; body: string; visit: string };

// dvh de scroll dedicado a cada passo: curto de proposito, essa secao
// e uma demonstracao rapida do produto, nao o produto em si.
const STEP_VH = 100;

/**
 * Faixa vertical do Acorde: a mesma ideia do "tour guiado" que existe em
 * acorde.club/sobre (ver lyriclearn/src/pages/Sobre/Scrolly.jsx), portada
 * pro design do portfolio — trilho com pontos a esquerda, legenda e
 * aparelho que trocam de estado por scroll normal (sem hijack horizontal).
 *
 * Sem framer-motion: um unico scroll listener com rAF escreve a barra do
 * trilho direto no estilo (sem re-render), e a troca de passo so dispara
 * setState quando o inteiro muda — no maximo 3 renders no trajeto inteiro.
 */
export default function AcordeShowcase() {
  const { t } = useLanguage();
  const s = t.acordeShowcase;

  return (
    <section id="acorde" className="relative border-t border-[var(--border)]">
      <Header eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <Scrolly panels={s.panels as unknown as PanelData[]} hint={s.hint} />
      <ClosingCta closing={s.closing} />
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

function Scrolly({ panels, hint }: { panels: PanelData[]; hint: string }) {
  const total = panels.length;
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    // min-width junto: o miolo e `h-dvh` e o conteudo (aparelho + legenda)
    // mal cabia num 375x667 — 20px de folga, estourando em telas menores.
    // E scroll-jack no touch e hostil de qualquer jeito: no mobile a lista
    // empilhada normal mostra as 4 telas sem prender o dedo de ninguem.
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 768px)");
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!pinned || total <= 1) {
    return <StaticList panels={panels} />;
  }

  return <PinnedTour panels={panels} total={total} hint={hint} />;
}

function PinnedTour({
  panels,
  total,
  hint,
}: {
  panels: PanelData[];
  total: number;
  hint: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;

    const run = () => {
      raf = 0;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const range = wrapper.offsetHeight - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;

      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p.toFixed(4)})`;

      const next = Math.min(total - 1, Math.floor(p * total));
      if (next !== stepRef.current) {
        stepRef.current = next;
        setStep(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };

    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  return (
    <div ref={wrapperRef} style={{ height: `${total * STEP_VH}dvh` }}>
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden px-6">
        <span
          className="absolute top-24 left-1/2 -translate-x-1/2 whitespace-nowrap border border-[var(--border)] bg-surface px-3 py-1.5 font-mono text-[11px] text-muted transition-opacity duration-500"
          style={{ opacity: step === total - 1 ? 0 : 1 }}
        >
          {hint}
        </span>

        {/* gap e alturas apertados no mobile de proposito: o miolo e `h-dvh`,
            entao legenda + aparelho + respiro precisam caber numa tela de
            ~667px (iPhone SE) sem estourar. */}
        <div className="flex w-full max-w-5xl flex-col-reverse items-center gap-8 sm:flex-row sm:gap-20">
          {/* coluna da legenda: o trilho mora na borda esquerda e as legendas
              ficam recuadas dele. As legendas sao absolutas pra trocarem sem
              pular a altura, e absoluto resolve contra o PADDING BOX — por
              isso o recuo vive em cada legenda (left-12), nunca num padding
              do container, que seria simplesmente ignorado. */}
          <div className="relative min-h-[250px] w-full sm:min-h-[320px] sm:flex-1">
            <Rail total={total} step={step} fillRef={fillRef} />
            {panels.map((p, i) => (
              <Caption key={p.n} panel={p} active={i === step} />
            ))}
          </div>

          <Phone panels={panels} step={step} />
        </div>
      </div>
    </div>
  );
}

function Rail({
  total,
  step,
  fillRef,
}: {
  total: number;
  step: number;
  fillRef: React.RefObject<HTMLSpanElement>;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-[var(--border)]">
      <span
        ref={fillRef}
        className="absolute inset-0 origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
            i <= step ? "border-accent bg-accent" : "border-[var(--border)] bg-page"
          }`}
          style={{ top: `${((i + 0.5) / total) * 100}%` }}
        />
      ))}
    </div>
  );
}

function Caption({ panel, active }: { panel: PanelData; active: boolean }) {
  return (
    <div
      className="absolute inset-y-0 left-12 right-0 flex flex-col justify-center transition-all duration-500 sm:left-16"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(10px)",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <span className="w-fit border border-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
        {panel.tag}
      </span>
      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-primary sm:text-3xl">
        {panel.title}
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">{panel.body}</p>
    </div>
  );
}

/**
 * A proporcao vive na TELA (div de dentro), nao na moldura: com ela na
 * moldura, o padding entrava na conta e o `object-cover` cortava um fio
 * da imagem. A moldura e so a borda fisica em volta.
 */
function Phone({ panels, step }: { panels: PanelData[]; step: number }) {
  return (
    <div className="shrink-0 rounded-[2.2rem] border border-[var(--border)] bg-surface p-2 shadow-2xl shadow-black/25">
      <div
        className="relative overflow-hidden rounded-[1.7rem]"
        style={{ width: "clamp(160px, 40vw, 290px)", aspectRatio: "590 / 1278" }}
      >
        {panels.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.n}
            src={p.shot}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
            style={{
              opacity: i === step ? 1 : 0,
              transform: i === step ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Fallback sem scroll-jack: lista empilhada comum, com o fade por IntersectionObserver de sempre. */
function StaticList({ panels }: { panels: PanelData[] }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className="mx-auto max-w-4xl space-y-16 px-6 pb-24">
      {panels.map((p, i) => (
        <div
          key={p.n}
          className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:gap-16"
          style={{
            transitionDelay: `${i * 80}ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="flex-1">
            <span className="inline-block border border-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              {p.tag}
            </span>
            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-primary">
              {p.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
          </div>

          <div className="shrink-0 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-surface p-1.5 shadow-2xl shadow-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.shot} alt={p.alt} loading="lazy" className="block w-[190px] rounded-[1.35rem]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ClosingCta({ closing }: { closing: Closing }) {
  return (
    <div className="mx-auto max-w-xl px-6 pb-24 pt-8 text-center">
      <h3 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {closing.title}
      </h3>
      <p className="mt-4 leading-relaxed text-muted">{closing.body}</p>
      <a
        href="https://acorde.club"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block bg-accent px-6 py-3 font-mono text-sm text-[var(--bg)] transition-opacity duration-150 hover:opacity-80"
      >
        {closing.visit} ↗
      </a>
    </div>
  );
}
