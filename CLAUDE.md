# Portfolio — CLAUDE.md

Portfólio profissional de Vinicios Ferreira. Next.js 14 App Router + Tailwind CSS + TypeScript.

## Comandos

```bash
npm run dev      # dev server em localhost:3000
npm run build    # build de produção
npx tsc --noEmit # verificar tipos sem compilar
```

## Stack

- **Next.js 14** App Router (sem pages/)
- **Tailwind CSS** com tema via CSS variables (não classes zinc/gray)
- **TypeScript** strict
- **Sem bibliotecas de animação** — tudo CSS puro + Canvas API

## Arquitetura

### Tema e idioma
- **`lib/context.tsx`**: dois providers — `LanguageProvider` (PT/EN toggle) e `ThemeProvider` (dark/light)
- **Idioma padrão: PT** (`useState<Lang>("pt")`)
- Tema salvo em `localStorage`, script anti-flash no `<head>` do layout
- **`lib/translations.ts`**: todas as strings PT e EN em objeto `as const`

### CSS variables (não use classes Tailwind de cor diretamente)
```css
--bg          fundo principal
--surface     fundo de card/surface
--border      borda padrão (#27272a dark / #e4e4e7 light)
--text        texto primário
--muted       texto secundário (#71717a em ambos os temas)
--accent      vermelho #AF0C37
--hero-bg     gradiente do hero (muda com tema)
--particle-rgb  cor das partículas (muda com tema)
```

Classes utilitárias definidas em `globals.css`:
`.bg-page`, `.bg-surface`, `.border-default`, `.text-primary`, `.text-muted`, `.text-accent`, `.border-accent`, `.bg-accent`

### Animações (definidas em tailwind.config.ts + globals.css)
- `animate-fade-in` — fade de opacity 0 a 1 (1.5s)
- `animate-title` — blur 20px + letter-spacing largo, resolve em 2s (usado só no nome do hero)
- `animate-glow` — pulsa opacity 0→1→0 em loop (linhas horizontais do hero)
- `animate-marquee` / `animate-marquee-reverse` — scroll horizontal infinito
- Para delays com `animate-fade-in`, usar sempre `animationFillMode: "both"` (não "forwards" + opacity:0 inline — isso quebra)

```tsx
// padrão correto para fade com delay:
style={{ animationDelay: "0.6s", animationFillMode: "both" }}
```

## Componentes

| Componente | Responsabilidade |
|---|---|
| `Nav.tsx` | Nav fixa com toggle de tema e idioma |
| `Hero.tsx` | Tela inicial: partículas canvas, glow lines, animate-title, marquee de tools, métricas, CTAs |
| `About.tsx` | Bio + 3 diferenciais (cards animados) |
| `Projects.tsx` | Featured card (Acorde) + grid 3 colunas + seção pessoal |
| `Experience.tsx` | Timeline vertical + achievements com SpotlightCard |
| `Articles.tsx` | 3 artigos com badges de plataforma |
| `Skills.tsx` | Grid de categorias com pills |
| `Contact.tsx` | Links Email, GitHub, LinkedIn, Behance |
| `Footer.tsx` | Linha de copyright |
| `Particles.tsx` | Canvas com partículas que reagem ao mouse (portado do chronark.com) |
| `SpotlightCard.tsx` | Card com radial gradient vermelho que segue o cursor |
| `CustomCursor.tsx` | Cursor customizado: ponto vermelho + anel (lerp via rAF) |
| `TechStack.tsx` | Marquee duplo (componente legado — não está em page.tsx, o marquee ativo está dentro do Hero.tsx) |

## Hooks

- `hooks/useInView.ts` — IntersectionObserver, desconecta após primeira intersecção
- `hooks/useMousePosition.ts` — posição global do mouse (usado pelas Particles)

## Estrutura de dados (translations.ts)

Cada projeto tem:
```ts
{
  id, title, description,
  detail: string[] | null,       // bullets técnicos
  snapshot: { label, value, up? }[] | null,  // mini-dashboard (só o featured)
  metrics: string[] | null,      // badges de impacto (acento vermelho)
  tags: string[],                // tech stack (border cinza)
  label: string | null,          // "LIVE", "FERRAMENTA INTERNA" etc
  link: string | null,
  featured: boolean,
}
```

Projetos pessoais (`t.personal`):
```ts
{ id, title, description, platform, link: string | null }
```

## Decisões de design

- Palette inspirada no chronark.com: preto puro + zinc-500 muted + accent #AF0C37
- SpotlightCard sem Framer Motion — radial gradient via React state + inline style
- Partículas usam `getComputedStyle(--particle-rgb)` para trocar de cor com o tema
- Cursor desabilitado em touch devices (`@media (pointer: fine)`)
- Marquee de tools no Hero: lista duplicada + `translateX(-50%)` para loop sem salto

## O que ainda pode ser feito

- [ ] Deploy no Vercel (já está pronto para `git push` + connect no vercel.com)
- [ ] Adicionar links reais dos artigos quando publicados
- [ ] Adicionar foto/avatar opcional na seção About
- [ ] Versão mobile: revisar o Hero (marquee pode precisar de ajuste no padding)
- [ ] Página de projeto individual para o Acorde (rota `/projects/acorde`)
- [ ] OG tags / meta description para SEO
- [ ] Contador de views por projeto (feature do chronark — Upstash Redis + Vercel)

## Proprietário

- Nome: Vinicios Ferreira
- Email: viniciosferreira.ti@gmail.com
- GitHub: https://github.com/ggvinos
- LinkedIn: https://www.linkedin.com/in/ggvinos/
- Behance: https://www.behance.net/vinicios
