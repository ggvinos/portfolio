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
  out.push(`<defs><pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><rect x="15.5" y="15.5" width="1" height="1" fill="#0d0d0d" fill-opacity="0.13"/></pattern></defs>`);
  out.push(`<rect width="${W}" height="${H}" fill="#ffffff"/><rect width="${W}" height="${H}" fill="url(#dots)"/>`);
  for (const l of g.links) {
    const a = g.nodes[l.a];
    const c = g.nodes[l.b];
    out.push(`<line x1="${px(a.x)}" y1="${py(a.y)}" x2="${px(c.x)}" y2="${py(c.y)}" stroke="#0d0d0d" stroke-opacity="0.2" stroke-width="1"/>`);
  }
  for (const n of g.nodes) {
    const color = GROUPS[n.group].color;
    if (n.hub) {
      const side = n.r * 2.3;
      out.push(`<rect x="${(Number(px(n.x)) - side / 2).toFixed(1)}" y="${(Number(py(n.y)) - side / 2).toFixed(1)}" width="${side.toFixed(1)}" height="${side.toFixed(1)}" fill="${color}"/>`);
    } else {
      out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${(n.r * 1.25).toFixed(1)}" fill="${color}"/>`);
    }
  }
  for (const n of g.nodes) {
    if (!n.hub || !n.label) continue;
    const size = n.id === "home" ? 17 : n.r >= 7 ? 15 : 13;
    const y = Number(py(n.y)) + n.r * 1.15 + size + 6;
    out.push(`<text x="${px(n.x)}" y="${y.toFixed(1)}" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="${size}" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#0d0d0d" stroke="#ffffff" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${n.label[lang].toUpperCase()}</text>`);
  }
  out.push("</svg>");
  return out.join("");
}

for (const lang of ["pt", "en"] as const) {
  writeFileSync(`public/images/portfolio/second-brain-graph-${lang}.svg`, render(lang));
}
console.log("ok");
