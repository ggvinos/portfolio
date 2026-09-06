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
          iluminacao propria fixa e plana; isso e o que da volume. Contraste
          aumentado (0.7 no canto escuro, era 0.6) porque a versao anterior
          lia como "foto com filtro leve", nao como esfera de verdade. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255,255,255,0.16) 0%,
            transparent 30%,
            rgba(0,0,0,0.18) 55%,
            rgba(0,0,0,0.7) 100%
          )`,
        }}
      />
      {/* sombra propria embaixo: nenhuma esfera real e iluminada por baixo,
          entao a base sempre escurece mais que o resto — reforca peso e
          contato com uma "luz vindo de cima" implicita. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.55) 0%,
            transparent 40%
          )`,
        }}
      />
      {/* vinheta no aro: escurece a borda inteira, reforcando a curvatura
          da esfera perto do limbo (onde qualquer esfera real escurece) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 0 52px 6px rgba(0,0,0,0.5)" }}
      />
    </div>
  );
}
