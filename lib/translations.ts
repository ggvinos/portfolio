export type Lang = "en" | "pt";

export const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      writing: "Writing",
      contact: "Contact",
    },
    hero: {
      label: "// software engineer in test",
      name: "VINICIOS FERREIRA",
      subtitle: "Software Engineer in Test · Builder · 6+ years in tech",
      tagline: "QA who automates, measures, and delivers what the team doesn't have yet.",
      metrics: [
        { value: "20 → 2 min", label: "validation time per deploy" },
        { value: "47 bugs", label: "caught before production" },
        { value: "40%", label: "fewer regressions" },
        { value: "2", label: "tools in production" },
      ],
      cta_primary: "View Projects",
      cta_secondary: "Contact",
    },
    sections: {
      about: "ABOUT",
      projects: "PROJECTS",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      writing: "WRITING",
      contact: "CONTACT",
      personal: "SIDE PROJECTS",
    },
    about: {
      bio: "QA focused on automation, coverage, and the metrics that turn instinct into decisions. Background in front-end dev and UX design — it changes how I read a spec, where I look for defects, and how I translate quality to the business. Beyond testing, I build the tools the team doesn't have yet.",
      differentials: [
        {
          label: "Cross-domain",
          value: "Dev → UX → QA",
          note: "Dev → UX → Support → QA. Each layer added a different lens: user flow, system architecture, business process. I can think in all three simultaneously.",
        },
        {
          label: "Builder",
          value: "2 tools shipped",
          note: "Two tools in production: NinaDash, which turns Jira data into a go/no-go criterion per release, and NinaFlow Generator, a CLI that eliminates 60 minutes of manual configuration. I build because it's faster than waiting.",
        },
        {
          label: "User-first",
          value: "UX background",
          note: "Five years in UX taught me to think about the journey before writing the scenario. Usability bugs show up in wireframes — not in the backlog.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "NinaDash",
        description:
          "QA metrics lived in outdated spreadsheets. Built from scratch: Streamlit + Python pulling live data from Jira via REST, processing with Pandas, rendering 12+ interactive charts in real time. The composite Health Score defines the go/no-go for each release — used daily by the team.",
        detail: [
          "Role-based access control: 4 profiles (QA, Dev, Lead, Admin), each with different tab visibility",
          "10 tabs: Overview, QA, Dev, Governance, Product, Backlog, Clients, History, Leadership, Admin",
          "Historical tab groups real Jira data by sprint and computes trends automatically",
          "JWT authentication via internal API with cookie-based session persistence",
        ],
        snapshot: [
          { label: "Health Score", value: "78/100", up: true },
          { label: "Fator K", value: "3.4", up: true },
          { label: "FPY", value: "82%", up: true },
          { label: "Lead Time", value: "5.2d", up: false },
          { label: "Sprints tracked", value: "9" },
          { label: "Bugs (sprint)", value: "4", up: false },
        ],
        metrics: null,
        tags: ["Python", "Streamlit", "Jira API", "Pandas", "Plotly", "JWT"],
        label: "LIVE",
        link: "https://ninadash.streamlit.app/",
        featured: true,
      },
      {
        id: "ninaflow",
        title: "NinaFlow Generator",
        description:
          "Node-by-node chatbot flow configuration took 30–60 minutes. NinaFlow Generator solves it: describe the flow in natural language, the CLI outputs the JSON ready to import. No templates, no manual configuration.",
        detail: [
          "Generates flows with random stable IDs, no template variables, accountId injection",
          "Supports conditional branches, API call nodes, and multi-turn dialogues",
          "Validates output schema before writing to disk",
          "Runs offline after initial Claude API call",
        ],
        snapshot: null,
        metrics: ["30–60 min/flow saved", "JSON schema validated", "CLI-first"],
        tags: ["Python", "Claude API", "CLI", "JSON Schema"],
        label: "INTERNAL TOOL",
        link: null,
        featured: false,
      },
      {
        id: "cypress-e2e",
        title: "Cypress E2E Automation",
        description:
          "Manual validation took 20 minutes per deploy. The E2E suite cut it to 2 minutes, runs on CI at every push, and caught 47 bugs before they reached production.",
        detail: null,
        snapshot: null,
        metrics: ["85% E2E coverage", "47 bugs caught pre-prod", "CI run: 4 min"],
        tags: ["Cypress", "JavaScript", "GitHub Actions", "CI"],
        label: null,
        link: null,
        featured: false,
      },
      {
        id: "crud-api",
        title: "CRUD API Test Suite",
        description:
          "120 cases covering all CRUD operations of a critical system — happy paths, edge cases, and integration failures. Result: 40% fewer regressions and 30% faster deploy cycles.",
        detail: null,
        snapshot: null,
        metrics: ["120 test cases", "40% fewer regressions", "30% faster deploys"],
        tags: ["Cypress", "Postman", "API Testing"],
        label: null,
        link: null,
        featured: false,
      },
    ],
    personal: [
      {
        id: "vinos-art",
        title: "vinos.art",
        description:
          "Digital collages with retrofuturism aesthetics. Explores nostalgia, technology and analog textures.",
        platform: "Instagram",
        link: "https://www.instagram.com/vinos.art/",
      },
      {
        id: "vini-moto",
        title: "vini.moto",
        description:
          "Custom motorcycle builds, mods and street rides. Documenting the process of turning stock into something personal.",
        platform: "TikTok",
        link: "https://www.tiktok.com/@vini.moto",
      },
      {
        id: "vini-ctrl",
        title: "vini.ctrl",
        description:
          "PC setups, peripherals and tech content. Desk tours, builds and the tools I use to stay productive.",
        platform: "TikTok",
        link: "https://www.tiktok.com/@vini.ctrl",
      },
    ],
    experience: [
      {
        company: "Nina Tecnologia",
        role: "QA Engineer",
        period: "Dez 2025 – present",
        description:
          "Building QA processes, metrics tooling, and test automation for a SaaS chatbot platform. Created NinaDash and NinaFlow Generator.",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Jan 2025 – Ago 2025",
        description:
          "Quality assurance in an agile product team. Test planning, bug tracking, and functional validation.",
      },
      {
        company: "CTC Tech",
        role: "BackOffice Analyst",
        period: "Jun 2022 – Ago 2025",
        description:
          "Operational analysis and process support. Deep product knowledge that later grounded QA work.",
      },
      {
        company: "Freelancer",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – Mai 2024",
        description:
          "UX research, usability testing, wireframing and interface design for digital products.",
      },
      {
        company: "Startup Uniceplac",
        role: "Front-End Developer",
        period: "Jan 2020 – Jan 2022",
        description:
          "Front-end development during undergraduate studies. First contact with digital product thinking.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4th place",
        description:
          "4th place with a solution for the CAIXA Sandbox using IBM tools, focusing on user experience and AI agents.",
      },
      {
        title: "Education",
        result: "B.Sc. Software Engineering",
        description: "Centro Universitário UNICEPLAC",
      },
    ],
    articles: [
      {
        title: "UX & QA: Two Sides of the Same Coin",
        platform: "Medium",
        link: "https://medium.com/@viniciosferreira.ti/ux-e-qa-duas-faces-da-mesma-moeda-bf73e0ae1743",
      },
      {
        title: "Cypress: The Simple and Robust E2E Testing Tool",
        platform: "LinkedIn",
        link: "https://www.linkedin.com/pulse/cypress-ferramenta-de-testes-e2e-simples-e-robusta-vin%C3%ADcios-ferreira-7psff/",
      },
      {
        title: "QA: The Importance of Quality Assurance",
        platform: "Notion",
        link: "https://invincible-calf-ba5.notion.site/Explorando-QA-1848ddfe411c8084a795cfe737e5962e",
      },
    ],
    skills: {
      Testing: ["Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest"],
      Languages: ["Python", "JavaScript", "TypeScript"],
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira"],
      Methodologies: [
        "E2E Testing",
        "API Testing",
        "Exploratory Testing",
        "UX Testing",
        "Regression Testing",
        "Performance Testing",
      ],
    },
    contact: {
      headline: "Let's work together.",
    },
    footer: {
      copy: "© 2026 Vinicios Ferreira",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      experience: "Experiência",
      skills: "Skills",
      writing: "Artigos",
      contact: "Contato",
    },
    hero: {
      label: "// software engineer in test",
      name: "VINICIOS FERREIRA",
      subtitle: "Software Engineer in Test · Builder · 6+ anos em tecnologia",
      tagline: "QA que automatiza, mede e entrega o que o time ainda não tem.",
      metrics: [
        { value: "20 → 2 min", label: "tempo de validação por deploy" },
        { value: "47 bugs", label: "capturados antes da produção" },
        { value: "40%", label: "menos regressões" },
        { value: "2", label: "ferramentas em produção" },
      ],
      cta_primary: "Ver Projetos",
      cta_secondary: "Contato",
    },
    sections: {
      about: "SOBRE",
      projects: "PROJETOS",
      experience: "EXPERIÊNCIA",
      skills: "SKILLS",
      writing: "ARTIGOS",
      contact: "CONTATO",
      personal: "PROJETOS PESSOAIS",
    },
    about: {
      bio: "QA com foco em automação, cobertura e nas métricas que transformam instinto em decisão. Background em dev front-end e UX design — muda como leio uma spec, onde procuro falhas e como traduzo qualidade para o negócio. Além de testar, construo as ferramentas que o time ainda não tem.",
      differentials: [
        {
          label: "Multidisciplinar",
          value: "Dev → UX → QA",
          note: "Dev → UX → Suporte → QA. Cada camada adicionou uma perspectiva diferente: fluxo do usuário, arquitetura do sistema, processo de negócio. Consigo pensar nos três ao mesmo tempo.",
        },
        {
          label: "Builder",
          value: "2 ferramentas em produção",
          note: "Dois projetos em produção: NinaDash, que transforma dados do Jira em critério de go/no-go por release, e NinaFlow Generator, CLI que elimina 60 minutos de configuração manual. Construo porque é mais rápido que esperar.",
        },
        {
          label: "User-first",
          value: "Background em UX",
          note: "Cinco anos de UX ensinaram a pensar na jornada antes de escrever o cenário. Bugs de usabilidade aparecem nos wireframes — não no backlog.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "NinaDash",
        description:
          "Métricas de qualidade viviam em planilhas desatualizadas. Construí do zero: Streamlit + Python consumindo o Jira via REST, processando com Pandas, exibindo 12+ gráficos em tempo real. O Health Score composto define o go/no-go de cada release — usado diariamente pelo time.",
        detail: [
          "4 perfis de acesso com visibilidade distinta: cada colaborador vê só o que precisa",
          "10 abas cobrindo todo o ciclo: qualidade, backlog, clientes, histórico e painel de liderança",
          "Tendências por sprint calculadas automaticamente — sem planilha, sem esforço manual",
          "Autenticação JWT integrada à API interna, sessão persistida em cookie",
        ],
        snapshot: [
          { label: "Health Score", value: "78/100", up: true },
          { label: "Fator K", value: "3.4", up: true },
          { label: "FPY", value: "82%", up: true },
          { label: "Lead Time", value: "5.2d", up: false },
          { label: "Sprints", value: "9" },
          { label: "Bugs (sprint)", value: "4", up: false },
        ],
        metrics: null,
        tags: ["Python", "Streamlit", "Jira API", "Pandas", "Plotly", "JWT"],
        label: "LIVE",
        link: "https://ninadash.streamlit.app/",
        featured: true,
      },
      {
        id: "ninaflow",
        title: "NinaFlow Generator",
        description:
          "Configurar um fluxo de chatbot nó por nó levava 30–60 minutos. O NinaFlow Generator resolve: descreva o fluxo em linguagem natural, a CLI gera o JSON pronto para importar. Sem template, sem configuração manual.",
        detail: [
          "IDs aleatórios, accountId injetado automaticamente — pronto para produção sem ajustes",
          "Suporta fluxos complexos: branches condicionais, chamadas de API e diálogos multi-turno",
          "Valida o schema antes de salvar — zero imports inválidos",
          "Após a geração, funciona offline — sem dependência contínua da API",
        ],
        snapshot: null,
        metrics: ["30-60 min/fluxo economizados", "Schema validado na saída", "CLI-first"],
        tags: ["Python", "Claude API", "CLI", "JSON Schema"],
        label: "FERRAMENTA INTERNA",
        link: null,
        featured: false,
      },
      {
        id: "cypress-e2e",
        title: "Cypress E2E Automation",
        description:
          "Validação manual levava 20 minutos por deploy. A suite E2E reduziu para 2 minutos, roda no CI a cada push e capturou 47 bugs antes de chegarem em produção.",
        detail: null,
        snapshot: null,
        metrics: ["85% cobertura E2E", "47 bugs pré-prod", "CI: 4 min/run"],
        tags: ["Cypress", "JavaScript", "GitHub Actions", "CI"],
        label: null,
        link: null,
        featured: false,
      },
      {
        id: "crud-api",
        title: "CRUD API Test Suite",
        description:
          "120 casos cobrindo todas as operações CRUD de um sistema crítico — happy paths, edge cases e falhas de integração. Resultado: 40% menos regressões e ciclo de deploy 30% mais rápido.",
        detail: null,
        snapshot: null,
        metrics: ["120 casos de teste", "40% menos regressões", "30% deploys mais rápidos"],
        tags: ["Cypress", "Postman", "API Testing"],
        label: null,
        link: null,
        featured: false,
      },
    ],
    personal: [
      {
        id: "vinos-art",
        title: "vinos.art",
        description:
          "Colagens digitais com estética retrofuturista. Nostalgia, tecnologia e texturas analógicas num mesmo frame.",
        platform: "Instagram",
        link: "https://www.instagram.com/vinos.art/",
      },
      {
        id: "vini-moto",
        title: "vini.moto",
        description:
          "Motos customizadas, mods e street. Documentando o processo de transformar o padrão em algo com identidade.",
        platform: "TikTok",
        link: "https://www.tiktok.com/@vini.moto",
      },
      {
        id: "vini-ctrl",
        title: "vini.ctrl",
        description:
          "Setup de PC, periféricos e produtividade. O lado offline de quem passa o dia em terminal.",
        platform: "TikTok",
        link: "https://www.tiktok.com/@vini.ctrl",
      },
    ],
    experience: [
      {
        company: "Nina Tecnologia",
        role: "QA Engineer",
        period: "Dez 2025 – presente",
        description:
          "Implantei a área de qualidade do zero. Criei o NinaDash e o NinaFlow Generator — ambos em produção. Automação, cobertura de testes e métricas de qualidade para plataforma SaaS de chatbot.",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Jan 2025 – Ago 2025",
        description:
          "Primeiro contato com QA em produto real: definição de critérios de aceite, planejamento de testes e rastreamento de bugs em ciclos curtos de entrega.",
      },
      {
        company: "CTC Tech",
        role: "BackOffice Analyst",
        period: "Jun 2022 – Ago 2025",
        description:
          "Três anos em suporte técnico e análise operacional deram um entendimento granular de produto que nenhum curso dá. Esse contexto aparece na qualidade dos meus casos de teste.",
      },
      {
        company: "Freelancer",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – Mai 2024",
        description:
          "Pesquisa com usuários, testes de usabilidade e design de produto. Esse período definiu minha forma de pensar qualidade: o defeito mais grave nem sempre é técnico.",
      },
      {
        company: "Startup Uniceplac",
        role: "Front-End Developer",
        period: "Jan 2020 – Jan 2022",
        description:
          "Desenvolvimento front-end durante a graduação. Primeiro contato com o ciclo completo de um produto digital — da ideia ao deploy.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4º lugar",
        description:
          "Solução para o Sandbox CAIXA usando ferramentas IBM, com foco em UX e agentes de IA. Competição com equipes de todo o Brasil.",
      },
      {
        title: "Formação",
        result: "Bacharelado em Eng. de Software",
        description: "Centro Universitário UNICEPLAC",
      },
    ],
    articles: [
      {
        title: "UX e QA: Duas Faces da Mesma Moeda",
        platform: "Medium",
        link: "https://medium.com/@viniciosferreira.ti/ux-e-qa-duas-faces-da-mesma-moeda-bf73e0ae1743",
      },
      {
        title: "Cypress: A ferramenta de testes E2E simples e robusta",
        platform: "LinkedIn",
        link: "https://www.linkedin.com/pulse/cypress-ferramenta-de-testes-e2e-simples-e-robusta-vin%C3%ADcios-ferreira-7psff/",
      },
      {
        title: "QA: A Importância da Garantia de Qualidade",
        platform: "Notion",
        link: "https://invincible-calf-ba5.notion.site/Explorando-QA-1848ddfe411c8084a795cfe737e5962e",
      },
    ],
    skills: {
      Testing: ["Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest"],
      Languages: ["Python", "JavaScript", "TypeScript"],
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira"],
      Methodologies: [
        "Testes E2E",
        "Testes de API",
        "Testes Exploratórios",
        "UX Testing",
        "Testes de Regressão",
        "Testes de Performance",
      ],
    },
    contact: {
      headline: "Disponível para oportunidades remotas.",
    },
    footer: {
      copy: "© 2026 Vinicios Ferreira",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
