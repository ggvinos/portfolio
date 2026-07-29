import type { Metadata } from "next";
import Grain from "@/components/Grain";
import CaseNav from "@/components/CaseNav";
import AcordeCase from "@/components/AcordeCase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Acorde — Estudo de caso | Vinicios Ferreira",
  description:
    "Como construí, testei e opero o Acorde: app de inglês com música, letra sincronizada, prática de fala com IA e revisão espaçada. Estudo de caso com as práticas de qualidade aplicadas de ponta a ponta.",
  openGraph: {
    title: "Acorde — Estudo de caso",
    description:
      "Produto no ar construído, testado e operado de ponta a ponta. Instrumentação antes de escalar, falha como requisito e retenção por design.",
    url: "/projetos/acorde",
    type: "article",
  },
};

export default function AcordeCasePage() {
  return (
    <>
      <Grain />
      <CaseNav />
      <AcordeCase />
      <Footer />
    </>
  );
}
