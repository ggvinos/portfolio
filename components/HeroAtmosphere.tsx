"use client";

import { useParallax } from "@/hooks/useScrollFx";
import Moon3D from "@/components/Moon3D";

/**
 * Decoração do Hero: uma lua 3D de verdade (esfera + textura real da
 * NASA, via Moon3D.tsx), uma esfera lisa desfocada ao fundo (dá
 * profundidade), anéis de órbita, meteoros e sparkles. Tudo em cinza puro
 * (nenhum valor com R≠G≠B) exceto a textura da lua, que é uma foto real.
 */

/** Base da esfera lisa (BlurOrb): luz vindo de cima-esquerda. */
const ESFERA_BASE = `
  radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, transparent 34%),
  radial-gradient(circle at 70% 74%, rgba(0,0,0,0.16) 0%, transparent 30%),
  linear-gradient(135deg, #eaeaea 0%, #b5b5b5 42%, #707070 76%, #383838 100%)
`;

/** Esfera lisa desfocada: dá profundidade sem competir com a lua. */
function BlurOrb({ size, style }: { size: number; style?: React.CSSProperties }) {
  const drift = useParallax<HTMLDivElement>(0.05);
  return (
    <div
      ref={drift}
      aria-hidden="true"
      className="absolute rounded-full will-change-transform"
      style={{
        width: size,
        height: size,
        background: ESFERA_BASE,
        boxShadow: "inset -14px -14px 46px rgba(0,0,0,0.4), 0 0 70px rgba(0,0,0,0.04)",
        filter: "blur(6px)",
        opacity: 0.85,
        ...style,
      }}
    />
  );
}

function OrbitRing({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full border border-black/[0.07]"
      style={{ width: size, height: size, ...style }}
    />
  );
}

function Meteor({
  x,
  y,
  length,
  angle,
  delay,
  duration = 5,
}: {
  x: string;
  y: string;
  length: number;
  angle: number;
  delay: number;
  duration?: number;
}) {
  // percorre a propria direcao (cos/sin do angulo), nao uma diagonal fixa —
  // senao o rasto nao bate com a inclinacao do risco
  const rad = (angle * Math.PI) / 180;
  const dist = 55;
  const dx = Math.round(Math.cos(rad) * dist);
  const dy = Math.round(Math.sin(rad) * dist);

  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={
        {
          left: x,
          top: y,
          width: length,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.9))",
          transformOrigin: "left center",
          // a rotacao precisa estar DENTRO do keyframe: animar so
          // `translate` no keyframe sobrescreve qualquer transform estatico
          // aplicado por fora, e o risco ficava sempre deitado (0deg)
          // durante toda a animacao — por isso parecia cair de lado.
          "--meteor-rot": `${angle}deg`,
          "--meteor-dx": `${dx}px`,
          "--meteor-dy": `${dy}px`,
          animation: `meteor-fall ${duration}s ease-in ${delay}s infinite`,
        } as React.CSSProperties
      }
    />
  );
}

function Sparkle({
  x,
  y,
  size = 14,
  delay = 0,
}: {
  x: string;
  y: string;
  size?: number;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="absolute"
      style={{ left: x, top: y, animation: `sparkle-twinkle 3.4s ease-in-out ${delay}s infinite` }}
    >
      <path
        d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z"
        fill="#0d0d0d"
      />
    </svg>
  );
}

export default function HeroAtmosphere() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      {/* esfera lisa desfocada: menor, ao fundo, da profundidade */}
      <BlurOrb size={200} style={{ top: "8%", right: "-4%" }} />
      <OrbitRing size={320} style={{ top: "-2%", right: "-9%" }} />

      {/* lua: maior, nitida, elemento principal — quase toda fora de quadro */}
      <Moon3D size={480} style={{ bottom: "-30%", left: "-16%" }} />
      <OrbitRing size={620} style={{ bottom: "-38%", left: "-22%" }} />

      {/* meteoros: quase verticais (60-72deg da horizontal), caem, nao "voam de lado" */}
      <Meteor x="28%" y="12%" length={80} angle={68} delay={0} duration={6} />
      <Meteor x="78%" y="8%" length={110} angle={72} delay={2.4} duration={7} />
      <Meteor x="10%" y="50%" length={60} angle={64} delay={4.5} duration={5.5} />

      {/* sparkles: pontinhos de 4 pontas, brilho pulsante */}
      <Sparkle x="30%" y="20%" size={16} delay={0} />
      <Sparkle x="85%" y="52%" size={12} delay={1.2} />
      <Sparkle x="15%" y="68%" size={10} delay={2.1} />
      <Sparkle x="60%" y="10%" size={11} delay={0.6} />
    </div>
  );
}
