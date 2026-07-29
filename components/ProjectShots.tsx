"use client";

import PhoneShot from "@/components/PhoneShot";
import { useParallax } from "@/hooks/useScrollFx";

const SHOTS = ["/acorde/home.webp", "/acorde/letra.webp", "/acorde/fala.webp"];

/**
 * Faixa de telas no pé do card destacado: os aparelhos aparecem cortados,
 * dissolvendo no card, e derivam de leve conforme a página rola.
 */
export default function ProjectShots({ alt }: { alt: string }) {
  const drift = useParallax<HTMLDivElement>(0.07);

  return (
    <div className="relative h-40 sm:h-48 overflow-hidden">
      <div ref={drift} className="px-6 pt-3 will-change-transform">
        <PhoneShot srcs={SHOTS} alt={alt} width={190} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </div>
  );
}
