"use client";
import PortfolioImage from "./PortfolioImage";
import { useLanguage } from "@/lib/context";

export default function InternalProjectCase({ id }: { id: string }) {
  const { t, lang } = useLanguage();
  const project = t.projects.find((p) => p.id === id);
  if (!project) return null;
  const dashboard = id === "qa-dashboard";
  const steps = dashboard
    ? ["Issue tracker", "REST API", "Pandas", "Streamlit"]
    : [
        lang === "pt" ? "Descrição" : "Description",
        "Claude API",
        "JSON Schema",
        "JSON",
      ];
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {lang === "pt"
          ? "PROJETO INTERNO · RESUMO TÉCNICO"
          : "INTERNAL PROJECT · TECHNICAL SUMMARY"}
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-8 border-l-2 border-black bg-surface p-5 text-sm leading-relaxed text-muted">
        {lang === "pt"
          ? "Ferramenta desenvolvida para uso interno na empresa. Este resumo apresenta minha contribuição sem publicar telas, código ou dados corporativos."
          : "Built for internal company use. This summary describes my contribution without publishing company screenshots, code or data."}
      </div>
      {dashboard && <section aria-label={lang === "pt" ? "Redesign demonstrativo" : "Illustrative redesign"}>
        <PortfolioImage src="/images/portfolio/dashboard-overview.svg" alt={lang === "pt" ? "Visão geral de entregas por produto com dados fictícios" : "Delivery overview by product with fictional data"} caption={lang === "pt" ? "Proposta visual para o portfólio: visão de produto até produção. Todos os valores e produtos são fictícios; esta não é uma captura do sistema em produção." : "Portfolio visual concept: product through production. All values and products are fictional; this is not a production screenshot."} />
        <PortfolioImage src="/images/portfolio/dashboard-qa.svg" alt={lang === "pt" ? "Funil demonstrativo de validação QA" : "Illustrative QA validation funnel"} caption={lang === "pt" ? "Detalhe de QA: etapas de validação, bloqueios e investigação de retrabalho. Dados fictícios." : "QA detail: validation stages, blockers and rework investigation. Fictional data."} />
      </section>}
      <h2 className="mt-12 text-2xl font-semibold">
        {lang === "pt" ? "Fluxo técnico" : "Technical flow"}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {lang === "pt"
          ? "Visão simplificada da solução."
          : "Simplified view of the solution."}
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="border border-default p-4">
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <p className="mt-2 text-sm font-semibold">{step}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-12 text-2xl font-semibold">
        {lang === "pt" ? "Minha contribuição" : "My contribution"}
      </h2>
      <ul className="mt-6 space-y-4">
        {project.detail?.map((item) => (
          <li
            key={item}
            className="border-b border-default pb-4 leading-relaxed text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <h2 className="mt-12 text-2xl font-semibold">
        {lang === "pt" ? "Tecnologias" : "Technologies"}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border border-default px-3 py-2 font-mono text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>
      <a
        href="/#contact"
        className="mt-10 inline-block bg-black px-6 py-3 text-sm text-white"
      >
        {lang === "pt"
          ? "Conversar sobre minha experiência"
          : "Discuss my experience"}{" "}
        →
      </a>
    </main>
  );
}
