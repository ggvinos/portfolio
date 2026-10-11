"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Moon from "./Moon";

const SIZE = 520;
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

/** One scheduled frame per scroll event; layout is measured only when it changes. */
export default function HeroAboutJourney({
  children,
}: {
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const moon = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    const overlay = layer.current;
    const sphere = moon.current;
    if (!container || !overlay || !sphere) return;
    const hero = container.querySelector<HTMLElement>("#hero");
    const about = container.querySelector<HTMLElement>("#about");
    const bio = container.querySelector<HTMLElement>("[data-bio-col]");
    const slot = container.querySelector<HTMLElement>("[data-moon-slot]");
    const texture = sphere.querySelector<HTMLElement>("[data-moon-texture]");
    if (!hero || !about || !bio || !slot || !texture) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let dirty = true;
    let disposed = false;
    let geometry = {
      top: 0,
      heroHeight: 0,
      aboutBottom: 0,
      bioTop: 0,
      bioBottom: 0,
      bioHeight: 0,
      slotOffset: 0,
      targetX: 0,
      width: 0,
      height: 0,
    };

    const measure = () => {
      const scroll = window.scrollY;
      const bioRect = bio.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const padding = parseFloat(getComputedStyle(about).paddingBottom);
      geometry = {
        top: container.getBoundingClientRect().top + scroll,
        heroHeight: hero.offsetHeight,
        aboutBottom: aboutRect.bottom + scroll,
        // offsetTop stays stable while the biography is sticky.
        bioTop:
          aboutRect.top +
          scroll +
          parseFloat(getComputedStyle(about).paddingTop),
        bioBottom: aboutRect.bottom + scroll - padding,
        bioHeight: bio.offsetHeight,
        slotOffset: slotRect.top - bioRect.top + slotRect.height / 2,
        targetX: slotRect.left + slotRect.width / 2,
        width: window.innerWidth,
        height: window.innerHeight,
      };
      dirty = false;
    };

    const render = () => {
      frame = 0;
      if (!desktop.matches) {
        overlay.hidden = true;
        return;
      }
      if (dirty) measure();
      const g = geometry;
      const scroll = window.scrollY;
      const local = scroll - g.top;
      const startX = -g.width * 0.1 + SIZE / 2;
      const startY = g.heroHeight * 1.2 - SIZE / 2;
      if (reduced.matches) {
        overlay.style.position = "absolute";
        overlay.style.height = `${g.heroHeight}px`;
        overlay.hidden = false;
        overlay.style.opacity = "1";
        sphere.style.transform = `translate3d(${startX - SIZE / 2}px,${startY - SIZE / 2}px,0)`;
        texture.style.transform = "none";
        return;
      }
      overlay.style.position = "fixed";
      overlay.style.removeProperty("height");
      const end = g.aboutBottom - g.top;
      // Browser scroll positions are rounded, while section bounds can be fractional.
      if (local >= end - 1 || local < -g.height) {
        overlay.hidden = true;
        return;
      }
      overlay.hidden = false;
      const progress = smooth(
        clamp((local - g.heroHeight * 0.3) / (g.heroHeight * 0.7), 0, 1),
      );
      const bioY = Math.min(
        Math.max(g.bioTop - scroll, 96),
        g.bioBottom - scroll - g.bioHeight,
      );
      const targetY = bioY + g.slotOffset;
      const scale = 1 - progress * 0.7;
      const x = startX + (g.targetX - startX) * progress;
      const y = startY + (targetY - startY) * progress;
      const fade =
        1 -
        smooth(
          clamp((local - (end - g.height * 0.25)) / (g.height * 0.25), 0, 1),
        );

      overlay.style.opacity = String(fade);
      sphere.style.transform = `translate3d(${(x - SIZE / 2).toFixed(2)}px,${(y - SIZE / 2).toFixed(2)}px,0) scale(${scale.toFixed(4)})`;
      texture.style.transform = `translate3d(${(-progress * 110).toFixed(2)}px,0,0)`;
    };
    const schedule = () => {
      if (!disposed && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    };
    const resize = () => {
      dirty = true;
      schedule();
    };
    const observer = new ResizeObserver(resize);
    [container, hero, about, bio, slot].forEach((element) =>
      observer.observe(element),
    );
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", resize);
    desktop.addEventListener("change", resize);
    reduced.addEventListener("change", resize);
    document.fonts.ready.then(() => {
      if (!disposed) resize();
    });
    render();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", resize);
      desktop.removeEventListener("change", resize);
      reduced.removeEventListener("change", resize);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <div
        ref={layer}
        data-moon-layer
        aria-hidden="true"
        hidden
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <div
          ref={moon}
          data-scroll-moon
          className="absolute left-0 top-0 h-[520px] w-[520px] will-change-transform"
        >
          <Moon />
        </div>
      </div>
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
