"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  // a lua so entra depois que o nome do Hero termina de se resolver
  // (animate-title: delay 0.2s + 2s de duracao = 2.2s), nao no instante em
  // que a pagina carrega — entrada por tempo, independente do scroll,
  // porque aos 0s de scroll o nome ainda esta em animacao.
  const [podeAparecer, setPodeAparecer] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPodeAparecer(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // viewport medido de verdade (nao chutado) — necessario pra calcular a
  // posicao final em pixels reais, ja que o ponto de partida (bottom:-20%,
  // left:-10%) e um recorte proposital que só existe fora da tela.
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

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
      setViewport({ w: window.innerWidth, h: window.innerHeight });
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
  const fimTransicao = Math.min(heroFracao + 0.12, 0.95);

  // A caixa (520px) fica ancorada em bottom:-20%/left:-10% do container
  // (h-screen) — de proposito cortada pelas duas bordas no Hero. Sem essa
  // conta, o x/y (que sao % da PROPRIA caixa, nao da tela) so empurra a
  // partir desse ponto cortado, e nunca garante que o circulo entre
  // inteiro na tela: ficou cortado nas duas ultimas tentativas.
  // Aqui calculamos, em pixel real, onde o CENTRO da caixa esta no estado
  // "Hero" (scale 1, sem translate) e onde queremos que ele fique no
  // estado "Sobre" (menor, dentro da tela, sem tocar nenhuma borda, e a
  // direita da bio pra nao cobrir o paragrafo), e convertemos a diferenca
  // pra % da caixa (que e a unidade que x/y entendem).
  const BOX = 520;
  const ESCALA_SOBRE = 0.4;
  const centroHeroX = -0.1 * viewport.w + BOX / 2;
  const centroHeroY = 1.2 * viewport.h - BOX / 2;
  // alvo: ~62% da largura (fica dentro da coluna dos cards, a direita da
  // bio) e ~30% da altura (bem acima da borda de baixo), com folga de
  // raio suficiente pra nao tocar nenhuma borda mesmo em telas de 1024px.
  const raioSobre = (BOX * ESCALA_SOBRE) / 2;
  const centroSobreX = Math.max(0.55, Math.min(0.62, 1 - raioSobre / viewport.w - 0.03)) * viewport.w;
  const centroSobreY = 0.3 * viewport.h;
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  const scale = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], [1, 1, ESCALA_SOBRE, ESCALA_SOBRE]);
  const x = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", `${xSobrePct}%`, `${xSobrePct}%`]);
  const y = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", `${ySobrePct}%`, `${ySobrePct}%`]);

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
            {/* entrada por tempo (opacity + escala pequena), separada do
                scale de scroll acima — nao existe mais scale ligado ao
                scroll, entao esta e a UNICA animacao de escala da lua */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={podeAparecer ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <div
                className="absolute rounded-full border border-black/[0.07]"
                style={{ width: 660, height: 660, top: -70, left: -70 }}
              />
              <Moon size={520} progress={scrollYProgress} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 col-start-1 row-start-1">
        {children}
      </div>
    </div>
  );
}
