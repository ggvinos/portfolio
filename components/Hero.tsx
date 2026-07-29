"use client";

import { useLanguage } from "@/lib/context";
import Particles from "@/components/Particles";
import { useScrollRecede } from "@/hooks/useScrollFx";

const TOOLS = [
  "Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest",
  "Python", "JavaScript", "TypeScript", "Pandas", "Streamlit", "Plotly",
  "GitHub Actions", "Jira", "Claude API", "Figma", "React", "Next.js",
  "Tailwind", "Git", "Vercel", "REST API", "JSON Schema", "JWT", "SQL",
];

const doubled = [...TOOLS, ...TOOLS];

/**
 * Tempos da entrada em camadas. O nome vem primeiro e sozinho; o mundo
 * (fundo, partículas, glow) só chega depois que o texto assentou.
 */
const T = {
  name: "0.2s",
  label: "0.75s",
  subtitle: "0.95s",
  tagline: "1.25s",
  world: "1.6s",
  marquee: "2s",
  metrics: "2.2s",
  ctas: "2.4s",
  hint: "2.7s",
};

const fadeIn = (delay: string) => ({
  animationDelay: delay,
  animationFillMode: "both" as const,
});

export default function Hero() {
  const { t } = useLanguage();
  const content = useScrollRecede<HTMLDivElement>();

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
    >
      {/* camadas de ambiente: entram por último, ao redor do nome já posto */}
      <div
        className="absolute inset-0 z-0"
        style={{ animation: "fade-in-ambient 2.2s ease both", animationDelay: T.world }}
      >
        {/* fundo com nebulosas */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 65% 45% at 72% 18%, rgba(88, 28, 135, 0.32) 0%, transparent 55%),
              radial-gradient(ellipse 55% 65% at 22% 78%, rgba(29, 78, 216, 0.22) 0%, transparent 52%),
              radial-gradient(ellipse 40% 30% at 50% 48%, rgba(109, 40, 217, 0.11) 0%, transparent 50%),
              radial-gradient(ellipse 30% 42% at 88% 62%, rgba(55, 48, 163, 0.13) 0%, transparent 42%),
              radial-gradient(ellipse 45% 28% at 12% 22%, rgba(67, 56, 202, 0.09) 0%, transparent 48%),
              #000000
            `,
          }}
        />

        <Particles className="absolute inset-0 z-[1]" quantity={380} staticity={40} />

        <div
          className="hidden md:block absolute top-[72px] left-0 right-0 h-px z-[2] animate-glow"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.35) 50%, transparent 100%)" }}
        />
        <div
          className="hidden md:block absolute bottom-0 left-0 right-0 h-px z-[2] animate-glow"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.35) 50%, transparent 100%)",
            animationDelay: "0.4s",
          }}
        />
      </div>

      {/* conteúdo: recua ao rolar */}
      <div
        ref={content}
        className="relative z-[3] w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center py-24 will-change-transform"
      >
        <p
          className="font-mono text-xs text-muted mb-6 tracking-[0.3em] uppercase animate-fade-in"
          style={fadeIn(T.label)}
        >
          {t.hero.label}
        </p>

        <h1
          className="font-bold tracking-tight text-primary text-edge-outline animate-title"
          style={{
            fontSize: "clamp(3rem, 11vw, 8rem)",
            lineHeight: 0.95,
            animationDelay: T.name,
            animationFillMode: "both",
          }}
        >
          {t.hero.name}
        </h1>

        <p
          className="mt-4 font-mono text-base sm:text-lg text-primary tracking-widest animate-fade-in"
          style={fadeIn(T.subtitle)}
        >
          {t.hero.subtitle}
        </p>

        <p
          className="mt-3 text-sm text-muted max-w-md leading-relaxed animate-fade-in"
          style={fadeIn(T.tagline)}
        >
          {t.hero.tagline}
        </p>

        {/* marquee */}
        <div className="relative mt-8 w-screen overflow-hidden animate-fade-in" style={fadeIn(T.marquee)}>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
          <div className="flex gap-3 w-max py-1" style={{ animation: "marquee 22s linear infinite" }}>
            {doubled.map((tool, i) => (
              <span key={i} className="font-mono text-[11px] text-muted border border-[var(--border)] px-3 py-1.5 whitespace-nowrap hover:text-[var(--text)] hover:border-[var(--text)] transition-colors duration-150">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* métricas */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12 animate-fade-in" style={fadeIn(T.metrics)}>
          {t.hero.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">{m.value}</span>
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{m.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex gap-4 animate-fade-in" style={fadeIn(T.ctas)}>
          <a href="#projects" className="px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-85 transition-opacity">
            {t.hero.cta_primary}
          </a>
          <a href="#contact" className="px-6 py-3 border border-[var(--border)] text-muted text-sm font-medium hover:border-[var(--text)] hover:text-[var(--text)] transition-colors">
            {t.hero.cta_secondary}
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] animate-fade-in" style={fadeIn(T.hint)}>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-muted tracking-widest uppercase">scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
