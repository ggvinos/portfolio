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
        // sombra por fora: da peso/profundidade contra a pagina, como se
        // a esfera projetasse sombra, nao so uma foto colada na tela
        boxShadow: "0 50px 90px -30px rgba(0,0,0,0.35)",
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
      {/* sombreado de esfera: gradiente linear (nao radial) simula o
          terminador dia/noite de verdade — claro no canto que recebe luz,
          escurecendo progressivamente pro lado oposto. A foto sozinha tem
          iluminacao propria fixa e plana; isso e o que da volume. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255,255,255,0.12) 0%,
            transparent 32%,
            rgba(0,0,0,0.12) 58%,
            rgba(0,0,0,0.6) 100%
          )`,
        }}
      />
      {/* vinheta no aro: escurece a borda inteira, reforcando a curvatura
          da esfera perto do limbo (onde qualquer esfera real escurece) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 0 44px 4px rgba(0,0,0,0.4)" }}
      />
    </div>
  );
}
