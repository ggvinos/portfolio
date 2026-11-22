import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseNav from "@/components/CaseNav";
import Footer from "@/components/Footer";
import InternalProjectCase from "@/components/InternalProjectCase";
import SkillsCase from "@/components/SkillsCase";

const titles = {
  "qa-dashboard": "QualityDash",
  "flow-cli": "Flow CLI Generator",
  "claude-skills": "Claude Skills",
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
      slug === "claude-skills"
        ? "Skills genéricas para Claude Code que organizam o trabalho de QA, com explicação de cada uma e link para o GitHub."
        : "Resumo técnico de ferramenta interna: contexto, contribuição e tecnologias.",
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
      {slug === "claude-skills" ? (
        <SkillsCase />
      ) : (
        <InternalProjectCase id={slug} />
      )}
      <Footer />
    </>
  );
}
