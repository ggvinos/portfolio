"use client";

import { useLanguage } from "@/lib/context";
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
  const { t } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="py-24 bg-page border-t border-default">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          {t.sections.contact}
        </h2>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-3xl sm:text-4xl font-bold text-primary mb-10">
            {t.contact.headline}
          </p>

          <div className="flex flex-wrap gap-6">
            {links.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`font-mono text-sm text-muted hover:text-accent transition-colors duration-150 border-b border-transparent hover:border-accent pb-0.5 ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
