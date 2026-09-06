"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Moon from "@/components/Moon";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // fracao real (0-1) de onde o Hero termina dentro da altura total
  // Hero+Sobre. Breakpoints fixos (ex: 0.3) presumiam uma proporcao entre
  // as duas secoes que nao bate com o conteudo real — o Hero e ~100vh mas
  // o Sobre varia de tamanho, entao um numero fixo fazia a lua comecar a
  // encolher ainda dentro do Hero, antes do Sobre aparecer na tela.
  // Medido via DOM (altura do primeiro filho = Hero) em vez de chutado.
  const [heroFracao, setHeroFracao] = useState(0.55);

  useLayoutEffect(() => {
    function medir() {
      const container = contentRef.current;
      if (!container) return;
      const hero = container.firstElementChild as HTMLElement | null;
      if (!hero) return;
      const alturaTotal = container.offsetHeight;
      if (alturaTotal > 0) {
        setHeroFracao(hero.offsetHeight / alturaTotal);
      }
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  // pontos da jornada: grande e parada enquanto o Hero ocupa a tela
  // (0-heroFracao), transicao curta logo que o Sobre comeca a aparecer
  // (heroFracao a +0.12), depois PARADA DE VERDADE no Sobre — os dois
  // ultimos valores de cada array sao IGUAIS de proposito, sem deriva
  // residual depois que chega na posicao final.
  // alvo do congelamento: perto do texto da bio (coluna esquerda, sticky
  // top-24 dentro do Sobre) em vez do canto inferior direito de antes —
  // pedido do usuario foi "ela fica ao lado dessa informacao", nao solta
  // no rodape da secao. Ajuste feito as cegas (este ambiente nao roda o
  // scroll ao vivo pra conferir visualmente); se nao bater exatamente do
  // lado do paragrafo, e so avisar pra um novo ajuste fino.
  const fimTransicao = Math.min(heroFracao + 0.12, 0.95);
  const scale = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], [1, 1, 0.4, 0.4]);
  const x = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", "10%", "10%"]);
  const y = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", "-10%", "-10%"]);

  return (
    <div ref={ref} className="grid">
      {/* sem altura fixa aqui: precisa esticar pra altura da celula do
          grid inteira (Hero+Sobre), senao a div sticky de dentro so tem
          h-screen de "pista" pra colar e solta a lua logo apos o Hero */}
      {/* hidden abaixo de lg: em telas pequenas o Sobre vira coluna unica
          (about.tsx usa lg:grid-cols-2) e o layout fica apertado demais
          pra sobrar espaco decorativo — a lua some no mobile de proposito */}
      <div className="pointer-events-none relative z-0 col-start-1 row-start-1 hidden lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute"
            // referencia enviada: um arco grande cortado por duas bordas ao
            // mesmo tempo (esquerda + baixo), nao o disco quase inteiro que
            // ficou em -6%/1% (achado "muito visivel") nem a fatia pequena
            // demais de -30%/-16% (achado "nao parece redondo"). Meio-termo.
            style={{ width: 520, height: 520, bottom: "-20%", left: "-10%", scale, x, y }}
          >
            <div
              className="absolute rounded-full border border-black/[0.07]"
              style={{ width: 660, height: 660, top: -70, left: -70 }}
            />
            <Moon size={520} progress={scrollYProgress} />
          </motion.div>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 col-start-1 row-start-1">
        {children}
      </div>
    </div>
  );
}
