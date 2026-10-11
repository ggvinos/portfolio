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

- A lua deve preservar exatamente a coreografia do commit `132a143`: textura com backgroundPositionX 0% → -140% via useSpring (60/20/0.6), progresso do container Hero + Sobre inteiro, trajetória linear, escala 0.28, entrada 2.2s + 1.1s e saída natural por sticky. Não substituir o giro por uma translação curta nem vincular o giro ao progresso de chegada ao Sobre. Otimizações devem atuar nas medições e na execução, sem mudar o movimento.
- Meteoros em `HeroAtmosphere` usam translação antes de rotação para alinhar deslocamento e rastro. Pausar animações fora da abertura e em abas ocultas.
