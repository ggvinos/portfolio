import { writeFileSync } from "node:fs";
import { GROUPS, bounds, settledGraph, type Lang } from "../lib/brainGraph.ts";

const W = 1200;
const H = 760;

function render(lang: Lang) {
  const g = settledGraph();
  const b = bounds(g.nodes);
  const pad = 70;
  const s = Math.min((W - pad * 2) / (b.maxX - b.minX), (H - pad * 2) / (b.maxY - b.minY));
  const cx = (b.minX + b.maxX) / 2;
  const cy = (b.minY + b.maxY) / 2;
  const px = (x: number) => (W / 2 + (x - cx) * s).toFixed(1);
  const py = (y: number) => (H / 2 + (y - cy) * s).toFixed(1);
  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">`);
  out.push(`<defs><radialGradient id="bg" cx="50%" cy="50%" r="75%"><stop offset="0" stop-color="#17171b"/><stop offset="1" stop-color="#09090b"/></radialGradient></defs>`);
  out.push(`<rect width="${W}" height="${H}" fill="url(#bg)"/>`);
  for (const l of g.links) {
    const a = g.nodes[l.a];
    const c = g.nodes[l.b];
    out.push(`<line x1="${px(a.x)}" y1="${py(a.y)}" x2="${px(c.x)}" y2="${py(c.y)}" stroke="#a1a1aa" stroke-opacity="0.28" stroke-width="1.2"/>`);
  }
  for (const n of g.nodes) {
    const r = (n.r * 1.9).toFixed(1);
    const color = GROUPS[n.group].color;
    if (n.hub) out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${(n.r * 1.9 + 5).toFixed(1)}" fill="${color}" fill-opacity="0.12"/>`);
    out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${r}" fill="${color}"/>`);
  }
  for (const n of g.nodes) {
    if (!n.hub || !n.label) continue;
    const size = n.id === "home" ? 21 : n.r >= 7 ? 19 : 16;
    out.push(`<text x="${px(n.x)}" y="${(Number(py(n.y)) + n.r * 1.9 + size + 3).toFixed(1)}" font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${size}" font-weight="600" text-anchor="middle" fill="#f4f4f5" stroke="#09090b" stroke-width="4" paint-order="stroke" stroke-linejoin="round">${n.label[lang]}</text>`);
  }
  out.push("</svg>");
  return out.join("");
}

for (const lang of ["pt", "en"] as const) {
  writeFileSync(`public/images/portfolio/second-brain-graph-${lang}.svg`, render(lang));
}
console.log("ok");
