"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Moon3D from "@/components/Moon3D";

/**
 * Envolve Hero + Sobre e faz o planeta viajar continuamente pelas duas
 * seções: grande no Hero, encolhe e desloca durante a transição, pequeno
 * e presente no Sobre — a mesma câmera atravessando o mesmo espaço, não
 * um elemento que desaparece e outro que aparece.
 *
 * Técnica: CSS Grid com duas camadas na MESMA célula (col-start-1
 * row-start-1), não duas linhas empilhadas. Um elemento `sticky` ocupa
 * espaço próprio no fluxo normal igual a uma div comum da mesma altura —
 * colocá-lo como irmão *antes* do conteúdo empurraria tudo pra baixo em
 * h-screen. Sobrepondo na mesma célula, a altura do grid vem só do
 * conteúdo (Hero+Sobre), e a camada sticky gruda sem contar espaço extra.
 */
export default function HeroAboutJourney({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // pontos da jornada: grande e parado no Hero (0-0.3), transicao continua
  // (0.3-0.55), pequeno e parado no Sobre (0.55-1). Nao sao 3 estados que
  // trocam — scale/x/y sao funcoes continuas do mesmo progresso.
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], [1, 1, 0.4, 0.4]);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], ["0%", "0%", "20%", "22%"]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], ["0%", "0%", "55%", "58%"]);

  return (
    <div ref={ref} className="grid">
      {/* sem altura fixa aqui: precisa esticar pra altura da celula do
          grid inteira (Hero+Sobre), senao a div sticky de dentro so tem
          h-screen de "pista" pra colar e solta a lua logo apos o Hero */}
      <div className="pointer-events-none relative z-0 col-start-1 row-start-1">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute"
            style={{ width: 520, height: 520, bottom: "-8%", left: "1%", scale, x, y }}
          >
            <div
              className="absolute rounded-full border border-black/[0.07]"
              style={{ width: 660, height: 660, top: -70, left: -70 }}
            />
            <Moon3D size={520} />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 col-start-1 row-start-1">{children}</div>
    </div>
  );
}
