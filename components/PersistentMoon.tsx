"use client";

import { useEffect, useRef, useState } from "react";
import Moon3D from "@/components/Moon3D";

/**
 * A lua não pertence só ao Hero: fica fixa na tela (não rola com a
 * página) enquanto o usuário está no Hero OU na seção Sobre, e desaparece
 * com um fade suave depois disso — não faz sentido ela seguir aparecendo
 * atrás de Projetos, Experiência etc.
 *
 * `position: fixed` escapa do `overflow-hidden` do Hero porque este
 * componente é renderizado como irmão das seções em page.tsx, não como
 * filho de dentro do Hero.
 */
export default function PersistentMoon() {
  const [opacidade, setOpacidade] = useState(1);
  const [visivel, setVisivel] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    const calcular = () => {
      raf.current = 0;
      const sobre = document.getElementById("about");
      if (!sobre) return;
      const fimSobre = sobre.offsetTop + sobre.offsetHeight;
      // comeca a sumir faltando 60% de uma tela pro fim do Sobre, termina
      // exatamente quando o Sobre acaba — sem isso ela "vaza" pra Projetos
      const inicioFade = fimSobre - window.innerHeight * 0.6;
      const y = window.scrollY;
      const op = inicioFade >= fimSobre ? 1 : Math.min(1, Math.max(0, 1 - (y - inicioFade) / (fimSobre - inicioFade)));
      setOpacidade(op);
      setVisivel(op > 0.01);
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(calcular);
    };

    calcular();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-0"
      style={{
        width: 480,
        height: 480,
        // antes -30%/-16%: cortava a maior parte do circulo pelos dois
        // cantos ao mesmo tempo, e a fatia que sobrava nao lia como
        // "redonda" pra ninguem — parecia so uma forma estranha. Isso
        // mostra o disco quase inteiro.
        bottom: "-6%",
        left: "1%",
        opacity: opacidade,
        display: visivel ? "block" : "none",
        transition: "opacity 0.2s linear",
      }}
    >
      {/* anel de orbita fino, mesma linguagem do resto da composicao —
          um pouco maior que a lua, centralizado nela */}
      <div
        className="absolute rounded-full border border-black/[0.07]"
        style={{ width: 620, height: 620, top: -70, left: -70 }}
      />
      <Moon3D size={480} />
    </div>
  );
}
