"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/context";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import {
  GROUPS,
  KINDS,
  bounds,
  settledGraph,
  tick,
  type GNode,
  type GroupId,
  type Graph,
} from "@/lib/brainGraph";

const copy = {
  pt: {
    hint: "Toque ou passe o mouse em um ponto. Arraste para mexer no grafo.",
    intro:
      "Cada ponto é uma nota e cada linha é um link. As notas se agrupam por assunto, e os pontos grandes são as pastas que organizam tudo. Os nomes aqui são ilustrativos: o vault real é privado.",
    filter: "Filtrar por grupo",
    links: "links",
    link: "link",
    group: "Grupo",
    alt: "Grafo ilustrativo do vault, com pontos para as notas agrupadas por pasta e linhas para os links entre elas.",
  },
  en: {
    hint: "Tap or hover a dot. Drag to move the graph.",
    intro:
      "Each dot is a note and each line is a link. Notes cluster by subject, and the big dots are the folders that organize everything. The names here are illustrative: the real vault is private.",
    filter: "Filter by group",
    links: "links",
    link: "link",
    group: "Group",
    alt: "Illustrative vault graph, with dots for the notes grouped by folder and lines for the links between them.",
  },
} as const;

type View = { s: number; ox: number; oy: number; w: number; h: number; k: number };

