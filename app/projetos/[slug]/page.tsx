import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseNav from "@/components/CaseNav";
import Footer from "@/components/Footer";
import InternalProjectCase from "@/components/InternalProjectCase";
import SkillsCase from "@/components/SkillsCase";
import ObsidianCase from "@/components/ObsidianCase";

const titles = {
  "qa-dashboard": "QualityDash",
  "claude-skills": "Claude Skills",
  "second-brain": "Segundo Cérebro",
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
        : slug === "second-brain"
          ? "Sistema de conhecimento em Obsidian: estrutura, decisões e como serve de memória para agentes de IA."
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
      ) : slug === "second-brain" ? (
        <ObsidianCase />
      ) : (
        <InternalProjectCase id={slug} />
      )}
      <Footer />
    </>
  );
}
