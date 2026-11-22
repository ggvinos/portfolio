import { writeFileSync } from "node:fs";
import { GROUPS, bounds, settledGraph, type Lang } from "../lib/brainGraph.ts";

function mix(hex: string, target: string, p: number) {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(target.slice(1), 16);
  const ch = (sh: number) =>
    Math.round(((a >> sh) & 255) * (1 - p) + ((b >> sh) & 255) * p);
  return "#" + [16, 8, 0].map((sh) => ch(sh).toString(16).padStart(2, "0")).join("");
}

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
  const gradients = (Object.keys(GROUPS) as (keyof typeof GROUPS)[])
    .map((k) => {
      const c = GROUPS[k].color;
      return `<radialGradient id="g-${k}" cx="35%" cy="32%" r="75%"><stop offset="0" stop-color="${mix(c, "#ffffff", 0.6)}"/><stop offset="0.55" stop-color="${c}"/><stop offset="1" stop-color="${mix(c, "#000000", 0.4)}"/></radialGradient>`;
    })
    .join("");
  out.push(`<defs><pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><rect x="15.5" y="15.5" width="1" height="1" fill="#0d0d0d" fill-opacity="0.13"/></pattern>${gradients}<radialGradient id="orb" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.3" stop-color="#e6e6e6"/><stop offset="0.7" stop-color="#9a9a9a"/><stop offset="1" stop-color="#4a4a4a"/></radialGradient><filter id="blur18" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18"/></filter><filter id="blur10" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter><filter id="sh" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.3"/></filter><filter id="shs" x="-80%" y="-80%" width="260%" height="260%"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/></filter></defs>`);
  out.push(`<rect width="${W}" height="${H}" fill="#ffffff"/><rect width="${W}" height="${H}" fill="url(#dots)"/>`);
  out.push(`<circle cx="${W / 2}" cy="${H / 2}" r="${(H * 0.46).toFixed(0)}" fill="none" stroke="#000" stroke-opacity="0.07"/>`);
  out.push(`<circle cx="${W / 2}" cy="${H / 2}" r="${(H * 0.72).toFixed(0)}" fill="none" stroke="#000" stroke-opacity="0.06"/>`);
  out.push(`<circle cx="1010" cy="70" r="150" fill="url(#orb)" opacity="0.5" filter="url(#blur18)"/>`);
  out.push(`<circle cx="130" cy="700" r="95" fill="url(#orb)" opacity="0.45" filter="url(#blur10)"/>`);
  for (const l of g.links) {
    const a = g.nodes[l.a];
    const c = g.nodes[l.b];
    out.push(`<line x1="${px(a.x)}" y1="${py(a.y)}" x2="${px(c.x)}" y2="${py(c.y)}" stroke="#0d0d0d" stroke-opacity="0.2" stroke-width="1"/>`);
  }
  for (const n of g.nodes) {
    const color = GROUPS[n.group].color;
    if (n.hub) {
      const r = n.r * 1.4;
      out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${(r + 4.5).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.2"/>`);
      out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${r.toFixed(1)}" fill="url(#g-${n.group})" filter="url(#sh)"/>`);
    } else {
      out.push(`<circle cx="${px(n.x)}" cy="${py(n.y)}" r="${(n.r * 1.25).toFixed(1)}" fill="${color}" filter="url(#shs)"/>`);
    }
  }
  for (const n of g.nodes) {
    if (!n.hub || !n.label) continue;
    const size = n.id === "home" ? 17 : n.r >= 7 ? 15 : 13;
    const y = Number(py(n.y)) + n.r * 1.4 + size + 9;
    out.push(`<text x="${px(n.x)}" y="${y.toFixed(1)}" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="${size}" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#0d0d0d" stroke="#ffffff" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${n.label[lang].toUpperCase()}</text>`);
  }
  out.push("</svg>");
  return out.join("");
}

for (const lang of ["pt", "en"] as const) {
  writeFileSync(`public/images/portfolio/second-brain-graph-${lang}.svg`, render(lang));
}
console.log("ok");
