"use client";

import { useRef, useState, type MouseEvent, type PropsWithChildren } from "react";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
}

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden border border-[var(--border)] rounded-xl transition-colors duration-700 hover:border-[#334155] group ${className}`}
    >
      {/* spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px at ${pos.x}px ${pos.y}px, rgba(241,245,249,0.07), transparent 80%)`,
        }}
      />
      {/* subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "linear-gradient(135deg, var(--surface) 0%, transparent 60%)" }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
