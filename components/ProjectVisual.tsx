import Image from "next/image";
import PortfolioImage from "./PortfolioImage";

/** Public design artwork or an explicitly labelled technical overview. */
export default function ProjectVisual({
  id,
  english,
}: {
  id: string;
  english: boolean;
}) {
  if (id === "qa-dashboard") return <PortfolioImage src="/images/portfolio/dashboard-overview.svg" alt={english ? "Concept dashboard with fictional delivery indicators" : "Redesign do dashboard com indicadores fictícios de entrega"} caption={english ? "Illustrative redesign · Fictional data" : "Redesign demonstrativo · Dados fictícios"} />;
  if (id === "espaco-calmo")
    return (
      <figure className="mb-6 overflow-hidden rounded-lg border border-default bg-surface">
        <Image
          src="https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/d16c32204101211.Y3JvcCw5MjAsNzIwLDE4MCww.png"
          alt={
            english
              ? "EspaçoCalmo UX/UI concept published on Behance"
              : "Conceito UX/UI do EspaçoCalmo publicado no Behance"
          }
          width={1279}
          height={1001}
          sizes="(max-width: 767px) 90vw, 500px"
          className="aspect-[2/1] w-full object-cover"
        />
        <figcaption className="border-t border-default px-3 py-2 text-[11px] text-muted">
          {english
            ? "Original design study · Behance"
            : "Estudo de design original · Behance"}
        </figcaption>
      </figure>
    );
  const steps =
    id === "qa-dashboard"
      ? ["Issue tracker", "Pandas", "Streamlit"]
      : id === "flow-cli"
        ? [english ? "Description" : "Descrição", "Schema", "JSON"]
        : ["UI", "Cypress", "API"];
  return (
    <figure className="mb-6 rounded-lg border border-default bg-surface p-4">
      <figcaption className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {english ? "Technical overview" : "Visão técnica"}
      </figcaption>
      <ol className="mt-4 flex items-center gap-2">
        {steps.map((step, i) => (
          <li key={step} className="flex min-w-0 flex-1 items-center gap-2">
            <span className="flex min-h-12 min-w-0 flex-1 items-center justify-center border border-default bg-page px-2 py-2 text-center text-xs font-medium">
              {step}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