export default function BrainGraph() {
  const { lang } = useLanguage();
  const l = lang === "pt" ? "pt" : "en";
  const c = copy[l];
  const reduced = useReducedMotionPreference();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const viewRef = useRef<View>({ s: 1, ox: 0, oy: 0, w: 0, h: 0, k: 1 });
  const stateRef = useRef({
    hover: -1,
    selected: -1,
    group: null as GroupId | null,
    alpha: 0,
    drag: -1,
    moved: false,
    visible: true,
    raf: 0,
    langKey: l as "pt" | "en",
    reduced,
  });
  const [selected, setSelected] = useState(-1);
  const [group, setGroup] = useState<GroupId | null>(null);

  const neighbors = useMemo(() => new Map<number, Set<number>>(), []);

  useEffect(() => {
    stateRef.current.langKey = l;
    stateRef.current.reduced = reduced;
    schedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l, reduced]);

  const draw = useCallback(
    (time = 0) => {
      const canvas = canvasRef.current;
      const g = graphRef.current;
      if (!canvas || !g) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const v = viewRef.current;
      const st = stateRef.current;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, v.w, v.h);
      ctx.fillStyle = "rgba(13,13,13,0.11)";
      const step = 28;
      for (let gx = step / 2; gx < v.w; gx += step)
        for (let gy = step / 2; gy < v.h; gy += step) ctx.fillRect(gx - 0.5, gy - 0.5, 1, 1);

      const focus = st.hover >= 0 ? st.hover : st.selected;
      const near = focus >= 0 ? neighbors.get(focus) : undefined;
      const amp = st.reduced ? 0 : 0.014;
      const X = g.nodes.map((n, i) => v.ox + (n.x + Math.sin(time * 0.0007 + i * 1.9) * amp) * v.s);
      const Y = g.nodes.map((n, i) => v.oy + (n.y + Math.cos(time * 0.0006 + i * 2.3) * amp) * v.s);
      const dim = (i: number) => {
        const n = g.nodes[i];
        if (focus >= 0) return i === focus || near?.has(i) ? 1 : 0.12;
        if (st.group) return n.group === st.group ? 1 : 0.12;
        return 1;
      };
      for (const link of g.links) {
        const on = focus >= 0 && (link.a === focus || link.b === focus);
        const alpha = on ? 0.8 : Math.min(dim(link.a), dim(link.b)) * 0.2;
        ctx.strokeStyle = `rgba(13,13,13,${alpha})`;
        ctx.lineWidth = on ? 1.3 : 0.8;
        ctx.beginPath();
        ctx.moveTo(X[link.a], Y[link.a]);
        ctx.lineTo(X[link.b], Y[link.b]);
        ctx.stroke();
      }
      g.nodes.forEach((n, i) => {
        ctx.globalAlpha = dim(i);
        ctx.fillStyle = GROUPS[n.group].color;
        if (n.hub) {
          const side = n.r * v.k * 1.55;
          ctx.fillRect(X[i] - side / 2, Y[i] - side / 2, side, side);
          if (i === st.selected) {
            ctx.strokeStyle = "#0d0d0d";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(X[i] - side / 2 - 4, Y[i] - side / 2 - 4, side + 8, side + 8);
          }
        } else {
          const r = n.r * v.k * 0.85;
          ctx.beginPath();
          ctx.arc(X[i], Y[i], r, 0, Math.PI * 2);
          ctx.fill();
          if (i === st.selected) {
            ctx.strokeStyle = "#0d0d0d";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(X[i], Y[i], r + 4, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;
      const fontSize = v.w < 520 ? 9.5 : 10.5;
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.lineJoin = "round";
      (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "0.6px";
      g.nodes.forEach((n, i) => {
        const label = n.label?.[st.langKey];
        const major = v.w >= 520 || n.r >= 5.5;
        if (!(n.hub && label && major) && i !== focus) return;
        if (dim(i) < 0.5) return;
        const text = (label ?? KINDS[n.kind].name[st.langKey]).toUpperCase();
        const off = n.hub ? n.r * v.k * 0.78 : n.r * v.k * 0.85;
        const y = Y[i] + off + fontSize + 4;
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.strokeText(text, X[i], y);
        ctx.fillStyle = "#0d0d0d";
        ctx.fillText(text, X[i], y);
      });
    },
    [neighbors],
  );

  const frame = useCallback(() => {
    const st = stateRef.current;
    st.raf = 0;
    const g = graphRef.current;
    if (!g) return;
    const live = !st.reduced && st.visible;
    if (live && st.alpha > 0.008) {
      tick(g, st.alpha);
      st.alpha *= 0.97;
    }
    draw(performance.now());
    if (live) st.raf = requestAnimationFrame(frame);
  }, [draw]);

  function schedule() {
    const st = stateRef.current;
    if (!st.raf) st.raf = requestAnimationFrame(frame);
  }

  const layout = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const g = graphRef.current;
    if (!wrap || !canvas || !g) return;
    const w = wrap.clientWidth;
    const h = Math.round(Math.min(560, Math.max(380, w * 0.95)));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = `${h}px`;
    const b = bounds(g.nodes);
    const pad = w < 520 ? 26 : 48;
    const s = Math.min((w - pad * 2) / (b.maxX - b.minX), (h - pad * 2) / (b.maxY - b.minY));
    viewRef.current = {
      s,
      ox: w / 2 - ((b.minX + b.maxX) / 2) * s,
      oy: h / 2 - ((b.minY + b.maxY) / 2) * s,
      w,
      h,
      k: Math.min(1.15, Math.max(0.8, w / 700)),
    };
    draw();
  }, [draw]);

  useEffect(() => {
    const g = settledGraph();
    graphRef.current = g;
    g.links.forEach((link) => {
      for (const [x, y] of [
        [link.a, link.b],
        [link.b, link.a],
      ]) {
        if (!neighbors.has(x)) neighbors.set(x, new Set());
        neighbors.get(x)!.add(y);
      }
    });
    layout();
    const wrap = wrapRef.current!;
    const st = stateRef.current;
    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
      if (entry.isIntersecting) schedule();
    });
    io.observe(wrap);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hit = useCallback((clientX: number, clientY: number, touch: boolean) => {
    const canvas = canvasRef.current;
    const g = graphRef.current;
    if (!canvas || !g) return -1;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const v = viewRef.current;
    let best = -1;
    let bestD = Infinity;
    g.nodes.forEach((n, i) => {
      const dx = v.ox + n.x * v.s - x;
      const dy = v.oy + n.y * v.s - y;
      const d = Math.hypot(dx, dy);
      const reach = Math.max(n.r * v.k * 1.15 + (touch ? 12 : 5), touch ? 18 : 9);
      if (d <= reach && d < bestD) {
        best = i;
        bestD = d;
      }
    });
    return best;
  }, []);

  const moveNode = useCallback(
    (i: number, clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const g = graphRef.current;
      if (!canvas || !g) return;
      const rect = canvas.getBoundingClientRect();
      const v = viewRef.current;
      const n: GNode = g.nodes[i];
      n.x = (clientX - rect.left - v.ox) / v.s;
      n.y = (clientY - rect.top - v.oy) / v.s;
      n.vx = 0;
      n.vy = 0;
      const st = stateRef.current;
      if (!st.reduced) st.alpha = Math.max(st.alpha, 0.05);
      schedule();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const select = useCallback(
    (i: number) => {
      stateRef.current.selected = i;
      setSelected(i);
      if (i >= 0) {
        stateRef.current.group = null;
        setGroup(null);
      }
      schedule();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = stateRef.current;
    let startX = 0;
    let startY = 0;
    const begin = (i: number, x: number, y: number) => {
      st.drag = i;
      st.moved = false;
      startX = x;
      startY = y;
      if (graphRef.current) graphRef.current.nodes[i].fixed = true;
    };
    const end = () => {
      if (st.drag >= 0 && graphRef.current) graphRef.current.nodes[st.drag].fixed = false;
      st.drag = -1;
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      const i = hit(t.clientX, t.clientY, true);
      if (i < 0) return;
      e.preventDefault();
      begin(i, t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (st.drag < 0) return;
      e.preventDefault();
      const t = e.touches[0];
      if (Math.hypot(t.clientX - startX, t.clientY - startY) > 6) st.moved = true;
      if (st.moved) moveNode(st.drag, t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      if (st.drag < 0) return;
      const tapped = !st.moved ? st.drag : -1;
      end();
      if (tapped >= 0) select(st.selected === tapped ? -1 : tapped);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const i = hit(e.clientX, e.clientY, false);
      if (i < 0) return;
      canvas.setPointerCapture(e.pointerId);
      begin(i, e.clientX, e.clientY);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (st.drag >= 0) {
        if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) st.moved = true;
        if (st.moved) moveNode(st.drag, e.clientX, e.clientY);
        return;
      }
      const i = hit(e.clientX, e.clientY, false);
      if (i !== st.hover) {
        st.hover = i;
        canvas.style.cursor = i >= 0 ? "pointer" : "default";
        schedule();
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const dragged = st.moved;
      const i = st.drag;
      end();
      if (i >= 0 && !dragged) select(st.selected === i ? -1 : i);
    };
    const onLeave = () => {
      if (st.hover !== -1) {
        st.hover = -1;
        schedule();
      }
    };
    const onClick = (e: MouseEvent) => {
      if ((e as PointerEvent).pointerType === "touch" || e.detail === 0) return;
      if (hit(e.clientX, e.clientY, false) < 0 && st.selected >= 0) select(-1);
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", end);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", end);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleGroup(id: GroupId) {
    const next = group === id ? null : id;
    stateRef.current.group = next;
    stateRef.current.selected = -1;
    setSelected(-1);
    setGroup(next);
    schedule();
  }

  const node = selected >= 0 ? graphRef.current?.nodes[selected] : undefined;
  const count = selected >= 0 ? (neighbors.get(selected)?.size ?? 0) : 0;
  const order: GroupId[] = ["system", "work", "personal", "career", "reflect", "ai", "daily"];

  return (
    <div>
      <ul
        aria-label={c.filter}
        className="mb-3 flex flex-wrap gap-2"
      >
        {order.map((id) => (
          <li key={id}>
            <button
              type="button"
              aria-pressed={group === id}
              onClick={() => toggleGroup(id)}
              className={`flex min-h-11 items-center gap-2 border px-3 py-2 text-xs font-medium ${
                group === id ? "border-black bg-black text-white" : "border-default"
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5"
                style={{ background: GROUPS[id].color }}
              />
              {GROUPS[id].name[l]}
            </button>
          </li>
        ))}
      </ul>
      <div
        ref={wrapRef}
        className="relative overflow-hidden border border-default bg-white"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={c.alt}
          className="block w-full"
          style={{ height: 420, touchAction: "pan-y" }}
        />
        <p className="border-t border-default px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
          {c.hint}
        </p>
      </div>
      <div
        aria-live="polite"
        className="mt-3 min-h-[7.5rem] border border-default bg-surface p-4"
      >
        {node ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5"
                style={{ background: GROUPS[node.group].color }}
              />
              <h3 className="font-semibold">{KINDS[node.kind].name[l]}</h3>
              <span className="font-mono text-[11px] text-muted">
                {GROUPS[node.group].name[l]} · {count} {count === 1 ? c.link : c.links}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{KINDS[node.kind].desc[l]}</p>
          </>
        ) : group ? (
          <>
            <h3 className="font-semibold">{GROUPS[group].name[l]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{GROUPS[group].desc[l]}</p>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted">{c.intro}</p>
        )}
      </div>
    </div>
  );
}
