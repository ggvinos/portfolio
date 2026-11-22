"use client";
import { useLanguage } from "@/lib/context";

const copy = {
  pt: {
    kicker: "PROJETO PESSOAL · VAULT PRIVADO",
    title: "Segundo Cérebro",
    lead: "Meu sistema de conhecimento no Obsidian: um vault em Markdown que guarda trabalho, estudo, carreira e vida pessoal, versionado no Git e pensado para ser lido tanto por mim quanto por agentes de IA.",
    note: "O vault é privado. Este resumo mostra a estrutura e as decisões, sem publicar conteúdo.",
    numbersTitle: "Em números",
    numbers: [
      ["3.000+", "notas em Markdown"],
      ["1.500+", "sessões de IA registradas"],
      ["130+", "notas diárias"],
      ["2", "computadores sincronizados"],
    ],
    structureTitle: "Estrutura",
    structureIntro:
      "Dois núcleos que não se misturam, uma ponte entre eles e pastas de apoio:",
    tree: [
      ["Trabalho/", "projetos, cards validados, referências e processos"],
      ["Pessoal/", "projetos próprios, identidade, rotina e finanças"],
      ["Carreira/", "a ponte: estratégia, inglês, portfólio, concursos"],
      ["Reflexoes/", "pensamentos, logs e leituras"],
      ["Conversas-IA/", "histórico das sessões com IA"],
      ["Releases/", "changelog do próprio vault"],
      ["Inbox/", "capturas rápidas, sem contexto ainda"],
      ["diario/", "uma nota por dia"],
    ],
    decisionsTitle: "Decisões que fazem diferença",
    decisions: [
      [
        "Links estáticos em vez de só Dataview",
        "Consultas Dataview são invisíveis para um agente lendo o arquivo bruto. Os mapas de conteúdo (MOCs) mantêm listas estáticas completas, e o Dataview fica como complemento visual.",
      ],
      [
        "Uma nota canônica por assunto",
        "O registro oficial mora nas notas temáticas. As conversas com IA são fonte secundária: dão contexto, não substituem a nota.",
      ],
      [
        "O vault como ponte entre sessões de IA",
        "Contas diferentes de IA não compartilham histórico. Por isso cada projeto tem changelog e handoff atualizados ao fim do trabalho: quem retoma, em qualquer conta, lê o estado real.",
      ],
      [
        "Registro automático das sessões",
        "Um hook do Claude Code salva cada sessão como nota, com data, identificador, tags detectadas e links para os cards citados.",
      ],
      [
        "Padrão de nota e de validação",
        "Templates, convenção de nomes e um fluxo de validação de cards documentado, reutilizado pelas skills públicas que publiquei.",
      ],
      [
        "Sync simples com Git",
        "Pull no começo da sessão e commit com push no fim, entre o computador pessoal e o de trabalho.",
      ],
    ],
    toolsTitle: "Ferramentas",
    relatedTitle: "Publicado a partir dele",
    related: [
      [
        "canvas-collision",
        "https://github.com/ggvinos/canvas-collision",
        "Plugin do Obsidian que impede nós do Canvas de se sobreporem, com um botão que resolve todas as sobreposições de uma vez.",
      ],
      [
        "claude-skills",
        "/projetos/claude-skills",
        "As skills que uso para validar cards, resumir a semana e organizar sessões, generalizadas a partir do fluxo do vault.",
      ],
    ],
    cta: "Conversar sobre minha experiência",
  },
  en: {
    kicker: "PERSONAL PROJECT · PRIVATE VAULT",
    title: "Second Brain",
    lead: "My knowledge system in Obsidian: a Markdown vault holding work, study, career and personal life, versioned in Git and designed to be read by both me and AI agents.",
    note: "The vault is private. This summary shows the structure and decisions without publishing content.",
    numbersTitle: "In numbers",
    numbers: [
      ["3,000+", "Markdown notes"],
      ["1,500+", "AI sessions logged"],
      ["130+", "daily notes"],
      ["2", "synced computers"],
    ],
    structureTitle: "Structure",
    structureIntro:
      "Two cores that never mix, a bridge between them and support folders:",
    tree: [
      ["Work/", "projects, validated cards, references and processes"],
      ["Personal/", "own projects, identity, routine and finances"],
      ["Career/", "the bridge: strategy, English, portfolio, exams"],
      ["Reflections/", "thoughts, logs and readings"],
      ["AI-Chats/", "history of AI sessions"],
      ["Releases/", "changelog of the vault itself"],
      ["Inbox/", "quick captures, no context yet"],
      ["daily/", "one note per day"],
    ],
    decisionsTitle: "Decisions that matter",
    decisions: [
      [
        "Static links instead of Dataview only",
        "Dataview queries are invisible to an agent reading the raw file. Maps of content (MOCs) keep complete static lists, and Dataview stays as a visual extra.",
      ],
      [
        "One canonical note per subject",
        "The official record lives in topic notes. AI conversations are a secondary source: they give context, they do not replace the note.",
      ],
      [
        "The vault as a bridge between AI sessions",
        "Different AI accounts do not share history. So each project keeps a changelog and handoff updated at the end of the work: whoever resumes, on any account, reads the real state.",
      ],
      [
        "Automatic session logging",
        "A Claude Code hook saves each session as a note, with date, identifier, detected tags and links to the cards mentioned.",
      ],
      [
        "Note and validation standard",
        "Templates, naming convention and a documented card validation flow, reused by the public skills I published.",
      ],
      [
        "Simple Git sync",
        "Pull at the start of a session and commit with push at the end, between the personal and the work computer.",
      ],
    ],
    toolsTitle: "Tools",
    relatedTitle: "Published from it",
    related: [
      [
        "canvas-collision",
        "https://github.com/ggvinos/canvas-collision",
        "Obsidian plugin that stops Canvas nodes from overlapping, with a button that resolves every overlap at once.",
      ],
      [
        "claude-skills",
        "/projetos/claude-skills",
        "The skills I use to validate cards, summarize the week and organize sessions, generalized from the vault workflow.",
      ],
    ],
    cta: "Discuss my experience",
  },
} as const;

