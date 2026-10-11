"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/context";
import ProjectVisual from "./ProjectVisual";
import SpotlightCard from "./SpotlightCard";

type ProjectData = {
  id: string;
  title: string;
  description: string;
  detail: readonly string[] | null;
  metrics: readonly string[] | null;
  tags: readonly string[];
  label: string | null;
  link: string | null;
};

export default function ProjectStack({
  projects,
}: {
  projects: ProjectData[];
}) {
  const { lang } = useLanguage();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <SpotlightCard key={project.id} className="h-full bg-page">
          <article className="flex h-full flex-col p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              {project.label && (
                <span className="border border-default px-2 py-1 font-mono text-[10px] tracking-wider text-muted">
                  {project.label}
                </span>
              )}
            </div>
            <ProjectVisual id={project.id} english={lang === "en"} />
            <h3 className="text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>
            {project.metrics && (
              <ul
                aria-label={lang === "pt" ? "Destaques" : "Highlights"}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="bg-surface px-2.5 py-1.5 text-xs font-medium"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            )}
            {project.detail && (
              <details className="mt-5 border-t border-default pt-4">
                <summary className="py-1 text-sm font-medium">
                  {lang === "pt" ? "Decisões técnicas" : "Technical decisions"}
                </summary>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {project.detail.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span aria-hidden="true">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-default px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-6">
              {project.link &&
                (project.link.startsWith("/") ? (
                  <Link
                    href={project.link}
                    className="inline-block min-h-11 py-3 text-sm font-semibold underline underline-offset-4"
                  >
                    {lang === "pt"
                      ? "Ver resumo técnico"
                      : "Read technical summary"}{" "}
                    →
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block min-h-11 py-3 text-sm font-semibold underline underline-offset-4"
                  >
                    {project.link.includes("github.com")
                      ? lang === "pt"
                        ? "Ver código no GitHub"
                        : "View code on GitHub"
                      : lang === "pt"
                        ? "Ver artes no Behance"
                        : "View designs on Behance"}{" "}
                    ↗
                  </a>
                ))}
            </div>
          </article>
        </SpotlightCard>
      ))}
    </div>
  );
}
