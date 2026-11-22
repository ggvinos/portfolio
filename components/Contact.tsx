"use client";

import { useLanguage } from "@/lib/context";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const links = [
  {
    label: "Email",
    href: "mailto:viniciosferreira.ti@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/ggvinos",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ggvinos/",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/vinicios",
  },
];

export default function Contact() {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-page border-t border-default"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          {t.sections.contact}
        </h2>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12`}
        >
          <figure className="relative order-first aspect-square w-40 shrink-0 overflow-hidden border border-default bg-surface md:order-last md:w-72 lg:w-80">
            <Image
              src="/images/portfolio/vinicios.jpg"
              alt={
                lang === "pt"
                  ? "Retrato em preto e branco de Vinicios Ferreira sorrindo"
                  : "Black and white portrait of Vinicios Ferreira smiling"
              }
              fill
              sizes="(max-width: 767px) 160px, (max-width: 1023px) 288px, 320px"
              className="object-cover"
              style={{ objectPosition: "60% 32%" }}
            />
          </figure>
          <div className="min-w-0">
            <p className="text-3xl sm:text-4xl font-bold text-primary mb-10">
              {t.contact.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="/cv-vinicios-ferreira.pdf"
                download="Vinicios-Ferreira-CV.pdf"
                className={`px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-85 transition-opacity ${inView ? "opacity-100" : "opacity-0"}`}
              >
                {t.contact.cv_label}
              </a>
              <a
                href="mailto:viniciosferreira.ti@gmail.com"
                className={`px-6 py-3 border border-[var(--border)] text-muted text-sm font-medium hover:border-[var(--text)] hover:text-[var(--text)] transition-colors ${inView ? "opacity-100" : "opacity-0"}`}
              >
                {t.contact.email_label}
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {links.map(({ label, href }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className={`inline-block py-2 font-mono text-sm text-muted hover:text-accent transition-colors duration-150 border-b border-transparent hover:border-accent ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