const tools = [
  "Obsidian",
  "Markdown",
  "Dataview",
  "Canvas",
  "Git",
  "Claude Code",
  "Hooks",
  "Python",
];

export default function ObsidianCase() {
  const { lang } = useLanguage();
  const c = copy[lang === "pt" ? "pt" : "en"];
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {c.kicker}
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {c.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {c.lead}
      </p>
      <div className="mt-8 border-l-2 border-black bg-surface p-5 text-sm leading-relaxed text-muted">
        {c.note}
      </div>

      <h2 className="mt-12 text-2xl font-semibold">{c.numbersTitle}</h2>
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {c.numbers.map(([value, label]) => (
          <div key={label} className="border border-default p-4">
            <dt className="text-2xl font-semibold">{value}</dt>
            <dd className="mt-1 text-xs text-muted">{label}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-2xl font-semibold">{c.structureTitle}</h2>
      <p className="mt-2 text-sm text-muted">{c.structureIntro}</p>
      <ul className="mt-6 border border-default">
        {c.tree.map(([folder, desc]) => (
          <li
            key={folder}
            className="flex flex-col gap-1 border-b border-default px-4 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="w-40 shrink-0 font-mono text-sm font-semibold">
              {folder}
            </span>
            <span className="text-sm text-muted">{desc}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">{c.decisionsTitle}</h2>
      <ul className="mt-6 space-y-4">
        {c.decisions.map(([title, body]) => (
          <li key={title} className="border-b border-default pb-4">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">{c.toolsTitle}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <li
            key={tool}
            className="border border-default px-3 py-2 font-mono text-xs"
          >
            {tool}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">{c.relatedTitle}</h2>
      <ul className="mt-6 space-y-4">
        {c.related.map(([name, href, desc]) => (
          <li key={name} className="border border-default p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-mono text-base font-semibold">{name}</h3>
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-block min-h-11 py-3 text-sm font-semibold underline underline-offset-4"
              >
                {lang === "pt" ? "Ver" : "View"}{" "}
                {href.startsWith("http") ? "↗" : "→"}
              </a>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </li>
        ))}
      </ul>

      <a
        href="/#contact"
        className="mt-10 inline-block bg-black px-6 py-3 text-sm text-white"
      >
        {c.cta} →
      </a>
    </main>
  );
}
