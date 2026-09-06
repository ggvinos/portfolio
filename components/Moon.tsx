"use client";

import { motion, type MotionValue, useSpring, useTransform } from "motion/react";

/**
 * Lua real, sem WebGL. Depois de três tentativas com Three.js (textura
 * procedural, depois textura real numa esfera 3D) sempre esbarrando em
 * bugs de buffer/aspect ratio que este ambiente de teste não deixava
 * verificar de verdade, a decisão foi simplificar: uma foto real da lua
 * (mesma textura NASA/Solar System Scope de antes) dentro de um círculo
 * CSS puro.
 *
 * `border-radius: 50%` + `overflow: hidden` corta redondo sempre — não
 * depende de canvas, buffer, dpr ou ResizeObserver, não tem como sair
 * oval. O "girar com o scroll" vem de deslizar a própria foto (que é um
 * mapa equirretangular contínuo, feito pra enrolar numa esfera) dentro
 * do círculo — sem rotação 3D de verdade, mas sem nenhuma das
 * fragilidades que o WebGL trouxe.
 */
export default function Moon({
  size,
  progress,
  style,
}: {
  size: number;
  progress: MotionValue<number>;
  style?: React.CSSProperties;
}) {
  // a textura e um mapa 2:1 pensado pra enrolar numa esfera — deslizando
  // horizontalmente com repeat-x, o ponto onde ela "junta" nas bordas nao
  // aparece, e o efeito le como girar, nao como uma foto arrastando.
  // -140% em vez de -300%: giro mais lento e suave ao longo do mesmo
  // trecho de scroll, sem parecer que a foto desliza rapido demais.
  const backgroundPositionXRaw = useTransform(progress, [0, 1], ["0%", "-140%"]);
  const backgroundPositionX = useSpring(backgroundPositionXRaw, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        // sombra por fora: da peso/profundidade contra a pagina, como se
        // a esfera projetasse sombra, nao so uma foto colada na tela
        // sombra projetada + halo de contato: duas camadas em vez de uma da
        // a impressao de um corpo apoiado num espaco, nao um disco flutuando
        boxShadow:
          "0 60px 110px -35px rgba(0,0,0,0.42), 0 12px 30px -12px rgba(0,0,0,0.22)",
        ...style,
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/textures/moon-1k.jpg)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPositionX,
          backgroundPositionY: "center",
          // a foto vem plana e clara demais; um empurrao de contraste faz
          // as crateras devolverem relevo quando o sombreado entra por cima
          filter: "contrast(1.12) brightness(0.96) saturate(0.85)",
        }}
      />
      {/* Sombreamento principal: RADIAL, centrado na fonte de luz (canto
          superior esquerdo), nao linear. Numa esfera de verdade o brilho
          cai com o cosseno do angulo em relacao a luz — isso se parece
          muito mais com aneis concentricos ao redor do ponto iluminado do
          que com uma rampa reta atravessando o disco. Era um
          linear-gradient antes, e por isso a lua lia como uma foto com
          filtro diagonal em vez de um corpo redondo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 30% 24%,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.05) 18%,
            rgba(0,0,0,0) 34%,
            rgba(0,0,0,0.22) 55%,
            rgba(0,0,0,0.58) 78%,
            rgba(0,0,0,0.88) 100%
          )`,
        }}
      />
      {/* Escurecimento de limbo: qualquer esfera escurece perto da borda
          porque ali a superficie esta quase de perfil pra quem olha.
          Centrado no disco (nao na luz), so nos ultimos ~40% do raio. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(0,0,0,0) 58%,
            rgba(0,0,0,0.16) 80%,
            rgba(0,0,0,0.42) 94%,
            rgba(0,0,0,0.62) 100%
          )`,
        }}
      />
      {/* Luz ambiente no lado escuro: um fio de claridade rente ao aro
          oposto a luz. Sem isso o lado noturno vira preto chapado e o
          disco lê como recorte colado; com ele o volume fecha e a esfera
          parece continuar por tras. */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(
            circle at 76% 82%,
            rgba(180,196,222,0.16) 0%,
            rgba(180,196,222,0.05) 30%,
            rgba(0,0,0,0) 52%
          )`,
          mixBlendMode: "screen",
        }}
      />
      {/* Vinheta de aro, agora mais suave: o trabalho pesado passou pros
          gradientes radiais acima, aqui e' so pra amarrar a silhueta. */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 0 40px 2px rgba(0,0,0,0.35)" }}
      />
    </div>
  );
}
