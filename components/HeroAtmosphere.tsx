"use client";

import { useId } from "react";
import { useParallax } from "@/hooks/useScrollFx";

/**
 * Decoração do Hero: planeta, anéis de órbita, meteoros e sparkles.
 * Tudo em cinza puro (nenhum valor com R≠G≠B) — é o mesmo mandato de cor
 * do resto do redesign, só que aqui vira textura em vez de texto/borda.
 */

function Planet({
  size,
  style,
  opacity = 1,
}: {
  size: number;
  style?: React.CSSProperties;
  opacity?: number;
}) {
  const drift = useParallax<HTMLDivElement>(0.05);
  const filterId = useId();

  return (
    <div ref={drift} aria-hidden="true" className="absolute will-change-transform" style={{ width: size, height: size, opacity, ...style }}>
      {/* base: esfera lisa com luz vindo de cima-esquerda */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, transparent 34%),
            radial-gradient(circle at 70% 74%, rgba(0,0,0,0.16) 0%, transparent 30%),
            linear-gradient(135deg, #eaeaea 0%, #b5b5b5 42%, #707070 76%, #383838 100%)
          `,
          boxShadow: "inset -14px -14px 46px rgba(0,0,0,0.4), 0 0 70px rgba(0,0,0,0.04)",
        }}
      />

      {/* textura: relevo procedural via feTurbulence + feDiffuseLighting —
          crateras de verdade em vez de 4 manchas de radial-gradient, que
          ficavam lisas demais pra ler como superfície de planeta */}
      <svg
        className="absolute inset-0 rounded-full mix-blend-overlay"
        width={size}
        height={size}
        style={{ opacity: 0.6 }}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="5" seed="7" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale="4.5" diffuseConstant="1" result="light">
              <feDistantLight azimuth="235" elevation="32" />
            </feDiffuseLighting>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2} filter={`url(#${filterId})`} />
      </svg>
    </div>
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
  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{
        left: x,
        top: y,
        width: length,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.9))",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
        animation: `meteor-fall ${duration}s ease-in ${delay}s infinite`,
      }}
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
      {/* planeta principal: canto superior direito, meio cortado pela borda */}
      <Planet size={220} style={{ top: "8%", right: "-4%" }} />
      <OrbitRing size={340} style={{ top: "-2%", right: "-9%" }} />

      {/* segundo planeta: maior, quase todo fora de quadro, canto inferior esquerdo */}
      <Planet size={480} style={{ bottom: "-30%", left: "-16%" }} opacity={0.9} />
      <OrbitRing size={620} style={{ bottom: "-38%", left: "-22%" }} />

      {/* meteoros: riscos finos, caem devagar em loop, nunca ao mesmo tempo */}
      <Meteor x="28%" y="14%" length={90} angle={35} delay={0} duration={6} />
      <Meteor x="78%" y="10%" length={130} angle={40} delay={2.4} duration={7} />
      <Meteor x="8%" y="55%" length={70} angle={30} delay={4.5} duration={5.5} />

      {/* sparkles: pontinhos de 4 pontas, brilho pulsante */}
      <Sparkle x="30%" y="20%" size={16} delay={0} />
      <Sparkle x="85%" y="52%" size={12} delay={1.2} />
      <Sparkle x="15%" y="68%" size={10} delay={2.1} />
      <Sparkle x="60%" y="10%" size={11} delay={0.6} />
    </div>
  );
}
