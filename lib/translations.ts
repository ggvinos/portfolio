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
      bio: "QA focused on automation, coverage, and the metrics that turn instinct into decisions. Background in front-end dev and UX design, it changes how I read a spec, where I look for defects, and how I translate quality to the business. Beyond testing, I build the tools the team doesn't have yet, and Acorde, a live product where I apply those same quality standards end to end.",
      differentials: [
        {
          label: "Cross-domain",
          value: "Dev → UX → QA",
          note: "Dev → UX → Support → QA. Each layer added a different lens: user flow, system architecture, business process. I can think in all three simultaneously.",
        },
        {
          label: "Builder",
          value: "2 tools + 1 product live",
          note: "Two internal tools in production: a metrics dashboard that turns issue tracker data into a go/no-go criterion per release, and a flow CLI that eliminates 60 minutes of manual configuration. Plus Acorde, my own product live with real users. I build because it's faster than waiting.",
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
        id: "acorde",
        title: "Acorde",
        description:
          "Learn English through the music you already love: real-time synced lyrics, line-by-line translation, level-aware vocabulary and speech practice with word-by-word feedback. I built, tested and operate it end to end, applying the same standards I use as a QA: instrumented activation funnel, tested critical flows, every feature measured in production before scaling.",
        detail: [
          "Speech practice with AI transcription and word-by-word scoring, with automatic fallback to the browser engine when the API fails",
          "Data over instinct: activation and retention funnel instrumented before spending on acquisition",
          "Retention by design: spaced repetition (SM-2), daily challenge, streaks and push reminders",
          "Installable PWA with an offline-first core: search, play, read and save words without depending on the backend",
        ],
        snapshot: [
          { label: "Status", value: "Live" },
          { label: "Real users since", value: "Jun 2026" },
          { label: "Speech practice", value: "+10 min", up: true },
          { label: "Review engine", value: "SM-2" },
        ],
        metrics: null,
        tags: ["React", "Supabase", "Whisper", "Claude API", "PWA", "UX"],
        label: "LIVE PRODUCT",
        link: "https://acorde.club",
        featured: true,
      },
      {
        id: "qa-dashboard",
        title: "QA Metrics Dashboard",
        description:
          "QA metrics lived in outdated spreadsheets. Built from scratch: Streamlit + Python pulling live data from the issue tracker via REST, processing with Pandas, rendering 12+ interactive charts in real time. A composite quality score defines the go/no-go for each release, used daily by the team.",
        detail: [
          "Role-based access: 4 profiles, each seeing only what it needs",
          "Covers the whole cycle: quality, backlog, clients, history and a leadership panel",
          "Trends per sprint computed automatically, no spreadsheets, no manual effort",
          "Authentication integrated with the internal API",
        ],
        snapshot: null,
        metrics: ["12+ live charts", "Go/no-go per release", "Used daily by the team"],
        tags: ["Python", "Streamlit", "REST API", "Pandas", "Plotly"],
        label: "INTERNAL TOOL",
        link: null,
        featured: false,
      },
      {
        id: "flow-cli",
        title: "Flow CLI Generator",
        description:
          "Node-by-node chatbot flow configuration took 30–60 minutes. Flow CLI Generator solves it: describe the flow in natural language, the CLI outputs the JSON ready to import. No templates, no manual configuration.",
        detail: [
          "Generates flows with stable random IDs, ready to import with no manual adjustments",
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
          "Quality engineering across a HealthTech ecosystem (Web, Mobile, APIs, self-service). Test strategy, regression automation, root-cause analysis (race conditions), QA on AI conversational flows, and bug density monitoring via KPIs, covering multiple products and integrations with the main hospital ERPs in the market.",
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
    acordeShowcase: {
      eyebrow: "LIVE PRODUCT",
      title: "One study session, start to finish",
      lead: "Acorde turns a song you already listen to into an English lesson. This is what a single session looks like.",
      panels: [
        { n: "01", title: "You pick the song", body: "No fixed word list. The lesson starts from something you already wanted to hear.", shot: "/acorde/home.webp", alt: "Acorde home screen" },
        { n: "02", title: "The lyric follows the audio", body: "Synced line by line, with translation one tap away. Reading never interrupts listening.", shot: "/acorde/letra.webp", alt: "Synced lyrics with translation" },
        { n: "03", title: "Focus mode: one line at a time", body: "Everything else blurs out. The cognitive load drops to a single sentence.", shot: "/acorde/foco.webp", alt: "Focus mode, one line at a time" },
        { n: "04", title: "You sing it, you get a score", body: "Whisper transcribes and grades word by word. When the API fails, the browser engine takes over.", shot: "/acorde/fala.webp", alt: "Speaking practice with per-word score" },
        { n: "05", title: "The hard word becomes a flashcard", body: "What you missed goes into spaced repetition (SM-2) and comes back exactly when you are about to forget.", shot: "/acorde/revisao.webp", alt: "Spaced repetition flashcard" },
        { n: "06", title: "The streak holds the routine", body: "Daily challenge, XP and push reminders. Each one exists to bring you back to a session that already works.", shot: "/acorde/progresso.webp", alt: "Progress and streak screen" },
      ],
      closing: {
        title: "Built, tested and operated end to end",
        body: "Same standards I use as a QA: instrumented activation funnel, tested critical paths and every feature measured in production before scaling.",
        cta: "Read the full case study",
        visit: "Open acorde.club",
      },
    },
    acordeCase: {
      back: "Back to portfolio",
      eyebrow: "CASE STUDY",
      title: "Acorde",
      tagline: "Learning English with the songs you already listen to.",
      intro:
        "A live product I researched, designed, built, tested and operate on my own. Acorde turns music into an English lesson: real-time synced lyrics, line-by-line translation, vocabulary at your level and pronunciation practice with word-by-word feedback.",
      link: "https://acorde.club",
      linkLabel: "Open acorde.club",
      meta: [
        { label: "Role", value: "Solo: product, design, dev and QA" },
        { label: "Timeline", value: "2026 — in operation" },
        { label: "Status", value: "Live with real users" },
        { label: "Stack", value: "React · Supabase · Whisper · Claude API" },
      ],
      problem: {
        eyebrow: "THE PROBLEM",
        title: "Apps teach vocabulary nobody wanted to learn",
        body: [
          "Traditional language apps hand you a fixed word list and ask for daily discipline. That works while motivation lasts, and motivation is exactly what runs out first.",
          "Music is the opposite: people already listen every day, already repeat the lines, already want to understand what is being said. The intent is there before the app exists.",
          "Acorde starts from that intent. The lesson is the song you already chose.",
        ],
      },
      product: {
        eyebrow: "THE PRODUCT",
        title: "Four decisions that define the experience",
        features: [
          {
            title: "Synced lyrics with line-by-line translation",
            body: "The lyric follows the audio in real time. Each line can be opened for translation without losing the song's rhythm, so reading never breaks listening.",
            shots: ["/acorde/letra.webp"],
            alt: "Acorde player with synced lyrics",
          },
          {
            title: "Speaking practice with word-by-word scoring",
            body: "You sing or read the line out loud and get a per-word score. Transcription runs on Whisper, with automatic fallback to the browser engine when the API fails.",
            shots: ["/acorde/fala.webp"],
            alt: "Speaking practice screen with per-word feedback",
          },
          {
            title: "Vocabulary at your level, not at the app's level",
            body: "Words are classified by CEFR level and saved to a personal deck. Spaced repetition (SM-2) decides what comes back and when.",
            shots: ["/acorde/vocabulario.webp", "/acorde/revisao.webp"],
            alt: "Vocabulary screen with CEFR levels",
          },
          {
            title: "Retention by design",
            body: "Daily challenge, streak and push reminders. Not gamification for its own sake: each one exists to bring the user back to a practice session that already works.",
            shots: ["/acorde/progresso.webp"],
            alt: "Daily review and streak screen",
          },
        ],
      },
      quality: {
        eyebrow: "QUALITY ENGINEERING",
        title: "How I applied QA to my own product",
        lead: "This is the part that usually gets skipped in a side project. It is the part I care about most: Acorde is where I run the quality practices I bring to a team, without anyone forcing me to.",
        pillars: [
          {
            tag: "01",
            title: "Instrument before scaling",
            body: "No acquisition spend before the activation funnel was instrumented. Named events on every critical step, so growth decisions come from data instead of instinct.",
          },
          {
            tag: "02",
            title: "Hypothesis, metric, deadline",
            body: "Every discovery test is written as an experiment: measured baseline, target number and a date to decide. The microphone discovery test shipped with an 18.5% baseline and a 30% target, with a window to confirm or kill it.",
          },
          {
            tag: "03",
            title: "Failure is a requirement, not an exception",
            body: "The speech API can be down, slow or rate-limited. Instead of surfacing an error, the app degrades gracefully to the browser engine. The failure path was specified alongside the happy path.",
          },
          {
            tag: "04",
            title: "Offline-first as an acceptance criterion",
            body: "Search, play, read and save a word work without depending on the backend. The PWA core was validated under a degraded connection, not only on a healthy one.",
          },
          {
            tag: "05",
            title: "Regression where it hurts",
            body: "The critical path (find a song → play → read → save a word) is verified on every deploy. Coverage concentrated where a defect costs the user the session.",
          },
          {
            tag: "06",
            title: "Traceability per release",
            body: "Every deploy gets a changelog entry. When a metric moves, there is a record of what changed and when, which turns a mystery into an investigation.",
          },
        ],
      },
      decisions: {
        eyebrow: "TECHNICAL DECISIONS",
        title: "Trade-offs worth explaining",
        items: [
          {
            title: "Whisper with browser fallback",
            body: "Whisper gives far better accuracy for non-native speakers, at the cost of latency and an external dependency. The browser engine is worse but always available. Running both means the feature never fully goes down.",
          },
          {
            title: "PWA instead of native app",
            body: "Installable straight from the browser, no store review, deploy under my control. Being outside the stores is not a real growth blocker at this stage.",
          },
          {
            title: "SM-2 instead of a custom algorithm",
            body: "A well-documented, auditable spaced repetition algorithm. Inventing my own scheduler would add risk with no user-visible gain.",
          },
          {
            title: "Living catalogue via scheduled job",
            body: "A nightly job refreshes what is popular from external sources. The curated catalogue stays as a stable base, and the fresh content is additive instead of replacing it.",
          },
        ],
      },
      results: {
        eyebrow: "WHERE IT STANDS",
        title: "Current state",
        items: [
          { value: "Live", label: "in production at acorde.club" },
          { value: "Jun 2026", label: "first real external users" },
          { value: "18.5% → 30%", label: "speaking activation, measured target" },
          { value: "SM-2", label: "review engine in production" },
        ],
        note: "Numbers reflect the product at the time of writing. The focus right now is retention, not acquisition.",
      },
      learnings: {
        eyebrow: "WHAT I TOOK FROM IT",
        title: "Lessons",
        body: [
          "Shipping a feature is the cheap part. Knowing whether it worked is what costs, and that only exists if the instrumentation went in first.",
          "Being QA and developer on the same product exposes how often 'it works' and 'it works for the user' are different statements.",
          "Deciding to kill a feature is easier when the number and the deadline were written down before the work started.",
        ],
      },
      cta: {
        title: "Want to see it running?",
        body: "Acorde is live and free to try. No install required.",
        primary: "Open acorde.club",
        secondary: "Get in touch",
      },
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
      bio: "QA com foco em automação, cobertura e nas métricas que transformam instinto em decisão. Background em dev front-end e UX design, muda como leio uma spec, onde procuro falhas e como traduzo qualidade para o negócio. Além de testar, construo as ferramentas que o time ainda não tem, e o Acorde, um produto no ar onde aplico esses mesmos padrões de qualidade de ponta a ponta.",
      differentials: [
        {
          label: "Multidisciplinar",
          value: "Dev → UX → QA",
          note: "Dev → UX → Suporte → QA. Cada camada adicionou uma perspectiva diferente: fluxo do usuário, arquitetura do sistema, processo de negócio. Consigo pensar nos três ao mesmo tempo.",
        },
        {
          label: "Builder",
          value: "2 ferramentas + 1 produto no ar",
          note: "Duas ferramentas internas em produção: um dashboard de métricas que transforma dados do issue tracker em critério de go/no-go por release, e uma CLI de fluxos que elimina 60 minutos de configuração manual. Além do Acorde, produto próprio no ar com usuários reais. Construo porque é mais rápido que esperar.",
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
        id: "acorde",
        title: "Acorde",
        description:
          "Aprenda inglês com as músicas que você já ama: letra sincronizada em tempo real, tradução linha a linha, vocabulário no seu nível e prática de pronúncia com feedback palavra a palavra. Construí, testei e opero de ponta a ponta, aplicando os mesmos padrões que uso como QA: funil de ativação instrumentado, fluxos críticos testados e cada feature medida em produção antes de escalar.",
        detail: [
          "Prática de fala com transcrição por IA e nota palavra a palavra, com fallback automático para o motor do navegador quando a API falha",
          "Dado acima de instinto: funil de ativação e retenção instrumentado antes de investir em aquisição",
          "Retenção por design: revisão espaçada (SM-2), desafio diário, streak e lembretes push",
          "PWA instalável com núcleo offline-first: buscar, tocar, ler e salvar palavras sem depender do backend",
        ],
        snapshot: [
          { label: "Status", value: "No ar" },
          { label: "Usuários reais desde", value: "jun/2026" },
          { label: "Prática de fala", value: "+10 min", up: true },
          { label: "Motor de revisão", value: "SM-2" },
        ],
        metrics: null,
        tags: ["React", "Supabase", "Whisper", "Claude API", "PWA", "UX"],
        label: "PRODUTO NO AR",
        link: "https://acorde.club",
        featured: true,
      },
      {
        id: "qa-dashboard",
        title: "QA Metrics Dashboard",
        description:
          "Métricas de qualidade viviam em planilhas desatualizadas. Construí do zero: Streamlit + Python consumindo o issue tracker via REST, processando com Pandas, exibindo 12+ gráficos em tempo real. Um score composto de qualidade define o go/no-go de cada release, usado diariamente pelo time.",
        detail: [
          "4 perfis de acesso com visibilidade distinta: cada colaborador vê só o que precisa",
          "Cobre todo o ciclo: qualidade, backlog, clientes, histórico e painel de liderança",
          "Tendências por sprint calculadas automaticamente, sem planilha, sem esforço manual",
          "Autenticação integrada à API interna",
        ],
        snapshot: null,
        metrics: ["12+ gráficos em tempo real", "Go/no-go por release", "Uso diário pelo time"],
        tags: ["Python", "Streamlit", "REST API", "Pandas", "Plotly"],
        label: "FERRAMENTA INTERNA",
        link: null,
        featured: false,
      },
      {
        id: "flow-cli",
        title: "Flow CLI Generator",
        description:
          "Configurar um fluxo de chatbot nó por nó levava 30–60 minutos. O Flow CLI Generator resolve: descreva o fluxo em linguagem natural, a CLI gera o JSON pronto para importar. Sem template, sem configuração manual.",
        detail: [
          "IDs aleatórios e estáveis, pronto para importar sem ajustes manuais",
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
          "Garantia de qualidade em ecossistema HealthTech (Web, Mobile, APIs, autoatendimento). Estratégia de testes, automação de regressão, análise de causa raiz (race conditions), homologação de fluxos de IA conversacional e monitoramento de densidade de bugs via KPIs, cobrindo múltiplos produtos e integrações com os principais ERPs hospitalares do mercado.",
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
    acordeShowcase: {
      eyebrow: "PRODUTO NO AR",
      title: "Uma sessão de estudo, do início ao fim",
      lead: "O Acorde transforma uma música que você já ouve em aula de inglês. É assim que uma sessão acontece.",
      panels: [
        { n: "01", title: "Você escolhe a música", body: "Sem lista fixa de palavras. A aula começa por algo que você já queria ouvir.", shot: "/acorde/home.webp", alt: "Tela inicial do Acorde" },
        { n: "02", title: "A letra acompanha o áudio", body: "Sincronizada linha a linha, com tradução a um toque. Ler nunca interrompe ouvir.", shot: "/acorde/letra.webp", alt: "Letra sincronizada com tradução" },
        { n: "03", title: "Modo foco: uma linha por vez", body: "Todo o resto desfoca. A carga cognitiva cai para uma frase só.", shot: "/acorde/foco.webp", alt: "Modo foco, uma linha por vez" },
        { n: "04", title: "Você canta e recebe a nota", body: "O Whisper transcreve e avalia palavra a palavra. Quando a API falha, o motor do navegador assume.", shot: "/acorde/fala.webp", alt: "Prática de fala com nota por palavra" },
        { n: "05", title: "A palavra difícil vira flashcard", body: "O que você errou entra na revisão espaçada (SM-2) e volta na hora em que você ia esquecer.", shot: "/acorde/revisao.webp", alt: "Flashcard de revisão espaçada" },
        { n: "06", title: "O streak segura a rotina", body: "Desafio diário, XP e lembretes push. Cada um existe para trazer você de volta a uma sessão que já funciona.", shot: "/acorde/progresso.webp", alt: "Tela de progresso e streak" },
      ],
      closing: {
        title: "Construído, testado e operado de ponta a ponta",
        body: "Os mesmos padrões que uso como QA: funil de ativação instrumentado, caminhos críticos testados e cada feature medida em produção antes de escalar.",
        cta: "Ver o estudo de caso completo",
        visit: "Abrir acorde.club",
      },
    },
    acordeCase: {
      back: "Voltar ao portfólio",
      eyebrow: "ESTUDO DE CASO",
      title: "Acorde",
      tagline: "Aprender inglês com as músicas que você já ouve.",
      intro:
        "Um produto no ar que pesquisei, desenhei, construí, testei e opero sozinho. O Acorde transforma música em aula de inglês: letra sincronizada em tempo real, tradução linha a linha, vocabulário no seu nível e prática de pronúncia com feedback palavra a palavra.",
      link: "https://acorde.club",
      linkLabel: "Abrir acorde.club",
      meta: [
        { label: "Papel", value: "Solo: produto, design, dev e QA" },
        { label: "Período", value: "2026 — em operação" },
        { label: "Status", value: "No ar com usuários reais" },
        { label: "Stack", value: "React · Supabase · Whisper · Claude API" },
      ],
      problem: {
        eyebrow: "O PROBLEMA",
        title: "Apps ensinam um vocabulário que ninguém pediu para aprender",
        body: [
          "App de idioma tradicional entrega uma lista fixa de palavras e cobra disciplina diária. Funciona enquanto a motivação dura, e motivação é exatamente o que acaba primeiro.",
          "Música é o oposto: a pessoa já escuta todo dia, já repete os trechos, já quer entender o que está sendo dito. A intenção existe antes do app existir.",
          "O Acorde parte dessa intenção. A aula é a música que você já escolheu.",
        ],
      },
      product: {
        eyebrow: "O PRODUTO",
        title: "Quatro decisões que definem a experiência",
        features: [
          {
            title: "Letra sincronizada com tradução linha a linha",
            body: "A letra acompanha o áudio em tempo real. Cada linha pode ser aberta para tradução sem perder o ritmo da música, então ler nunca interrompe ouvir.",
            shots: ["/acorde/letra.webp"],
            alt: "Player do Acorde com letra sincronizada",
          },
          {
            title: "Prática de fala com nota palavra a palavra",
            body: "Você canta ou lê a linha em voz alta e recebe uma nota por palavra. A transcrição roda no Whisper, com fallback automático para o motor do navegador quando a API falha.",
            shots: ["/acorde/fala.webp"],
            alt: "Tela de prática de fala com feedback por palavra",
          },
          {
            title: "Vocabulário no seu nível, não no nível do app",
            body: "As palavras são classificadas por nível CEFR e salvas em um baralho pessoal. A revisão espaçada (SM-2) decide o que volta e quando.",
            shots: ["/acorde/vocabulario.webp", "/acorde/revisao.webp"],
            alt: "Tela de vocabulário com níveis CEFR",
          },
          {
            title: "Retenção por design",
            body: "Desafio diário, streak e lembretes push. Não é gamificação por gamificação: cada um existe para trazer o usuário de volta a uma sessão de prática que já funciona.",
            shots: ["/acorde/progresso.webp"],
            alt: "Tela de revisão diária e streak",
          },
        ],
      },
      quality: {
        eyebrow: "ENGENHARIA DE QUALIDADE",
        title: "Como apliquei QA no meu próprio produto",
        lead: "Essa é a parte que normalmente se pula num projeto pessoal. É a que mais me importa: o Acorde é onde eu rodo as práticas de qualidade que levo para um time, sem ninguém me obrigar.",
        pillars: [
          {
            tag: "01",
            title: "Instrumentar antes de escalar",
            body: "Nenhum investimento em aquisição antes do funil de ativação estar instrumentado. Eventos nomeados em cada passo crítico, para que a decisão de crescimento venha de dado e não de instinto.",
          },
          {
            tag: "02",
            title: "Hipótese, métrica, prazo",
            body: "Todo teste de descoberta é escrito como experimento: baseline medido, número alvo e uma data para decidir. O teste do microfone entrou no ar com baseline de 18,5% e meta de 30%, com janela para confirmar ou matar.",
          },
          {
            tag: "03",
            title: "Falha é requisito, não exceção",
            body: "A API de fala pode cair, ficar lenta ou estourar limite. Em vez de mostrar erro, o app degrada com elegância para o motor do navegador. O caminho de falha foi especificado junto com o caminho feliz.",
          },
          {
            tag: "04",
            title: "Offline-first como critério de aceite",
            body: "Buscar, tocar, ler e salvar palavra funcionam sem depender do backend. O núcleo do PWA foi validado em conexão degradada, não só em conexão saudável.",
          },
          {
            tag: "05",
            title: "Regressão onde dói",
            body: "O caminho crítico (achar música → tocar → ler → salvar palavra) é verificado a cada deploy. Cobertura concentrada onde o defeito custa a sessão do usuário.",
          },
          {
            tag: "06",
            title: "Rastreabilidade por release",
            body: "Todo deploy gera entrada no changelog. Quando uma métrica se mexe, existe registro do que mudou e quando, o que transforma mistério em investigação.",
          },
        ],
      },
      decisions: {
        eyebrow: "DECISÕES TÉCNICAS",
        title: "Trade-offs que valem explicação",
        items: [
          {
            title: "Whisper com fallback do navegador",
            body: "O Whisper entrega precisão muito melhor para quem não é nativo, ao custo de latência e de uma dependência externa. O motor do navegador é pior, mas está sempre disponível. Rodar os dois significa que a feature nunca cai por completo.",
          },
          {
            title: "PWA em vez de app nativo",
            body: "Instalável direto do navegador, sem revisão de loja, deploy sob meu controle. Estar fora das lojas não é um bloqueador real de crescimento neste estágio.",
          },
          {
            title: "SM-2 em vez de algoritmo próprio",
            body: "Algoritmo de revisão espaçada documentado e auditável. Inventar um agendador próprio adicionaria risco sem ganho visível para o usuário.",
          },
          {
            title: "Catálogo vivo via job agendado",
            body: "Um job de madrugada atualiza o que está popular a partir de fontes externas. O catálogo curado continua como base estável, e o conteúdo novo é aditivo em vez de substituir.",
          },
        ],
      },
      results: {
        eyebrow: "ONDE ESTÁ HOJE",
        title: "Estado atual",
        items: [
          { value: "No ar", label: "em produção em acorde.club" },
          { value: "jun/2026", label: "primeiros usuários externos reais" },
          { value: "18,5% → 30%", label: "ativação de fala, meta medida" },
          { value: "SM-2", label: "motor de revisão em produção" },
        ],
        note: "Os números refletem o produto no momento em que este case foi escrito. O foco agora é retenção, não aquisição.",
      },
      learnings: {
        eyebrow: "O QUE EU TIREI DISSO",
        title: "Aprendizados",
        body: [
          "Entregar uma feature é a parte barata. Saber se ela funcionou é o que custa, e isso só existe se a instrumentação entrou antes.",
          "Ser QA e desenvolvedor do mesmo produto escancara com que frequência 'funciona' e 'funciona para o usuário' são frases diferentes.",
          "Decidir matar uma feature fica mais fácil quando o número e o prazo foram escritos antes do trabalho começar.",
        ],
      },
      cta: {
        title: "Quer ver rodando?",
        body: "O Acorde está no ar e é gratuito para testar. Não precisa instalar.",
        primary: "Abrir acorde.club",
        secondary: "Falar comigo",
      },
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
