# Vinicios Ferreira — Portfolio

Portfólio de QA Engineer / Software Engineer in Test. Site bilíngue (PT/EN) com produto em produção, projetos de automação, ferramentas internas e estudos de UX/UI.

- Site: https://vinicios-ferreira.vercel.app
- Stack: Next.js 16 App Router, React 19, TypeScript e Tailwind CSS 4.
- Node.js: 22 ou superior.

## Desenvolvimento e validação

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm audit
```

O build usa webpack explicitamente para manter a compilação consistente entre o ambiente local e o CI. Os testes iniciam o build de produção na porta 3108 e verificam layouts de 320 a 1440 px, foco do menu, tradução, acessibilidade com axe, rotas de projetos, CV, movimento reduzido e leitura sem JavaScript. Screenshots e relatórios ficam em `test-results/` e `playwright-report/`.

O workflow `.github/workflows/quality.yml` executa as verificações em pushes e pull requests. O deploy é feito pela integração do repositório com a Vercel.

## Estrutura

- `app/page.tsx`: home.
- `app/projetos/acorde`: estudo de caso do produto publicado.
- `app/projetos/[slug]`: resumos técnicos de ferramentas internas.
- `app/opengraph-image.tsx`: imagem de compartilhamento.
- `lib/translations.ts`: textos e dados PT/EN.
- `lib/context.tsx`: idioma da interface e do documento.
- `components`: seções e componentes de apresentação.
- `tests`: regressões de navegação, conteúdo e acessibilidade.

## Conteúdo e evidências

Dashboard e Flow CLI são ferramentas internas. Os resumos mostram contexto e contribuição sem publicar dados, código ou capturas corporativas. As pequenas ilustrações dos cards são visões técnicas simplificadas, não screenshots dos sistemas.

O projeto Cypress aponta para o desafio público Coco Bambu. O EspaçoCalmo aponta para o estudo de UX/UI no Behance e está apresentado como iniciativa em evolução, sem afirmar que é um aplicativo em produção.

Resultados quantitativos só devem ser publicados com contexto de medição: período, definição da métrica, origem e participação do autor. Percentuais sem esse contexto foram substituídos por descrições técnicas. O estudo do Acorde distingue metas de resultados.

## Direção visual

Preto e branco, tipografia Inter e JetBrains Mono. A lua acompanha o scroll da abertura até um ponto ao lado do Sobre e sai com a seção. Meteoros e estrelas ficam na abertura; o conteúdo tem fundo limpo. Os cards compartilham informações e hierarquia em todos os tamanhos, sem scroll interno ou empilhamento que esconda conteúdo. O cursor é o do navegador.

A lua preserva a animação original em Motion: trajetória linear, escala final 0,28, entrada após 2,2 segundos e giro da textura de 0% a -140% sobre TODO o trecho Hero + Sobre. O giro mantém a suavização original (stiffness 60, damping 20, mass 0,6). MotionValues evitam renderização do React por frame; as medidas de layout são agrupadas, deduplicadas e atualizadas por ResizeObserver. Meteoros usam translação na direção do rastro e pausam fora da abertura ou em abas ocultas. Com movimento reduzido, a lua fica estática na abertura.

A animação de partículas pausa fora da tela, em abas ocultas e com preferência por movimento reduzido. O conteúdo é visível no HTML inicial, sem depender de IntersectionObserver para aparecer.
