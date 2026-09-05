"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

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
  // aparece, e o efeito le como girar, nao como uma foto arrastando
  const backgroundPositionX = useTransform(progress, [0, 1], ["0%", "-300%"]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        boxShadow: "inset -14px -14px 46px rgba(0,0,0,0.35), 0 0 70px rgba(0,0,0,0.04)",
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
        }}
      />
      {/* sombreado por cima da foto: luz vindo de cima-esquerda, pra
          combinar com o resto da composicao (planetas, meteoros) mesmo
          a foto tendo a propria iluminacao original fixa */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18) 0%, transparent 40%),
            radial-gradient(circle at 72% 76%, rgba(0,0,0,0.32) 0%, transparent 55%)
          `,
        }}
      />
    </div>
  );
}
