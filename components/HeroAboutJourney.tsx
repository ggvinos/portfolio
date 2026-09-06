"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Moon from "@/components/Moon";

/**
 * Envolve Hero + Sobre e faz a lua viajar entre as duas seções: grande
 * no Hero, encolhe enquanto o Hero sai, e fica PARADA ao lado do texto
 * do Sobre enquanto o usuário lê os cards.
 *
 * Como funciona, na ordem mais simples possível:
 *
 * 1. A lua vive numa camada `sticky top-0 h-screen` que cobre a altura
 *    de Hero+Sobre. Enquanto sobra pista de scroll no container, essa
 *    camada fica grudada na tela.
 * 2. scale/x/y são interpolados sobre o scroll em PIXEL ABSOLUTO da
 *    página (não fração do container). Depois do fim da transição o
 *    `useTransform` trava nos valores finais — a lua fica no mesmo
 *    pixel da tela, igual à bio, que também é sticky.
 * 3. Quando o container acaba, o sticky solta sozinho e a lua rola
 *    embora junto com a página, como qualquer elemento normal. Não
 *    existe efeito de "sumir" (nada de opacity/display animado).
 *
 * Trabalhar em pixel absoluto é proposital: versões anteriores
 * converteram px -> fração do `scrollYProgress` e erraram o
 * denominador (com offset ["start start","end end"] o progresso 0-1
 * cobre `altura do container - altura da tela`, não a altura total),
 * o que desalinhava todos os breakpoints.
 *
 * Layout: CSS Grid com as duas camadas na MESMA célula (col-start-1
 * row-start-1). Um `sticky` ocupa espaço próprio no fluxo, então como
 * irmão antes do conteúdo empurraria tudo pra baixo; sobreposto, a
 * altura do grid vem só do conteúdo.
 */
export default function HeroAboutJourney({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // progresso 0-1 do container: usado SÓ pelo giro da textura da lua.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // scroll bruto da página: usado pelos breakpoints de posição.
  const { scrollY } = useScroll();

  // a lua só entra depois que o nome do Hero termina de se resolver
  // (animate-title: delay 0.2s + 2s), não no instante do load.
  const [podeAparecer, setPodeAparecer] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPodeAparecer(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [heroAlturaPx, setHeroAlturaPx] = useState(900);
  const [conteudoAlturaPx, setConteudoAlturaPx] = useState(2200);
  const [topoContainerPx, setTopoContainerPx] = useState(0);
  // bio = coluna esquerda do Sobre (data-bio-col em About.tsx), sticky
  // em top-24. Precisamos da altura E da posição dela na página pra
  // saber onde o texto estará na tela no momento em que a lua para.
  const [bioAlturaPx, setBioAlturaPx] = useState(260);
  const [bioTopoPaginaPx, setBioTopoPaginaPx] = useState(1060);

  useLayoutEffect(() => {
    function medir() {
      const container = contentRef.current;
      if (!container) return;
      const hero = container.firstElementChild as HTMLElement | null;
      const bio = container.querySelector("[data-bio-col]") as HTMLElement | null;
      if (hero) setHeroAlturaPx(hero.offsetHeight);
      if (bio) {
        setBioAlturaPx(bio.offsetHeight);
        setBioTopoPaginaPx(bio.getBoundingClientRect().top + window.scrollY);
      }
      if (container.offsetHeight > 0) setConteudoAlturaPx(container.offsetHeight);
      setTopoContainerPx(container.getBoundingClientRect().top + window.scrollY);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  // A caixa (520px) fica ancorada em bottom:-20%/left:-10% do container
  // h-screen — de propósito cortada por duas bordas no Hero. x/y são %
  // da PRÓPRIA caixa, então o alvo precisa ser calculado em pixel real
  // de tela pra garantir que o círculo entre inteiro.
  const BOX = 520;
  const ESCALA_SOBRE = 0.28;
  const centroHeroX = -0.1 * viewport.w + BOX / 2;
  const centroHeroY = 1.2 * viewport.h - BOX / 2;
  const raioSobre = (BOX * ESCALA_SOBRE) / 2;

  // Onde o sticky solta sozinho: fim do container encostando no fim da
  // tela. Depois disso a lua rola embora com a página — no mesmo
  // instante em que a bio (também sticky) solta. As duas param de ser
  // perseguidas pela câmera juntas, que é o comportamento pedido.
  const soltaPx = topoContainerPx + Math.max(0, conteudoAlturaPx - viewport.h);

  // Transição: começa depois do primeiro terço do Hero e termina quando
  // o Hero acaba de sair, ou seja, a lua já chega pequena e no lugar no
  // instante em que o Sobre ocupa a tela. O clamp evita que ela termine
  // depois do sticky soltar (senão sairia da tela ainda gigante).
  const comecaPx = topoContainerPx + heroAlturaPx * 0.3;
  const terminaPx = Math.min(topoContainerPx + heroAlturaPx, soltaPx - 40);
  const fimPx = Math.max(terminaPx, comecaPx + 1);

  // Zona proibida: onde o texto da bio estará na tela no momento em que
  // a lua para. A bio é sticky em top-24, mas até ela colar nesse ponto
  // fica mais embaixo — usar 96px direto faria a lua parar por cima do
  // parágrafo justo no fim da transição.
  const bioTopoNaTelaNoFim = Math.max(96, bioTopoPaginaPx - fimPx);
  const zonaProibidaAteY = bioTopoNaTelaNoFim + bioAlturaPx + 40;
  const centroSobreX = Math.max(0.14 * viewport.w, raioSobre + 24);
  const centroSobreY = Math.min(zonaProibidaAteY + raioSobre, viewport.h - raioSobre - 24);
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  const scale = useTransform(scrollY, [comecaPx, fimPx], [1, ESCALA_SOBRE]);
  const x = useTransform(scrollY, [comecaPx, fimPx], ["0%", `${xSobrePct}%`]);
  const y = useTransform(scrollY, [comecaPx, fimPx], ["0%", `${ySobrePct}%`]);

  return (
    <div ref={ref} className="grid">
      {/* sem altura fixa: precisa esticar pra célula inteira do grid
          (Hero+Sobre), senão o sticky de dentro só tem h-screen de
          pista. hidden abaixo de lg: no mobile o Sobre vira coluna
          única e não sobra espaço decorativo. */}
      <div className="pointer-events-none relative col-start-1 row-start-1 hidden h-full lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute"
            style={{ width: 520, height: 520, bottom: "-20%", left: "-10%", scale, x, y }}
          >
            {/* entrada por tempo, separada do scale de scroll acima */}
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
