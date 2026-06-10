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
        { value: "500+", label: "critical incidents resolved" },
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
      achievements: "ACHIEVEMENTS",
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
        {
          label: "AI-augmented",
          value: "AI in every stage",
          note: "I use AI across the entire QA cycle: generating test cases from requirements, analyzing logs for bug triage, automating documentation, and building internal tools. NinaFlow Generator came from this — AI as a capacity multiplier, not a buzzword.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "QA Metrics Dashboard",
        description:
          "QA metrics lived in outdated spreadsheets. Built from scratch: Streamlit + Python pulling live data from Jira via REST, processing with Pandas, rendering 12+ interactive charts in real time. The composite Quality Score defines the go/no-go for each release — used daily by the team.",
        detail: [
          "Role-based access control: 4 profiles (QA, Dev, Lead, Admin), each with different tab visibility",
          "10 tabs: Overview, QA, Dev, Governance, Product, Backlog, Clients, History, Leadership, Admin",
          "Historical tab groups real Jira data by sprint and computes trends automatically",
          "JWT authentication via internal API with cookie-based session persistence",
        ],
        snapshot: [
          { label: "Quality Score", value: "78/100", up: true },
          { label: "Fator K", value: "3.4", up: true },
          { label: "FPY", value: "82%", up: true },
          { label: "Lead Time", value: "5.2d", up: false },
          { label: "Sprints tracked", value: "9" },
          { label: "Bugs (sprint)", value: "4", up: false },
        ],
        metrics: null,
        tags: ["Python", "Streamlit", "REST API", "Pandas", "Plotly", "JWT"],
        label: "LIVE TOOL",
        link: null,
        featured: true,
      },
      {
        id: "ninaflow",
        title: "Flow CLI Generator",
        description:
          "Node-by-node chatbot flow configuration took 30–60 minutes. Flow CLI Generator solves it: describe the flow in natural language, the CLI outputs the JSON ready to import. No templates, no manual configuration.",
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
        id: "api-postman",
        title: "API Test Suite",
        description:
          "APIs reaching production with broken contracts, failed authentication, and inconsistent responses. Structured a suite covering JSON schema validation, JWT authentication, input edge cases, and cross-service integration flows. Every endpoint documented with positive, negative, and boundary scenarios — executed automatically via Newman in CI.",
        detail: [
          "Automated schema validation — any contract break is caught before deploy",
          "Auth coverage: valid, expired, malformed, and missing tokens",
          "Integration tests: flows crossing multiple services validated end-to-end",
          "Exportable collection versioned in Git — any dev can run locally",
        ],
        snapshot: null,
        metrics: ["30+ critical failures found", "100% endpoint coverage", "CI: < 3 min/run"],
        tags: ["Postman", "Newman", "JSON Schema", "JWT", "REST API", "GitHub Actions"],
        label: "API TESTING",
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
        link: "https://github.com/ggvinos/desafio-coco-bambu",
        featured: false,
      },
      {
        id: "flipboard",
        title: "Usability Analysis — Flipboard",
        description:
          "Conducted usability and black-box testing on Flipboard targeting real-use scenarios. Analysis covered navigation flows, interface consistency across platforms (web and mobile), and underlying API validation with Postman. Goal: map user journey friction before it reaches the backlog.",
        detail: [
          "15+ improvements identified and prioritized by user impact",
          "Cross-platform consistency testing: web vs. mobile vs. app",
          "Underlying API validation with Postman — data failures invisible in the UI",
          "Structured report with evidence, severity, and recommendations",
        ],
        snapshot: null,
        metrics: ["15+ improvements mapped", "Cross-platform: web + mobile + app"],
        tags: ["UX Testing", "Black Box", "Postman", "Mobile", "Usability"],
        label: "UX TESTING",
        link: null,
        featured: false,
      },
      {
        id: "kukac-kanban",
        title: "Cross-Platform Usability — Kukac Kanban",
        description:
          "Full usability and functionality evaluation of Kukac Kanban Board across web and mobile. Tested card creation, movement, and organization flows, documenting behavioral inconsistencies between platforms and bugs impacting the daily user experience.",
        detail: [
          "Web and mobile testing — divergent behaviors identified and documented",
          "UI and UX bugs prioritized by usage frequency and flow impact",
          "Structured report with screenshot evidence and fix suggestions",
          "Real journey focus: scenarios based on how users actually use it, not how devs imagined",
        ],
        snapshot: null,
        metrics: ["35% fewer reported errors after fixes", "Coverage: main flows + cross-platform"],
        tags: ["UX Testing", "Usability", "Mobile", "Web", "Bug Report"],
        label: "UX TESTING",
        link: "https://github.com/ggvinos/ggvinos-teste-pratico-kukac-Kanban-E2E",
        featured: false,
      },
      {
        id: "hub-psicologia",
        title: "Hub de Psicologia",
        description:
          "Platform connecting patients to psychologists in Florianópolis. Designed and built the landing page and system architecture from scratch — validating the product with real users before investing in full development.",
        detail: [
          "User research: interviews with psychologists to validate pain points before building",
          "Landing page built with semantic HTML and accessibility best practices",
          "Form flow tested across browsers and devices — zero broken submissions",
          "Architecture designed to scale from landing page to full booking system",
        ],
        snapshot: null,
        metrics: ["5 psychologists interviewed", "Cross-browser tested"],
        tags: ["HTML", "UX Research", "Usability", "Product"],
        label: "IN PROGRESS",
        link: "https://github.com/ggvinos/hub-psicologia",
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
        period: "Dec 2025 – present",
        description:
          "Quality engineering across a HealthTech ecosystem: NinaChat (WhatsApp/chatbot), ConfirmationCall (scheduling), NinaFlow (conversational flows), Check-in/Kiosk, Patient App and HUB. Cypress automation, real-time QA metrics via an internal dashboard, and homologation of AI-driven conversational flows. Integrations validated across 5 ERPs (Tasy, MV, Feegow, NetPacs, MKData).",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Jan 2025 – Oct 2025",
        description:
          "Volunteer QA in an agile environment. Cypress E2E + Postman API. 90% coverage, 40% fewer bugs, validation from 4 hours to 30 minutes per sprint.",
      },
      {
        company: "CTC Tech",
        role: "BackOffice Analyst",
        period: "Jun 2022 – Aug 2025",
        description:
          "Incident diagnosis and resolution in critical national systems (Ministry of Health, CNJ). 500+ incidents validated. 98% availability maintained.",
      },
      {
        company: "Freelancer",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – May 2024",
        description:
          "Wireframes, Figma prototypes, and usability testing for startups. 85% test coverage with Cypress and Appium, 20+ critical failures identified.",
      },
      {
        company: "Startup Uniceplac",
        role: "Front-End Developer",
        period: "Jan 2020 – Jan 2022",
        description:
          "Front-end development and UX/UI in an applied academic project. Docker infrastructure, usability testing that reduced inconsistencies by 30%.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4th place",
        description:
          "Built a smart scheduling solution for Caixa Econômica Federal's Sandbox, integrating IBM watsonx tools with conversational AI agents and UX-first flows. Competed against teams from all over Brazil — ranked 4th overall.",
      },
      {
        title: "Education",
        result: "B.Sc. Software Engineering",
        description: "Centro Universitário UNICEPLAC, Brasília/DF (2020–2024). Emphasis on software development and UX design. Final project applied in an academic startup — recognized by the institution.",
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
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira", "ITIL 4"],
      Methodologies: [
        "E2E Testing",
        "API Testing",
        "Integration Testing",
        "UX Testing",
        "Exploratory Testing",
        "Regression Testing",
        "Performance Testing",
        "AI-augmented QA",
        "JSON Schema Validation",
        "Contract Testing",
      ],
    },
    contact: {
      headline: "Open to remote opportunities — full-time or freelance.",
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
        { value: "500+", label: "incidentes críticos resolvidos" },
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
      achievements: "CONQUISTAS",
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
        {
          label: "AI-augmented",
          value: "IA em todo o processo",
          note: "Uso IA em praticamente todo o ciclo de QA: geração de casos de teste a partir de requisitos, análise de logs para triagem de bugs, automação de documentação e criação de ferramentas internas. O NinaFlow Generator nasceu disso — IA como multiplicador de capacidade, não como buzzword.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "QA Metrics Dashboard",
        description:
          "Métricas de qualidade viviam em planilhas desatualizadas. Construí do zero: Streamlit + Python consumindo o Jira via REST, processando com Pandas, exibindo 12+ gráficos em tempo real. O Quality Score composto define o go/no-go de cada release — usado diariamente pelo time.",
        detail: [
          "4 perfis de acesso com visibilidade distinta: cada colaborador vê só o que precisa",
          "10 abas cobrindo todo o ciclo: qualidade, backlog, clientes, histórico e painel de liderança",
          "Tendências por sprint calculadas automaticamente — sem planilha, sem esforço manual",
          "Autenticação JWT integrada à API interna, sessão persistida em cookie",
        ],
        snapshot: [
          { label: "Quality Score", value: "78/100", up: true },
          { label: "Fator K", value: "3.4", up: true },
          { label: "FPY", value: "82%", up: true },
          { label: "Lead Time", value: "5.2d", up: false },
          { label: "Sprints", value: "9" },
          { label: "Bugs (sprint)", value: "4", up: false },
        ],
        metrics: null,
        tags: ["Python", "Streamlit", "REST API", "Pandas", "Plotly", "JWT"],
        label: "LIVE TOOL",
        link: null,
        featured: true,
      },
      {
        id: "ninaflow",
        title: "Flow CLI Generator",
        description:
          "Configurar um fluxo de chatbot nó por nó levava 30–60 minutos. O Flow CLI Generator resolve: descreva o fluxo em linguagem natural, a CLI gera o JSON pronto para importar. Sem template, sem configuração manual.",
        detail: [
          "IDs aleatórios, accountId injetado automaticamente — pronto para produção sem ajustes",
          "Suporta fluxos complexos: branches condicionais, chamadas de API e diálogos multi-turno",
          "Valida o schema antes de salvar — zero imports inválidos",
          "Após a geração, funciona offline — sem dependência contínua da API",
        ],
        snapshot: null,
        metrics: ["30–60 min/fluxo economizados", "Schema validado na saída", "CLI-first"],
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
        id: "api-postman",
        title: "API Test Suite",
        description:
          "APIs mal testadas chegam em produção com contratos quebrados, autenticações falhas e respostas inconsistentes. Estruturei uma suite cobrindo validação de schema JSON, autenticação JWT, edge cases de entrada e fluxos de integração entre serviços. Cada endpoint documentado com cenários positivos, negativos e condições de borda — executados automaticamente via Newman no CI.",
        detail: [
          "Schema validation automatizado — qualquer quebra de contrato é capturada antes do deploy",
          "Cobertura de autenticação: tokens válidos, expirados, mal-formados e ausentes",
          "Testes de integração: fluxos que cruzam múltiplos serviços validados de ponta a ponta",
          "Collection exportável e versionada no Git — qualquer dev pode rodar localmente",
        ],
        snapshot: null,
        metrics: ["30+ falhas críticas identificadas", "100% dos endpoints cobertos", "CI: < 3 min/run"],
        tags: ["Postman", "Newman", "JSON Schema", "JWT", "REST API", "GitHub Actions"],
        label: "API TESTING",
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
        link: "https://github.com/ggvinos/desafio-coco-bambu",
        featured: false,
      },
      {
        id: "flipboard",
        title: "Análise de Usabilidade — Flipboard",
        description:
          "Conduzi testes de usabilidade e caixa-preta no Flipboard com foco em cenários reais de uso. A análise cobriu fluxos de navegação, consistência de interface entre plataformas (web e mobile) e validação de APIs subjacentes com Postman. O objetivo foi ir além de encontrar bugs — mapear fricções na jornada do usuário antes que chegassem ao backlog.",
        detail: [
          "15+ melhorias identificadas e priorizadas por impacto no usuário",
          "Testes de consistência multiplataforma: web vs. mobile vs. app",
          "Validação de APIs subjacentes com Postman — falhas de dados invisíveis na UI",
          "Relatório estruturado com evidências, severidade e recomendações",
        ],
        snapshot: null,
        metrics: ["15+ melhorias mapeadas", "Cobertura: web + mobile + app"],
        tags: ["UX Testing", "Black Box", "Postman", "Mobile", "Usability"],
        label: "UX TESTING",
        link: null,
        featured: false,
      },
      {
        id: "kukac-kanban",
        title: "Testes Multiplataforma — Kukac Kanban",
        description:
          "Avaliação completa de usabilidade e funcionalidade do Kukac Kanban Board, cobrindo web e mobile. Testei fluxos de criação, movimentação e organização de cards, documentando inconsistências de comportamento entre plataformas e bugs que afetavam a experiência diária do usuário.",
        detail: [
          "Testes em web e mobile — comportamentos divergentes identificados e documentados",
          "Bugs de UI e UX priorizados por frequência de uso e impacto no fluxo",
          "Relatório estruturado com print de evidências e sugestões de correção",
          "Foco na jornada real: cenários baseados em como o usuário usa, não como o dev imaginou",
        ],
        snapshot: null,
        metrics: ["35% redução em erros reportados após correções", "Cobertura: fluxos principais + multiplataforma"],
        tags: ["UX Testing", "Usability", "Mobile", "Web", "Bug Report"],
        label: "UX TESTING",
        link: "https://github.com/ggvinos/ggvinos-teste-pratico-kukac-Kanban-E2E",
        featured: false,
      },
      {
        id: "hub-psicologia",
        title: "Hub de Psicologia",
        description:
          "Plataforma conectando pacientes a psicólogos da Grande Florianópolis. Desenvolvi a landing page e a arquitetura do sistema do zero — validando o produto com usuários reais antes de investir no desenvolvimento completo.",
        detail: [
          "Pesquisa com usuários: entrevistas com psicólogos para validar dores antes de construir",
          "Landing page com HTML semântico e boas práticas de acessibilidade",
          "Fluxo de formulário testado em múltiplos browsers e dispositivos",
          "Arquitetura projetada para escalar de landing page para sistema completo de agendamento",
        ],
        snapshot: null,
        metrics: ["5 psicólogos entrevistados", "Testado cross-browser"],
        tags: ["HTML", "UX Research", "Usabilidade", "Produto"],
        label: "EM DESENVOLVIMENTO",
        link: "https://github.com/ggvinos/hub-psicologia",
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
          "Engenharia de qualidade em ecossistema HealthTech: NinaChat (WhatsApp/chatbot), ConfirmationCall (agendamentos), NinaFlow (fluxos conversacionais), Check-in/Totem, App Paciente e HUB. Automação Cypress, métricas de QA em tempo real via dashboard interno e homologação de fluxos conversacionais com IA. Integrações validadas em 5 ERPs (Tasy, MV, Feegow, NetPacs, MKData).",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Jan 2025 – Out 2025",
        description:
          "QA voluntário em ambiente ágil. Cypress E2E + Postman API. 90% de cobertura, 40% menos bugs, validação de 30 minutos por sprint (antes: 4 horas).",
      },
      {
        company: "CTC Tech",
        role: "BackOffice Analyst",
        period: "Jun 2022 – Ago 2025",
        description:
          "Diagnóstico e resolução de incidentes em sistemas críticos nacionais (Ministério da Saúde, CNJ). 500+ incidentes validados. 98% de disponibilidade mantida.",
      },
      {
        company: "Freelancer",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – Mai 2024",
        description:
          "Wireframes, protótipos em Figma e testes de usabilidade para startups. 85% de cobertura com Cypress e Appium, 20+ falhas críticas identificadas.",
      },
      {
        company: "Startup Uniceplac",
        role: "Front-End Developer",
        period: "Jan 2020 – Jan 2022",
        description:
          "Desenvolvimento front-end e UX/UI em projeto acadêmico aplicado. Infraestrutura com Docker, testes de usabilidade que reduziram inconsistências em 30%.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4º lugar",
        description:
          "Solução de agendamento inteligente para o Sandbox da Caixa Econômica Federal, integrando ferramentas IBM (watsonx) com agentes de IA conversacional e fluxos orientados a UX. Competição com equipes de todo o Brasil — 4º lugar geral.",
      },
      {
        title: "Formação",
        result: "Bacharelado em Eng. de Software",
        description: "Centro Universitário UNICEPLAC, Brasília/DF (2020–2024). Ênfase em desenvolvimento de software e UX design. Projeto de conclusão aplicado em startup acadêmica — reconhecido pela instituição.",
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
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira", "ITIL 4"],
      Methodologies: [
        "Testes E2E",
        "Testes de API",
        "Testes de Integração",
        "UX Testing",
        "Testes Exploratórios",
        "Testes de Regressão",
        "Testes de Performance",
        "AI-augmented QA",
        "JSON Schema Validation",
        "Contract Testing",
      ],
    },
    contact: {
      headline: "Disponível para oportunidades remotas — CLT ou freelance.",
    },
    footer: {
      copy: "© 2026 Vinicios Ferreira",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
