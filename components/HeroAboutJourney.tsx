"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
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
export default function HeroAboutJourney({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreference();

  // Absolute scroll remains the input to the original position/scale maps.
  const scrollY = useMotionValue(0);
  useLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      scrollY.set(window.scrollY);
    };
    const schedule = () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [scrollY]);

  // a lua só entra depois que o nome do Hero termina de se resolver
  // (animate-title: delay 0.2s + 2s), não no instante do load.
  const [podeAparecer, setPodeAparecer] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPodeAparecer(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const [layout, setLayout] = useState({
    w: 1440,
    h: 900,
    heroAlturaPx: 900,
    conteudoAlturaPx: 2200,
    topoContainerPx: 0,
    bioAlturaPx: 260,
    bioTopoPaginaPx: 1060,
  });
  const {
    heroAlturaPx,
    conteudoAlturaPx,
    topoContainerPx,
    bioAlturaPx,
    bioTopoPaginaPx,
  } = layout;
  const viewport = { w: layout.w, h: layout.h };
  // Same start/start → end/end progress as the original useScroll target.
  // The endpoints come from cached measurements, never from layout reads per frame.
  const scrollYProgress = useTransform(
    scrollY,
    [
      topoContainerPx,
      topoContainerPx + Math.max(1, conteudoAlturaPx - viewport.h),
    ],
    [0, 1],
  );

  useLayoutEffect(() => {
    let frame = 0;
    let disposed = false;
    function medir() {
      frame = 0;
      const container = contentRef.current;
      if (!container || disposed) return;
      const hero = container.querySelector<HTMLElement>("#hero");
      const about = container.querySelector<HTMLElement>("#about");
      const bio = container.querySelector<HTMLElement>("[data-bio-col]");
      if (!hero || !bio || !about) return;
      const scroll = window.scrollY;
      const next = {
        w: window.innerWidth,
        h: window.innerHeight,
        heroAlturaPx: hero.offsetHeight,
        conteudoAlturaPx: container.offsetHeight,
        topoContainerPx: container.getBoundingClientRect().top + scroll,
        bioAlturaPx: bio.offsetHeight,
        // Logical document position stays stable even when the biography is sticky.
        bioTopoPaginaPx:
          about.getBoundingClientRect().top +
          scroll +
          parseFloat(getComputedStyle(about).paddingTop),
      };
      setLayout((previous) =>
        Object.keys(next).every(
          (key) =>
            previous[key as keyof typeof next] ===
            next[key as keyof typeof next],
        )
          ? previous
          : next,
      );
    }
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (contentRef.current) {
      observer.observe(contentRef.current);
      const bio = contentRef.current.querySelector("[data-bio-col]");
      if (bio) observer.observe(bio);
    }
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
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
  // tela. Serve como o ponto em que o movimento natural da página
  // assume o lugar do transform (ver `subidaPx` abaixo).
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
  const centroSobreY = Math.min(
    zonaProibidaAteY + raioSobre,
    viewport.h - raioSobre - 24,
  );
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  // Depois de chegar no lugar, a lua para de ser perseguida pela câmera:
  // ela sobe 1:1 com o scroll, ancorada ao Sobre como qualquer elemento
  // da página. Isso é feito no próprio transform até `soltaPx`, porque a
  // partir dali o sticky solta sozinho e o movimento natural assume — se
  // o transform continuasse, ela subiria com o dobro da velocidade.
  const subidaPx = Math.max(0, soltaPx - fimPx);
  const ySobeComPagina = ySobrePct - (subidaPx / BOX) * 100;
  const fimSubidaPx = Math.max(fimPx + 1, soltaPx);

  const scale = useTransform(scrollY, [comecaPx, fimPx], [1, ESCALA_SOBRE]);
  const x = useTransform(scrollY, [comecaPx, fimPx], ["0%", `${xSobrePct}%`]);
  const y = useTransform(
    scrollY,
    [comecaPx, fimPx, fimSubidaPx],
    ["0%", `${ySobrePct}%`, `${ySobeComPagina}%`],
  );

  return (
    <div ref={ref} className="relative grid">
      {/* sem altura fixa: precisa esticar pra célula inteira do grid
          (Hero+Sobre), senão o sticky de dentro só tem h-screen de
          pista. hidden abaixo de lg: no mobile o Sobre vira coluna
          única e não sobra espaço decorativo. */}
      <div className="pointer-events-none relative col-start-1 row-start-1 hidden h-full lg:block">
        <div data-moon-layer className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            data-scroll-moon
            className="absolute"
            style={{
              width: 520,
              height: 520,
              bottom: "-20%",
              left: "-10%",
              scale: reduced ? 1 : scale,
              x: reduced ? "0%" : x,
              y: reduced ? "0%" : y,
            }}
          >
            {/* entrada por tempo, separada do scale de scroll acima */}
            <motion.div
              data-moon-entrance
              initial={reduced ? false : { opacity: 0, scale: 0.82 }}
              animate={podeAparecer || reduced ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
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
