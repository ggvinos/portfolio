"use client";

import { useLanguage } from "@/lib/context";
import { useInView } from "@/hooks/useInView";
import SpotlightCard from "@/components/SpotlightCard";

export default function Education() {
  const { t } = useLanguage();
  const [ref, inView] = useInView();
  const [refCerts, inViewCerts] = useInView();

  const edu = (t as any).education as {
    degree: string; institution: string; period: string; location: string; description: string;
  };
  const certs = (t as any).certifications as { title: string; issuer: string }[];
  const sectionLabel = (t as any).sections_education as { education: string; certifications: string };

  if (!edu) return null;

  return (
    <section id="education" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          {sectionLabel?.education ?? "EDUCATION"}
        </h2>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <SpotlightCard>
            <div className="p-8 flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
                </div>
                <div className="font-mono text-sm text-accent mb-1">{edu.institution}</div>
                <div className="font-mono text-xs text-muted mb-4">{edu.location} · {edu.period}</div>
                <p className="text-sm text-muted leading-relaxed">{edu.description}</p>
              </div>
              <div className="shrink-0 sm:text-right">
                <span className="font-mono text-[10px] px-3 py-1.5 border border-accent text-accent tracking-widest">
                  {sectionLabel?.degree_badge ?? "B.SC."}
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {certs && certs.length > 0 && (
          <div
            ref={refCerts}
            className={`mt-8 transition-all duration-700 ease-out ${inViewCerts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
              {sectionLabel?.certifications ?? "CERTIFICATIONS"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certs.map((cert, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: `${i * 60}ms`, opacity: inViewCerts ? 1 : 0, transform: inViewCerts ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
                  className="border border-[var(--border)] p-4 hover:border-[#334155] transition-colors duration-150"
                >
                  <div className="text-sm font-semibold text-primary mb-1">{cert.title}</div>
                  <div className="font-mono text-[10px] text-muted">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
