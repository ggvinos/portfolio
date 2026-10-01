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
- **`motion`** (Framer Motion) para animação ligada ao scroll — adicionada em ago/2026 pela faixa horizontal do Acorde. Custo real medido: home foi de 118 kB para 164 kB de First Load JS. O resto do site segue em CSS puro + Canvas API; só use `motion` quando precisar de scroll-linked de verdade.

## Arquitetura

### Idioma
- **`lib/context.tsx`**: `LanguageProvider` (PT/EN toggle). Não existe `ThemeProvider` — tema único, sem toggle.
- **Idioma padrão: PT** (`useState<Lang>("pt")`)
- **`lib/translations.ts`**: todas as strings PT e EN em objeto `as const`

### Cor

O vermelho de marca (`#AF0C37`) é `colors.accent` no `tailwind.config.ts`, não uma CSS variable. `text-accent`, `border-accent`, `bg-accent` vêm do Tailwind — **nunca redefina essas classes em `globals.css`**: já foi feito por engano (uma `--accent: #f1f5f9` quase-branca colidindo com o mesmo nome de classe) e como CSS empata em especificidade por igual, a regra escrita depois ganha. O vermelho de marca ficou substituído por quase-branco em 22 lugares do site até ago/2026, sem ninguém notar porque a diferença visual era mínima (~7/255). Corrigido: `globals.css` não define mais essas três classes.

```css
--bg          fundo principal (preto puro)
--surface     fundo de card/surface
--border      borda padrão
--text        texto primário
--muted       texto secundário
--cursor-color cor do cursor customizado (neutro, não é o accent de marca)
--particle-rgb  cor das partículas
```

Classes utilitárias definidas em `globals.css`: `.bg-page`, `.bg-surface`, `.border-default`, `.text-primary`, `.text-muted`. `.text-accent` / `.border-accent` / `.bg-accent` vêm do Tailwind (ver acima).

Não existe tema claro. O texto antigo mencionando dark/light e `--hero-bg` estava desatualizado; removido.

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
| `Nav.tsx` | Nav fixa com toggle de idioma; hambúrguer abaixo de `sm` |
| `Hero.tsx` | Tela inicial: partículas canvas, glow lines, animate-title, marquee de tools, métricas, CTAs |
| `About.tsx` | Bio + 3 diferenciais (cards animados) |
| `Projects.tsx` | Grid 3 colunas (o Acorde saiu daqui, agora é `AcordeShowcase.tsx`) + seção pessoal |
| `Experience.tsx` | Timeline vertical + achievements com SpotlightCard |
| `Articles.tsx` | 3 artigos com badges de plataforma |
| `Skills.tsx` | Grid de categorias com pills |
| `Contact.tsx` | Links Email, GitHub, LinkedIn, Behance |
| `Footer.tsx` | Linha de copyright |
| `Particles.tsx` | Canvas com partículas que reagem ao mouse (portado do chronark.com) |
| `SpotlightCard.tsx` | Card com radial gradient vermelho que segue o cursor |
| `CustomCursor.tsx` | Cursor customizado: ponto + anel neutros, `--cursor-color` (lerp via rAF) |
| `TechStack.tsx` | Marquee duplo (componente legado — não está em page.tsx, o marquee ativo está dentro do Hero.tsx) |
| `CaseNav.tsx` | Nav slim das páginas de case: voltar + toggle de idioma |
| `AcordeCase.tsx` | Conteúdo do estudo de caso do Acorde (`/projetos/acorde`) |
| `PhoneShot.tsx` | Grupo de telas em moldura de celular; com mais de um src os aparelhos ficam escalonados |
| `AcordeShowcase.tsx` | Tour vertical do Acorde na home: 4 passos com lente de QA + CTA pro app |
| `ScrollProgress.tsx` | Barra fina de progresso de leitura no topo |

## Rotas

- `/` — home (page.tsx)
- `/projetos/acorde` — estudo de caso do Acorde

## Imagens do Acorde

Telas em `public/acorde/*.webp` (590×1278, 339 KB no total). Origem: `~/Documentos/acorde-carrosseis/telas/*.png` (1179×2556), convertidas com PIL para webp q82.

Para atualizar: `cd ~/Documentos/lyriclearn && npm run dev`, depois `cd ~/Documentos/acorde-carrosseis && node capturar.mjs`, e reconverter mantendo 590×1278.

**A identidade do Acorde mudou em ago/2026** (roxo → coral `#ff7a59` + serifa Fraunces, roxo `#8c30ff` só no logo). Se as telas parecerem todas roxas, estão velhas.

## Tour do Acorde (AcordeShowcase)

Portado do tour de `acorde.club/sobre` (`lyriclearn/src/pages/Sobre/Scrolly.jsx`): container alto (`total * 100dvh`) com miolo `sticky`, trilho vertical com pontos à esquerda, legenda e aparelho trocando por passo. **Foi faixa horizontal até set/2026** — virou vertical porque o scroll-jack lateral era longo demais para o papel da seção, que é mostrar trabalho de QA, não vender o produto.

Sem framer-motion: um `scroll` listener com rAF escreve `scaleY` da barra direto no style (sem re-render) e só chama `setState` quando o passo inteiro muda.

As legendas são `absolute`, e **absoluto resolve contra o padding box** — o recuo em relação ao trilho vive em cada legenda (`left-12`), nunca num `padding` do container, que seria ignorado e deixaria o texto por cima do trilho (já aconteceu).

Com `prefers-reduced-motion`, vira lista empilhada comum com fade por IntersectionObserver.

## Mobile

As duas seções com `sticky` (`ProjectStack` e `AcordeShowcase`) caem para o fallback estático **abaixo de 768px**, não só com `prefers-reduced-motion`. A media query é uma só: `(prefers-reduced-motion: no-preference) and (min-width: 768px)`.

O motivo é funcional, não estético: medido num 375×667, as 4 cartas empilhadas passavam da tela e a última perdia 242px — e como são `sticky`, esse pedaço fica **inalcançável**, não dá para rolar até ele. O tour do Acorde sobrava só 20px numa tela de 667px.

Em telas baixas de desktop (1366×768 e afins) o problema também existe, então cada carta empilhada carrega `maxHeight: calc(100dvh - ${topPx + 24}px)` com `overflow-y-auto`. O teto é calculado **por carta**, porque cada uma gruda num `top` diferente (64 + i·34). Numa tela alta a carta cabe inteira e nenhuma barra aparece — a válvula só morde quando o conteúdo ficaria escondido. Não use um `max-h` fixo tipo `60vh`: já foi feito, a barra aparecia sempre e ficou feio.

**Marquee do Hero: `w-screen` só funciona junto com `-mx-6`.** Sozinho, ele mede 100vw dentro de um container com `px-6`, o min-content do container vira `100vw + 48px` e a página ganha 48px de scroll horizontal (invisível em 375px, escancarado em 320px). Também não adianta trocar por largura relativa: tanto `self-stretch` quanto `w-[calc(100%+3rem)]` esticam para o `max-w-6xl` (1152px) mesmo num container de 375px, porque a porcentagem do item flex resolve contra o tamanho intrínseco, não contra a largura real.

Alvos de toque: mínimo de 36px de altura. O acordeão da `Experience` tinha 24px (só a altura da linha) e precisou de `py-2`.

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

- Palette inspirada no chronark.com: preto puro + slate muted + accent #AF0C37 (via tailwind.config.ts, ver seção Cor)
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
