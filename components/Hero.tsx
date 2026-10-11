"use client";

import { useLanguage } from "@/lib/context";
import Particles from "@/components/Particles";
import HeroAtmosphere from "@/components/HeroAtmosphere";
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
  name: "0s",
  label: "0s",
  subtitle: "0s",
  tagline: "0s",
  world: "0.3s",
  marquee: "0.3s",
  ctas: "0s",
  hint: "2.7s",
  corners: "3s",
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
      className="relative flex flex-col items-center justify-center w-full min-h-[640px] sm:min-h-[760px] lg:min-h-screen overflow-hidden"
    >
      {/* camadas de ambiente: entram por último, ao redor do nome já posto */}
      <div
        className="absolute inset-0 z-0"
        style={{ animation: "fade-in-ambient 1.2s ease both", animationDelay: T.world }}
      >
        <HeroAtmosphere />

        <Particles className="absolute inset-0 z-[1]" quantity={80} staticity={40} />

        <div
          className="hidden md:block absolute top-[72px] left-0 right-0 h-px z-[2] animate-glow"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 50%, transparent 100%)" }}
        />
        <div
          className="hidden md:block absolute bottom-0 left-0 right-0 h-px z-[2] animate-glow"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
            animationDelay: "0.4s",
          }}
        />
      </div>

      {/* conteúdo: recua ao rolar */}
      <div
        ref={content}
        className="relative z-[3] w-full max-w-6xl mx-auto px-6 min-w-0 flex flex-col items-center text-center py-24 will-change-transform"
      >
        <p
          className="font-mono text-xs text-muted mb-6 tracking-[0.3em] uppercase animate-fade-in"
          style={fadeIn(T.label)}
        >
          {t.hero.label}
        </p>

        <h1
          className="font-bold tracking-tight text-primary text-edge-outline"
          style={{
            fontSize: "clamp(2.65rem, 10vw, 7rem)",
            lineHeight: 0.95,
            animationDelay: T.name,
            animationFillMode: "both",
          }}
        >
          {t.hero.name}
        </h1>

        <p
          className="mt-6 font-mono text-sm sm:text-lg text-primary tracking-widest animate-fade-in"
          style={fadeIn(T.subtitle)}
        >
          {t.hero.subtitle}
        </p>

        <p
          className="mt-3 text-base text-muted max-w-lg leading-relaxed animate-fade-in"
          style={fadeIn(T.tagline)}
        >
          {t.hero.tagline}
        </p>

        {/* marquee */}
        {/* w-screen PRECISA vir com -mx-6. Sozinho ele mede 100vw dentro de
            um container com px-6, entao o min-content do container vira
            100vw+48px e a pagina ganha 48px de scroll horizontal (medido num
            320px). O -mx-6 come o padding e zera a sobra.
            Trocar o w-screen por largura relativa nao funciona: tanto
            `self-stretch` quanto `w-[calc(100%+3rem)]` esticam pro max-w-6xl
            (1152px) mesmo num container de 375, porque a porcentagem do item
            flex resolve contra o tamanho intrinseco, nao contra os 375. */}
        <div
          aria-hidden="true" className="relative mt-6 -mx-6 w-screen overflow-hidden animate-fade-in"
          style={fadeIn(T.marquee)}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
          <div className="flex gap-3 w-max py-1 animate-marquee">
            {doubled.map((tool, i) => (
              <span key={i} className="font-mono text-[11px] text-muted border border-[var(--border)] px-3 py-1.5 whitespace-nowrap hover:text-[var(--text)] hover:border-[var(--text)] transition-colors duration-150">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in" style={fadeIn(T.ctas)}>
          <a href="#projects" className="px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-85 transition-opacity">
            {t.hero.cta_primary}
          </a>
          <a href="/cv-vinicios-ferreira.pdf" className="px-6 py-3 border border-[var(--border)] text-muted text-sm font-medium hover:border-[var(--text)] hover:text-[var(--text)] transition-colors">
            {t.contact.cv_label}
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

      {/* assinatura pessoal: canto inferior esquerdo, só a partir de sm */}
      <div
        className="hidden sm:block absolute bottom-10 left-6 z-[3] animate-fade-in"
        style={fadeIn(T.corners)}
      >
        {t.hero.values.map((word) => (
          <p key={word} className="font-mono text-[11px] font-semibold tracking-wide text-primary leading-tight">
            {word}
          </p>
        ))}
        <div className="mt-2 h-px w-10 bg-[var(--text)]" />
      </div>

      {/* coordenadas: canto inferior direito, só a partir de sm */}
      <div
        className="hidden sm:block absolute bottom-10 right-6 z-[3] text-right animate-fade-in"
        style={fadeIn(T.corners)}
      >
        <p className="font-mono text-[11px] text-muted leading-tight">{t.hero.coordinates.lat}</p>
        <p className="font-mono text-[11px] text-muted leading-tight">{t.hero.coordinates.lng}</p>
        <p className="font-mono text-[11px] text-muted leading-tight">{t.hero.coordinates.route}</p>
      </div>
    </section>
  );
}
