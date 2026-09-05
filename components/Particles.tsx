"use client";

import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}

type Circle = {
  x: number; y: number;
  translateX: number; translateY: number;
  size: number;
  alpha: number; targetAlpha: number;
  dx: number; dy: number;
  magnetism: number;
};

export default function Particles({
  className = "",
  quantity = 80,
  staticity = 50,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const mousePosition = useMousePosition();
  const particleBase = useRef<number[]>([20, 20, 20]);

  useEffect(() => {
    if (canvasRef.current) ctx.current = canvasRef.current.getContext("2d");
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--particle-rgb").trim();
    if (raw) particleBase.current = raw.split(",").map((n) => parseInt(n.trim(), 10));
    initCanvas();
    const animId = requestAnimationFrame(animate);
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
      mouse.current = { x, y };
    }
  }, [mousePosition]);

  const initCanvas = () => {
    if (!containerRef.current || !canvasRef.current || !ctx.current) return;
    circles.current = [];
    canvasSize.current.w = containerRef.current.offsetWidth;
    canvasSize.current.h = containerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    ctx.current.scale(dpr, dpr);
    drawParticles();
  };

  const circleParams = (): Circle => {
    // 80% distant small stars, 15% medium, 5% nearby bright
    const tier = Math.random();
    const size = tier < 0.8
      ? Math.random() * 0.7 + 0.2
      : tier < 0.95
        ? Math.random() * 1.2 + 0.8
        : Math.random() * 1.5 + 1.8;
    const speed = size < 0.8 ? 0.05 : size < 1.5 ? 0.12 : 0.2;
    return {
      x: Math.random() * canvasSize.current.w,
      y: Math.random() * canvasSize.current.h,
      translateX: 0, translateY: 0,
      size,
      alpha: 0,
      targetAlpha: parseFloat((size < 0.8 ? Math.random() * 0.4 + 0.1 : Math.random() * 0.7 + 0.3).toFixed(1)),
      dx: (Math.random() - 0.5) * speed,
      dy: (Math.random() - 0.5) * speed,
      magnetism: size < 0.8 ? 0.1 + Math.random() * 1.5 : 0.5 + Math.random() * 4,
    };
  };

  const drawCircle = (c: Circle, update = false) => {
    if (!ctx.current) return;
    // 3 tons de cinza puro (sem matiz) simulam profundidade: poeira mais
    // perto (mais escura) e mais longe (mais clara), sem depender de cor.
    // A tonalidade base vem de --particle-rgb (CSS var), documentado desde
    // sempre mas nunca de fato lido — implementado agora de verdade.
    const roll = (c.x * c.y) % 100;
    const rgb = roll < 7
      ? particleBase.current.map((v) => Math.min(255, v + 60)).join(", ")
      : roll < 10
        ? particleBase.current.map((v) => Math.max(0, v - 40)).join(", ")
        : particleBase.current.join(", ");
    ctx.current.translate(c.translateX, c.translateY);
    ctx.current.beginPath();
    ctx.current.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
    ctx.current.fillStyle = `rgba(${rgb}, ${c.alpha})`;
    ctx.current.fill();
    ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) circles.current.push(c);
  };

  const drawParticles = () => {
    ctx.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    for (let i = 0; i < quantity; i++) drawCircle(circleParams());
  };

  const remap = (v: number, s1: number, e1: number, s2: number, e2: number) =>
    Math.max(0, ((v - s1) * (e2 - s2)) / (e1 - s1) + s2);

  const animate = () => {
    ctx.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    circles.current.forEach((c, i) => {
      const edge = [
        c.x + c.translateX - c.size,
        canvasSize.current.w - c.x - c.translateX - c.size,
        c.y + c.translateY - c.size,
        canvasSize.current.h - c.y - c.translateY - c.size,
      ];
      const closest = Math.min(...edge);
      const edgeAlpha = parseFloat(remap(closest, 0, 20, 0, 1).toFixed(2));
      if (edgeAlpha > 1) {
        c.alpha = Math.min(c.alpha + 0.02, c.targetAlpha);
      } else {
        c.alpha = c.targetAlpha * edgeAlpha;
      }
      c.x += c.dx;
      c.y += c.dy;
      c.translateX += (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
      c.translateY += (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;

      if (
        c.x < -c.size || c.x > canvasSize.current.w + c.size ||
        c.y < -c.size || c.y > canvasSize.current.h + c.size
      ) {
        circles.current.splice(i, 1);
        drawCircle(circleParams());
      } else {
        drawCircle({ ...c }, true);
      }
    });
    requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
