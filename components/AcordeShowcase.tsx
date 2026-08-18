"use client";

import { Children, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/lib/context";

/**
 * Faixa horizontal do Acorde.
 *
 * No desktop o scroll vertical é traduzido em deslocamento horizontal por um
 * container alto com miolo sticky. No celular vira carrossel de arrastar com
 * snap — scroll-jack em touch é hostil e engasga.
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

  // +1 pelo painel de fechamento
  const total = s.panels.length + 1;

  return (
    <section id="acorde" className="relative border-t border-[var(--border)]">
      <Header eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      {horizontal ? (
        <HorizontalTrack total={total}>
          {s.panels.map((p) => (
            <Panel key={p.n} {...p} />
          ))}
          <Closing closing={s.closing} />
        </HorizontalTrack>
      ) : (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {s.panels.map((p) => (
            <div key={p.n} className="w-[85vw] shrink-0 snap-center">
              <Panel {...p} compact />
            </div>
          ))}
          <div className="w-[85vw] shrink-0 snap-center">
            <Closing closing={s.closing} compact />
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

/** Container alto + miolo sticky: o progresso do scroll vira translateX. */
function HorizontalTrack({ total, children }: { total: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // porcentagem do proprio trilho, nao vw: 100vw inclui a barra de rolagem e
  // deixaria o ultimo painel cortado pela largura dela.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((total - 1) / total) * 100}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} style={{ height: `${total * 80}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x, width: `${total * 100}%` }}
          className="flex h-full will-change-transform"
        >
          {Children.map(children, (child) => (
            <div className="h-full shrink-0" style={{ width: `${100 / total}%` }}>
              {child}
            </div>
          ))}
        </motion.div>

        {/* trilho de progresso da faixa */}
        <div className="absolute inset-x-0 bottom-10 mx-auto h-px w-40 bg-[var(--border)]">
          <motion.div style={{ width: progress }} className="h-full bg-[var(--text)]" />
        </div>
      </div>
    </div>
  );
}

function Panel({
  n,
  title,
  body,
  shot,
  alt,
  compact = false,
}: {
  n: string;
  title: string;
  body: string;
  shot: string;
  alt: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex flex-col items-center gap-6 rounded-2xl border border-[var(--border)] bg-surface p-8"
          : "flex h-full w-full items-center justify-center px-16"
      }
    >
      <div
        className={
          compact
            ? "flex flex-col items-center gap-6 text-center"
            : "flex max-w-4xl items-center gap-16"
        }
      >
        <div className="shrink-0 rounded-[1.75rem] border border-[var(--border)] bg-surface p-1.5 shadow-2xl shadow-black/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot}
            alt={alt}
            width={590}
            height={1278}
            loading="lazy"
            className="block rounded-[1.35rem]"
            style={{ width: compact ? 200 : 250 }}
          />
        </div>

        <div className={compact ? "" : "max-w-sm"}>
          <span className="font-mono text-xs text-accent">{n}</span>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

function Closing({
  closing,
  compact = false,
}: {
  closing: { title: string; body: string; cta: string; visit: string };
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex h-full flex-col justify-center rounded-2xl border border-[var(--border)] bg-surface p-8 text-center"
          : "flex h-full w-full flex-col items-center justify-center px-16 text-center"
      }
    >
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
    </div>
  );
}
