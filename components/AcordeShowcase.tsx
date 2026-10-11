"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/context";

export default function AcordeShowcase() {
  const { t, lang } = useLanguage();
  const s = t.acordeShowcase;
  return (
    <section
      id="acorde"
      className="border-y border-default bg-surface py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
            {s.eyebrow}
          </h2>
          <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Acorde
            <span className="ml-3 inline-block align-middle border border-default px-2 py-1 font-mono text-[10px] font-normal">
              {lang === "pt" ? "EM PRODUÇÃO" : "LIVE"}
            </span>
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">{s.lead}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.panels.map((panel) => (
              <li key={panel.n} className="border-l-2 border-black/15 pl-3">
                <h3 className="text-sm font-semibold">{panel.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {panel.body}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projetos/acorde"
              className="bg-accent px-5 py-3 text-sm text-white"
            >
              {lang === "pt" ? "Ver estudo de caso" : "Read case study"} →
            </Link>
            <a
              href="https://acorde.club"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-default px-5 py-3 text-sm"
            >
              {s.closing.visit} ↗
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 overflow-hidden py-6">
          {s.panels.slice(0, 2).map((panel, i) => (
            <div
              key={panel.n}
              className={`w-[38%] max-w-[190px] shrink-0 overflow-hidden rounded-[1.6rem] border-[5px] border-neutral-900 bg-black shadow-lg ${i ? "translate-y-4" : "-translate-y-4"}`}
            >
              <Image
                src={panel.shot}
                alt={panel.alt}
                width={590}
                height={1278}
                sizes="(max-width: 767px) 38vw, 190px"
                className="block h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
