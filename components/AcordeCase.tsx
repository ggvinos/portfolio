"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";
import PhoneShot from "@/components/PhoneShot";
import { useParallax } from "@/hooks/useScrollFx";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
      {children}
    </h2>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Camada de deriva no scroll. Fica dentro do Reveal para não disputar o transform. */
function Parallax({
  speed,
  children,
}: {
  speed: number;
  children: React.ReactNode;
}) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}

export default function AcordeCase() {
  const { t } = useLanguage();
  const c = t.acordeCase;

  return (
    <main className="pt-14">
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6 animate-fade-in">
          {c.eyebrow}
        </p>

        <h1
          className="text-6xl sm:text-8xl font-bold tracking-tight text-primary text-edge-outline"
          style={{ animation: "title 1.2s ease both" }}
        >
          {c.title}
        </h1>

        <p
          className="mt-6 text-xl sm:text-2xl text-primary/90 max-w-2xl"
          style={{ animation: "fade-up 0.8s ease both", animationDelay: "0.3s" }}
        >
          {c.tagline}
        </p>

        <p
          className="mt-6 text-muted leading-relaxed max-w-2xl"
          style={{ animation: "fade-up 0.8s ease both", animationDelay: "0.5s" }}
        >
          {c.intro}
        </p>

        <a
          href={c.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 font-mono text-sm border border-[var(--border)] px-5 py-2.5 text-primary hover:border-accent hover:text-accent transition-colors duration-150"
          style={{ animation: "fade-up 0.8s ease both", animationDelay: "0.7s" }}
        >
          {c.linkLabel} ↗
        </a>

        <div
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 border border-[var(--border)] divide-x-0 lg:divide-x divide-[var(--border)]"
          style={{ animation: "fade-up 0.8s ease both", animationDelay: "0.9s" }}
        >
          {c.meta.map((m) => (
            <div key={m.label} className="px-5 py-4 border-b lg:border-b-0 border-[var(--border)]">
              <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1.5">
                {m.label}
              </p>
              <p className="text-sm text-primary leading-snug">{m.value}</p>
            </div>
          ))}
        </div>

        <Reveal className="mt-20">
          <Parallax speed={0.08}>
            <PhoneShot
              srcs={["/acorde/home.webp", "/acorde/letra.webp", "/acorde/fala.webp"]}
              alt={c.title}
              width={280}
            />
          </Parallax>
        </Reveal>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <Reveal className="max-w-2xl">
          <Eyebrow>{c.problem.eyebrow}</Eyebrow>
          <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-8">
            {c.problem.title}
          </h3>
          <div className="space-y-5">
            {c.problem.body.map((p, i) => (
              <p key={i} className="text-lg text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PRODUTO ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <Reveal>
          <Eyebrow>{c.product.eyebrow}</Eyebrow>
          <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-16 max-w-2xl">
            {c.product.title}
          </h3>
        </Reveal>

        <div className="space-y-20">
          {c.product.features.map((f, i) => (
            <Reveal key={f.title}>
              <div
                className={`flex flex-col gap-8 lg:gap-14 lg:items-center ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="lg:w-1/2">
                  <Parallax speed={i % 2 === 0 ? 0.1 : -0.1}>
                    <PhoneShot
                      srcs={[...f.shots]}
                      alt={f.alt}
                      width={f.shots.length > 1 ? 240 : 270}
                    />
                  </Parallax>
                </div>
                <div className="lg:w-1/2">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 text-2xl font-semibold text-primary tracking-tight">
                    {f.title}
                  </h4>
                  <p className="mt-4 text-muted leading-relaxed">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── QUALIDADE ── */}
      <section className="border-t border-[var(--border)] bg-surface/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>{c.quality.eyebrow}</Eyebrow>
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-6">
              {c.quality.title}
            </h3>
            <p className="text-lg text-muted leading-relaxed">{c.quality.lead}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.quality.pillars.map((p, i) => (
              <Reveal key={p.tag} delay={i * 60}>
                <SpotlightCard className="h-full">
                  <div className="p-7 h-full">
                    <span className="font-mono text-xs text-accent">{p.tag}</span>
                    <h4 className="mt-3 text-lg font-semibold text-primary">{p.title}</h4>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{p.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DECISÕES TÉCNICAS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>{c.decisions.eyebrow}</Eyebrow>
          <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
            {c.decisions.title}
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {c.decisions.items.map((d, i) => (
            <Reveal key={d.title} delay={i * 60}>
              <div className="border-l border-[var(--border)] pl-6">
                <h4 className="text-lg font-semibold text-primary">{d.title}</h4>
                <p className="mt-3 text-muted leading-relaxed">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <Reveal>
          <Eyebrow>{c.results.eyebrow}</Eyebrow>
          <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-12">
            {c.results.title}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {c.results.items.map((r) => (
              <div key={r.label}>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  {r.value}
                </p>
                <p className="mt-2 font-mono text-[10px] text-muted uppercase tracking-widest leading-relaxed">
                  {r.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted max-w-xl">{c.results.note}</p>
        </Reveal>
      </section>

      {/* ── APRENDIZADOS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <Reveal className="max-w-2xl">
          <Eyebrow>{c.learnings.eyebrow}</Eyebrow>
          <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-10">
            {c.learnings.title}
          </h3>
          <div className="space-y-6">
            {c.learnings.body.map((l, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-mono text-xs text-accent mt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg text-muted leading-relaxed">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
              {c.cta.title}
            </h3>
            <p className="mt-4 text-muted">{c.cta.body}</p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm bg-accent text-black px-6 py-3 hover:opacity-80 transition-opacity duration-150"
              >
                {c.cta.primary} ↗
              </a>
              <a
                href="/#contact"
                className="font-mono text-sm border border-[var(--border)] px-6 py-3 text-primary hover:border-accent transition-colors duration-150"
              >
                {c.cta.secondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
