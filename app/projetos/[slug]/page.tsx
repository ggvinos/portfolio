import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseNav from "@/components/CaseNav";
import Footer from "@/components/Footer";
import InternalProjectCase from "@/components/InternalProjectCase";

const titles = {
  "qa-dashboard": "QA Metrics Dashboard",
  "flow-cli": "Flow CLI Generator",
} as const;
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${titles[slug as keyof typeof titles] || "Projeto"} | Vinicios Ferreira`,
    description:
      "Resumo técnico de ferramenta interna: contexto, contribuição e tecnologias.",
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in titles)) notFound();
  return (
    <>
      <CaseNav />
      <InternalProjectCase id={slug} />
      <Footer />
    </>
  );
}
