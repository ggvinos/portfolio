"use client";
import { useEffect, useRef } from "react";

export default function Particles({
  className = "",
  quantity = 80,
}: {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let last = 0;
    let width = 0;
    let height = 0;
    let stars: { x: number; y: number; size: number; speed: number }[] = [];
    const draw = (time: number) => {
      frame = 0;
      const delta = Math.min(32, time - last || 16) / 16;
      last = time;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(20,20,20,.22)";
      for (const star of stars) {
        if (!reduced.matches) star.y = (star.y + star.speed * delta) % height;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
      }
      if (visible && !document.hidden && !reduced.matches)
        frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      draw(performance.now());
    };
    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: width < 768 ? 30 : quantity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 0.8 + 0.3,
        speed: Math.random() * 0.1 + 0.03,
      }));
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const sizing = new ResizeObserver(resize);
    observer.observe(element);
    sizing.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizing.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [quantity]);
  return (
    <div aria-hidden="true" className={className}>
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  );
}
