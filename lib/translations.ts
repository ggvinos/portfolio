export type Lang = "en" | "pt";

export const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      writing: "Writing",
      contact: "Contact",
    },
    hero: {
      label: "// software engineer in test",
      name: "VINICIOS FERREIRA",
      subtitle: "QA Engineer · Builder · 6+ years in tech",
      tagline: "QA who automates, measures, and delivers what the team doesn't have yet.",
      metrics: [
        { value: "20 → 2 min", label: "validation time per deploy" },
        { value: "47 bugs", label: "caught before production" },
        { value: "40%", label: "fewer regressions" },
        { value: "95%", label: "delivery efficiency gain" },
      ],
      cta_primary: "View Projects",
      cta_secondary: "Contact",
    },
    sections: {
      about: "ABOUT",
      projects: "PROJECTS",
      experience: "EXPERIENCE",
      education: "Education",
      skills: "SKILLS",
      writing: "WRITING",
      contact: "CONTACT",
      personal: "SIDE PROJECTS",
      achievements: "ACHIEVEMENTS",
    },
    about: {
      bio: "QA focused on automation, coverage, and the metrics that turn instinct into decisions. Background in front-end dev and UX design, it changes how I read a spec, where I look for defects, and how I translate quality to the business. Beyond testing, I build the tools the team doesn't have yet.",
      differentials: [
        {
          label: "Cross-domain",
          value: "Dev → UX → QA",
          note: "Dev → UX → Support → QA. Each layer added a different lens: user flow, system architecture, business process. I can think in all three simultaneously.",
        },
        {
          label: "Builder",
          value: "2 tools shipped",
          note: "Two internal tools in production: a metrics dashboard that turns issue tracker data into a go/no-go criterion per release, and a flow CLI that eliminates 60 minutes of manual configuration. I build because it's faster than waiting.",
        },
        {
          label: "User-first",
          value: "UX background",
          note: "Five years in UX taught me to think about the journey before writing the scenario. Usability bugs show up in wireframes, not in the backlog.",
        },
        {
          label: "AI-augmented",
          value: "AI in every stage",
          note: "I use AI across the entire QA cycle: generating test cases from requirements, analyzing logs for bug triage, automating documentation, and building internal tools. Our internal flow CLI was born from this, AI as a capacity multiplier, not a buzzword.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "QA Metrics Dashboard",
        description:
          "QA metrics lived in outdated spreadsheets. Built from scratch: Streamlit + Python pulling live data from Jira via REST, processing with Pandas, rendering 12+ interactive charts in real time. The composite Quality Score defines the go/no-go for each release, used daily by the team.",
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
        detail: [
          "Page Object Model pattern, maintainable selectors decoupled from test logic",
          "Custom commands for repeated flows (login, form fill, API intercept)",
          "GitHub Actions pipeline: runs on every push to main, fails fast on regression",
          "Viewport tests across desktop, tablet and mobile breakpoints",
        ],
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
          "APIs reaching production with broken contracts, failed authentication, and inconsistent responses. Structured a suite covering JSON schema validation, JWT authentication, input edge cases, and cross-service integration flows. Every endpoint documented with positive, negative, and boundary scenarios, executed automatically via Newman in CI.",
        detail: [
          "Automated schema validation, any contract break is caught before deploy",
          "Auth coverage: valid, expired, malformed, and missing tokens",
          "Integration tests: flows crossing multiple services validated end-to-end",
          "Exportable collection versioned in Git, any dev can run locally",
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
          "120 cases covering all CRUD operations of a critical system, happy paths, edge cases, and integration failures. Result: 40% fewer regressions and 30% faster deploy cycles.",
        detail: [
          "Full CRUD coverage: create, read, update, delete with valid and invalid payloads",
          "Edge cases: empty fields, boundary values, duplicate entries, unauthorized access",
          "Integration layer: tested service-to-service calls across the critical path",
          "Postman collection exported and version-controlled, runnable by any team member",
        ],
        snapshot: null,
        metrics: ["120 test cases", "40% fewer regressions", "30% faster deploys"],
        tags: ["Cypress", "Postman", "API Testing"],
        label: null,
        link: "https://github.com/ggvinos/desafio-coco-bambu",
        featured: false,
      },
      {
        id: "flipboard",
        title: "Usability Analysis, Flipboard",
        description:
          "Conducted usability and black-box testing on Flipboard targeting real-use scenarios. Analysis covered navigation flows, interface consistency across platforms (web and mobile), and underlying API validation with Postman. Goal: map user journey friction before it reaches the backlog.",
        detail: [
          "15+ improvements identified and prioritized by user impact",
          "Cross-platform consistency testing: web vs. mobile vs. app",
          "Underlying API validation with Postman, data failures invisible in the UI",
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
        title: "Cross-Platform Usability, Kukac Kanban",
        description:
          "Full usability and functionality evaluation of Kukac Kanban Board across web and mobile. Tested card creation, movement, and organization flows, documenting behavioral inconsistencies between platforms and bugs impacting the daily user experience.",
        detail: [
          "Web and mobile testing, divergent behaviors identified and documented",
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
          "Platform connecting patients to psychologists in Florianópolis. Designed and built the landing page and system architecture from scratch, validating the product with real users before investing in full development.",
        detail: [
          "User research: interviews with psychologists to validate pain points before building",
          "Landing page built with semantic HTML and accessibility best practices",
          "Form flow tested across browsers and devices, zero broken submissions",
          "Architecture designed to scale from landing page to full booking system",
        ],
        snapshot: null,
        metrics: ["5 psychologists interviewed", "Cross-browser tested"],
        tags: ["HTML", "UX Research", "Usability", "Product"],
        label: "IN PROGRESS",
        link: "https://github.com/ggvinos/hub-psicologia",
        featured: false,
      },
      {
        id: "espaco-calmo",
        title: "EspaçoCalmo",
        description:
          "Mental health app born as a 2022 college thesis, rebuilt from scratch in 2026. Same mission, rewritten visual system: sage palette on cream paper, editorial typography, flows cut to the minimum. Built for someone not doing well today, not for wellness enthusiasts.",
        detail: [
          "Onboarding cut from 5 data-collection screens to 3 slides + one registration",
          "Daily check-in from 5 screens to 2, questions asked when they matter, not all at once",
          "SOS button on every screen, two steps to reach a real person or call CVV",
          "5 anti-wellness-slop principles: calm as product, honest not optimistic, real Brazilian Portuguese, accessible, fewer steps",
        ],
        snapshot: null,
        metrics: ["14 screens", "TCC 2022, redesign 2026", "iOS / React Native"],
        tags: ["UX Design", "Product Design", "Figma", "React Native", "Mental Health"],
        label: "UX REDESIGN",
        link: null,
        featured: false,
      },
      {
        id: "comunicacao-consciente",
        title: "Comunicação Consciente",
        description:
          "Unified inbox for WhatsApp and Instagram, no feed, no stories, no reels. Just conversations. Built for whoever spends 3h49 daily on social media and wants most of it back. Reached hi-fi prototype stage before Meta API restrictions made it unviable to ship.",
        detail: [
          "Intent picker: every session starts with 'what brought you here?' — 3 clear actions plus a timed quick-look (2 min)",
          "Intentional exit: inbox cleared becomes a celebration screen, next batch announced so you can wait",
          "Silent hours: messages batched per hour, priority contacts bypass silence",
          "Session timer as a visible well-being feature, not buried in settings",
        ],
        snapshot: null,
        metrics: ["14 screens", "Hi-fi prototype", "Blocked by Meta API"],
        tags: ["UX Design", "Product Design", "Figma", "WhatsApp", "Instagram"],
        label: "PROTOTYPE",
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
        period: "Dec 2025 – present",
        description:
          "Quality engineering across a HealthTech ecosystem (Web, Mobile, APIs, self-service). Test strategy, regression automation, root-cause analysis (race conditions), QA on AI conversational flows, and bug density monitoring via KPIs. Products: NinaChat, ConfirmationCall, NinaFlow, Check-in/Kiosk, Patient App. ERPs: Tasy, MV, Feegow, NetPacs, MKData.",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Feb 2025 – Oct 2025",
        description:
          "Volunteer QA in an open-source agile environment. Cypress E2E + Postman API (30+ critical failures found) + Appium mobile. Test documentation in TestRail and Jira, usability and accessibility validation (WCAG). 90% coverage, 40% fewer bugs, validation from 4 hours to 30 min/sprint.",
      },
      {
        company: "CTC Tech",
        role: "BackOffice Analyst",
        period: "Jun 2022 – Aug 2025",
        description:
          "Started as Support Analyst N1 at the Ministry of Health, promoted to CNJ after earning ITIL 4 and MD-100 certifications, then returned as BackOffice Analyst. 500+ incidents validated in critical national systems. Resolution time reduced by 35%. 98% system availability. 40% reliability improvement.",
      },
      {
        company: "Workana",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – May 2024",
        description:
          "UX Freelancer on Workana. Figma and Adobe XD wireframes and prototypes with focus on usability and accessibility (WCAG). Cypress (web) + Appium (mobile) automation, 85% coverage, 20+ critical failures found, 25% UX improvement (user feedback), 35% faster validations.",
      },
      {
        company: "UNICEPLAC",
        role: "Infrastructure & UX/UI Analyst",
        period: "Jan 2020 – Jan 2022",
        description:
          "Infrastructure and UX/UI in the Software Engineering graduation startup project. Figma wireframes and prototypes, usability testing (−30% inconsistencies), Docker support (+90% environment availability), +25% UX based on feedback.",
      },
      {
        company: "Hospital Santa Lúcia",
        role: "Administrative Assistant",
        period: "May 2017 – May 2019",
        description:
          "Apprentice in the hospital pharmacy. Document management, internal service, and administrative support. Built the attention to detail and organization habits that carry into QA work today.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4th place",
        description:
          "Built a smart scheduling solution for Caixa Econômica Federal's Sandbox, integrating IBM watsonx tools with conversational AI agents and UX-first flows. Competed against teams from all over Brazil, ranked 4th overall.",
      },
      {
        title: "Education",
        result: "B.Sc. Software Engineering",
        description: "Centro Universitário UNICEPLAC, Brasília/DF (Jan 2020 – Jun 2024). Emphasis on software development and UX design. Final project applied in an academic startup.",
      },
      {
        title: "HDI Support Center Analyst",
        result: "HDI-SCA Certified",
        description: "International certification for IT support and service desk professionals. Validates incident management, SLA compliance, and end-user communication under pressure.",
      },
    ],
    languages: [
      { lang: "English", level: "Professional Working" },
      { lang: "Spanish", level: "Professional Working" },
      { lang: "Portuguese", level: "Native" },
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
      Testing: ["Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest", "TestRail"],
      Languages: ["Python", "JavaScript", "TypeScript"],
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira", "Docker", "ITIL 4"],
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
        "WCAG Accessibility",
        "Root Cause Analysis",
      ],
    },
    sections_education: {
      education: "EDUCATION",
      certifications: "CERTIFICATIONS",
      degree_badge: "B.SC.",
    },
    education: {
      degree: "Bachelor of Software Engineering",
      institution: "Centro Universitário UNICEPLAC",
      period: "Jan 2020 – Jun 2024",
      location: "Brasília/DF",
      description: "Emphasis on software development, UX design and systems architecture. Final applied project in an academic startup, combining front-end development, infrastructure and quality assurance.",
    },
    certifications: [
      { title: "ITIL® Foundation Certificate in IT Service Management", issuer: "PeopleCert" },
      { title: "HDI Support Center Analyst (HDI-SCA)", issuer: "HDI" },
      { title: "Exam MD-100: Windows Client", issuer: "Microsoft" },
      { title: "Introduction to Software Testing & QA", issuer: "Coursera" },
    ],
    contact: {
      headline: "Open to connecting, collaborating or just talking about QA.",
      cv_label: "Download CV",
      email_label: "Send Email",
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
      education: "Formação",
      skills: "Skills",
      writing: "Artigos",
      contact: "Contato",
    },
    hero: {
      label: "// software engineer in test",
      name: "VINICIOS FERREIRA",
      subtitle: "QA Engineer · Builder · 6+ anos em tecnologia",
      tagline: "QA que automatiza, mede e entrega o que o time ainda não tem.",
      metrics: [
        { value: "20 → 2 min", label: "tempo de validação por deploy" },
        { value: "47 bugs", label: "capturados antes da produção" },
        { value: "40%", label: "menos regressões" },
        { value: "95%", label: "ganho em eficiência de entregas" },
      ],
      cta_primary: "Ver Projetos",
      cta_secondary: "Contato",
    },
    sections: {
      about: "SOBRE",
      projects: "PROJETOS",
      experience: "EXPERIÊNCIA",
      education: "Formação",
      skills: "SKILLS",
      writing: "ARTIGOS",
      contact: "CONTATO",
      personal: "PROJETOS PESSOAIS",
      achievements: "CONQUISTAS",
    },
    about: {
      bio: "QA com foco em automação, cobertura e nas métricas que transformam instinto em decisão. Background em dev front-end e UX design, muda como leio uma spec, onde procuro falhas e como traduzo qualidade para o negócio. Além de testar, construo as ferramentas que o time ainda não tem.",
      differentials: [
        {
          label: "Multidisciplinar",
          value: "Dev → UX → QA",
          note: "Dev → UX → Suporte → QA. Cada camada adicionou uma perspectiva diferente: fluxo do usuário, arquitetura do sistema, processo de negócio. Consigo pensar nos três ao mesmo tempo.",
        },
        {
          label: "Builder",
          value: "2 ferramentas em produção",
          note: "Duas ferramentas internas em produção: um dashboard de métricas que transforma dados do issue tracker em critério de go/no-go por release, e uma CLI de fluxos que elimina 60 minutos de configuração manual. Construo porque é mais rápido que esperar.",
        },
        {
          label: "User-first",
          value: "Background em UX",
          note: "Cinco anos de UX ensinaram a pensar na jornada antes de escrever o cenário. Bugs de usabilidade aparecem nos wireframes, não no backlog.",
        },
        {
          label: "AI-augmented",
          value: "IA em todo o processo",
          note: "Uso IA em praticamente todo o ciclo de QA: geração de casos de teste a partir de requisitos, análise de logs para triagem de bugs, automação de documentação e criação de ferramentas internas. Nossa CLI de fluxos nasceu disso, IA como multiplicador de capacidade, não como buzzword.",
        },
      ],
    },
    projects: [
      {
        id: "ninadash",
        title: "QA Metrics Dashboard",
        description:
          "Métricas de qualidade viviam em planilhas desatualizadas. Construí do zero: Streamlit + Python consumindo o Jira via REST, processando com Pandas, exibindo 12+ gráficos em tempo real. O Quality Score composto define o go/no-go de cada release, usado diariamente pelo time.",
        detail: [
          "4 perfis de acesso com visibilidade distinta: cada colaborador vê só o que precisa",
          "10 abas cobrindo todo o ciclo: qualidade, backlog, clientes, histórico e painel de liderança",
          "Tendências por sprint calculadas automaticamente, sem planilha, sem esforço manual",
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
          "IDs aleatórios, accountId injetado automaticamente, pronto para produção sem ajustes",
          "Suporta fluxos complexos: branches condicionais, chamadas de API e diálogos multi-turno",
          "Valida o schema antes de salvar, zero imports inválidos",
          "Após a geração, funciona offline, sem dependência contínua da API",
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
        detail: [
          "Padrão Page Object Model, seletores desacoplados da lógica de teste",
          "Comandos customizados para fluxos repetidos (login, preenchimento, interceptação de API)",
          "Pipeline GitHub Actions: roda a cada push para main, falha rápido em regressão",
          "Testes de viewport em desktop, tablet e mobile",
        ],
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
          "APIs mal testadas chegam em produção com contratos quebrados, autenticações falhas e respostas inconsistentes. Estruturei uma suite cobrindo validação de schema JSON, autenticação JWT, edge cases de entrada e fluxos de integração entre serviços. Cada endpoint documentado com cenários positivos, negativos e condições de borda, executados automaticamente via Newman no CI.",
        detail: [
          "Schema validation automatizado, qualquer quebra de contrato é capturada antes do deploy",
          "Cobertura de autenticação: tokens válidos, expirados, mal-formados e ausentes",
          "Testes de integração: fluxos que cruzam múltiplos serviços validados de ponta a ponta",
          "Collection exportável e versionada no Git, qualquer dev pode rodar localmente",
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
          "120 casos cobrindo todas as operações CRUD de um sistema crítico, happy paths, edge cases e falhas de integração. Resultado: 40% menos regressões e ciclo de deploy 30% mais rápido.",
        detail: [
          "Cobertura CRUD completa: create, read, update, delete com payloads válidos e inválidos",
          "Edge cases: campos vazios, valores limite, entradas duplicadas, acesso não autorizado",
          "Camada de integração: chamadas entre serviços validadas em toda a jornada crítica",
          "Collection Postman exportada e versionada no Git, executável por qualquer membro do time",
        ],
        snapshot: null,
        metrics: ["120 casos de teste", "40% menos regressões", "30% deploys mais rápidos"],
        tags: ["Cypress", "Postman", "API Testing"],
        label: null,
        link: "https://github.com/ggvinos/desafio-coco-bambu",
        featured: false,
      },
      {
        id: "flipboard",
        title: "Análise de Usabilidade, Flipboard",
        description:
          "Conduzi testes de usabilidade e caixa-preta no Flipboard com foco em cenários reais de uso. A análise cobriu fluxos de navegação, consistência de interface entre plataformas (web e mobile) e validação de APIs subjacentes com Postman. O objetivo foi ir além de encontrar bugs, mapear fricções na jornada do usuário antes que chegassem ao backlog.",
        detail: [
          "15+ melhorias identificadas e priorizadas por impacto no usuário",
          "Testes de consistência multiplataforma: web vs. mobile vs. app",
          "Validação de APIs subjacentes com Postman, falhas de dados invisíveis na UI",
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
        title: "Testes Multiplataforma, Kukac Kanban",
        description:
          "Avaliação completa de usabilidade e funcionalidade do Kukac Kanban Board, cobrindo web e mobile. Testei fluxos de criação, movimentação e organização de cards, documentando inconsistências de comportamento entre plataformas e bugs que afetavam a experiência diária do usuário.",
        detail: [
          "Testes em web e mobile, comportamentos divergentes identificados e documentados",
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
          "Plataforma conectando pacientes a psicólogos da Grande Florianópolis. Desenvolvi a landing page e a arquitetura do sistema do zero, validando o produto com usuários reais antes de investir no desenvolvimento completo.",
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
      {
        id: "espaco-calmo",
        title: "EspaçoCalmo",
        description:
          "App de saúde mental nascido como TCC em 2022, reconstruído do zero em 2026. Mesma missão, sistema visual reescrito: paleta sage sobre papel creme, tipografia editorial, fluxos cortados ao mínimo. Feito pra quem não está bem hoje, não para entusiastas de wellness.",
        detail: [
          "Onboarding reduzido de 5 telas de coleta para 3 slides + um cadastro",
          "Avaliação diária de 5 telas para 2, perguntas feitas quando importam, não tudo de uma vez",
          "Botão SOS em todas as telas, duas etapas para falar com alguém de verdade ou ligar pro CVV",
          "5 princípios anti-wellness-slop: calma é o produto, honesto não otimista, português BR de verdade, acessível, menos passos",
        ],
        snapshot: null,
        metrics: ["14 telas", "TCC 2022, redesign 2026", "iOS / React Native"],
        tags: ["UX Design", "Product Design", "Figma", "React Native", "Saúde Mental"],
        label: "UX REDESIGN",
        link: null,
        featured: false,
      },
      {
        id: "comunicacao-consciente",
        title: "Comunicação Consciente",
        description:
          "Caixa unificada para WhatsApp e Instagram, sem feed, sem stories, sem reels. Só conversa. Feito pra quem passa 3h49 por dia em redes sociais e quer a maior parte de volta. Chegou ao protótipo hi-fi antes de a API da Meta inviabilizar o lançamento.",
        detail: [
          "Intent picker: toda sessão começa com 'o que te trouxe aqui agora?' — 3 ações claras mais opção de dar uma olhada rápida (2 min)",
          "Saída intencional: caixa zerada vira tela de celebração, próximo lote de mensagens anunciado para você poder esperar",
          "Horas silenciosas: mensagens agrupadas por hora, contatos prioritários furam o silêncio",
          "Cronômetro de sessão visível como aba de bem-estar, não escondido nas configurações",
        ],
        snapshot: null,
        metrics: ["14 telas", "Protótipo hi-fi", "Bloqueado pela API da Meta"],
        tags: ["UX Design", "Product Design", "Figma", "WhatsApp", "Instagram"],
        label: "PROTÓTIPO",
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
          "Garantia de qualidade em ecossistema HealthTech (Web, Mobile, APIs, autoatendimento). Estratégia de testes, automação de regressão, análise de causa raiz (race conditions), homologação de fluxos de IA conversacional e monitoramento de densidade de bugs via KPIs. Produtos: NinaChat, ConfirmationCall, NinaFlow, Check-in/Totem, App Paciente. ERPs: Tasy, MV, Feegow, NetPacs, MKData.",
      },
      {
        company: "Pipoca Ágil",
        role: "QA Engineer",
        period: "Fev 2025 – Out 2025",
        description:
          "QA voluntário em ambiente ágil open source. Cypress E2E + Postman API (30+ falhas críticas identificadas) + Appium mobile. Documentação no TestRail e Jira, validação com foco em usabilidade e acessibilidade (WCAG). 90% de cobertura, 40% menos bugs, ciclo reduzido de 4 horas para 30 min/sprint.",
      },
      {
        company: "CTC Tech",
        role: "Analista BackOffice",
        period: "Jun 2022 – Ago 2025",
        description:
          "Iniciou como Analista de Suporte N1 no Ministério da Saúde, promovido ao CNJ após certificações ITIL 4 e MD-100, retornando como Analista BackOffice. 500+ incidentes validados em sistemas críticos nacionais. Tempo de resolução reduzido em 35%. 98% de disponibilidade. 40% de melhoria na confiabilidade dos sistemas.",
      },
      {
        company: "Workana",
        role: "UX/UI Product Designer",
        period: "Jan 2022 – Mai 2024",
        description:
          "UX Designer Freelancer na Workana. Wireframes e protótipos em Figma e Adobe XD com foco em usabilidade e acessibilidade (WCAG). Cypress (web) + Appium (mobile), 85% de cobertura, 20+ falhas críticas, UX melhorada em 25% (feedback), validações 35% mais rápidas.",
      },
      {
        company: "UNICEPLAC",
        role: "Analista de Infraestrutura e UX/UI",
        period: "Jan 2020 – Jan 2022",
        description:
          "Infraestrutura e UX/UI no Projeto Startup da graduação em Engenharia de Software. Protótipos em Figma, testes de usabilidade (-30% inconsistências), suporte com Docker (+90% disponibilidade dos ambientes), +25% UX.",
      },
      {
        company: "Hospital Santa Lúcia",
        role: "Assistente Administrativo",
        period: "Mai 2017 – Mai 2019",
        description:
          "Menor Aprendiz na área administrativa da Farmácia. Organização de documentos, atendimento interno e suporte às rotinas. Base de atenção a detalhes e organização que aplico na área de QA hoje.",
      },
    ],
    achievements: [
      {
        title: "Hackathon Brasília +TI 2025",
        result: "4º lugar",
        description:
          "Solução de agendamento inteligente para o Sandbox da Caixa Econômica Federal, integrando ferramentas IBM (watsonx) com agentes de IA conversacional e fluxos orientados a UX. Competição com equipes de todo o Brasil, 4º lugar geral.",
      },
      {
        title: "Formação",
        result: "Bacharelado em Eng. de Software",
        description: "Centro Universitário UNICEPLAC, Brasília/DF (jan/2020 – jun/2024). Ênfase em desenvolvimento de software e UX design. Projeto de conclusão aplicado em startup acadêmica.",
      },
      {
        title: "HDI Support Center Analyst",
        result: "Certificado HDI-SCA",
        description: "Certificação internacional para profissionais de suporte e service desk. Valida gestão de incidentes, cumprimento de SLA e comunicação sob pressão.",
      },
    ],
    languages: [
      { lang: "Inglês", level: "Professional Working" },
      { lang: "Espanhol", level: "Professional Working" },
      { lang: "Português", level: "Nativo" },
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
      Testing: ["Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest", "TestRail"],
      Languages: ["Python", "JavaScript", "TypeScript"],
      Tools: ["Git", "GitHub Actions", "Streamlit", "Claude API", "Figma", "Jira", "Docker", "ITIL 4"],
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
        "Acessibilidade WCAG",
        "Análise de Causa Raiz",
      ],
    },
    sections_education: {
      education: "FORMAÇÃO",
      certifications: "CERTIFICAÇÕES",
      degree_badge: "BACHARELADO",
    },
    education: {
      degree: "Bacharelado em Engenharia de Software",
      institution: "Centro Universitário UNICEPLAC",
      period: "Jan 2020 – Jun 2024",
      location: "Brasília/DF",
      description: "Ênfase em desenvolvimento de software, UX design e arquitetura de sistemas. Projeto de conclusão aplicado em startup acadêmica, combinando desenvolvimento front-end, infraestrutura e garantia de qualidade.",
    },
    certifications: [
      { title: "ITIL® Foundation Certificate in IT Service Management", issuer: "PeopleCert" },
      { title: "HDI Support Center Analyst (HDI-SCA)", issuer: "HDI" },
      { title: "Exam MD-100: Windows Client", issuer: "Microsoft" },
      { title: "Início em Teste e QA", issuer: "Alura" },
    ],
    contact: {
      headline: "Aberto a conexões, colaborações ou só uma boa conversa sobre QA.",
      cv_label: "Baixar CV",
      email_label: "Enviar Email",
    },
    footer: {
      copy: "© 2026 Vinicios Ferreira",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
