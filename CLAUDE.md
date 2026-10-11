# Portfolio

Leia `README.md` para stack, comandos, arquitetura e validação. Este arquivo complementa a documentação para mudanças no repositório.

- Next.js 16 / React 19 / Tailwind 4 / TypeScript strict. Node 22.
- Execute `npm run lint`, `npm run build`, `npm run typecheck` e `npm run test:e2e` antes de concluir alterações de navegação ou layout.
- Dados PT/EN em `lib/translations.ts`; traduções devem preservar fatos e emissores de certificados.
- Tema único claro em preto e branco. Use as variáveis CSS de `app/globals.css` e `accent` em `tailwind.config.ts`.
- Não esconder conteúdo inicial atrás de animações ou observadores.
- O menu fechado não pode participar do foco ou da árvore de acessibilidade. Respeite teclado, Escape e movimento reduzido.
- Projetos internos não têm screenshots nem código público: os cards mostram uma visão técnica identificada e um resumo interno.
- Não inventar métricas, telas ou evidências. O EspaçoCalmo é um estudo de UX/UI em evolução; o produto publicado é o Acorde.
- Preservar os mesmos destaques e links nos cards desktop e mobile.
- Imagens locais em `public/acorde` e `public/textures`; arte do EspaçoCalmo vem do CDN público do Behance, com caminho permitido explicitamente em `next.config.mjs`.
