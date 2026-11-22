"use client";
import { useLanguage } from "@/lib/context";

const REPO = "https://github.com/ggvinos/claude-skills";

const skills = [
  {
    name: "ticket-validation",
    url: `${REPO}/tree/main/ticket-validation`,
    pt: {
      what: "Conduz a validação de um ticket do começo ao fim com notas em Markdown: lê o ticket e o código alterado, monta riscos em visão de QA e um plano de testes, retoma a validação quando o dev devolve e fecha com a lista de testes e o texto de fechamento.",
      why: "Cada validação deixa o mesmo registro, com evidências e bugs classificados por severidade, sem depender de memória.",
      triggers: ["vamos validar o card", "voltou do dev", "validei"],
    },
    en: {
      what: "Runs a ticket validation end to end with Markdown notes: reads the ticket and the changed code, builds risks from a QA point of view and a test plan, resumes when the dev sends it back, and closes with the test list and a wrap-up text.",
      why: "Every validation leaves the same record, with evidence and bugs ranked by severity, without relying on memory.",
      triggers: ["vamos validar o card", "voltou do dev", "validei"],
    },
  },
  {
    name: "work-digest",
    url: `${REPO}/tree/main/work-digest`,
    pt: {
      what: "Escolhe os 3 itens de maior impacto da semana, com nome resumido e motivos, e lista as pendências que continuam abertas, agrupadas por situação.",
      why: "Transforma o histórico de notas em material pronto para daily, relatório e conversa com gestor.",
      triggers: ["top 3 da semana", "o que mexi essa semana", "pendências"],
    },
    en: {
      what: "Picks the 3 highest-impact items of the week, with a short name and reasons, and lists the pending work still open, grouped by situation.",
      why: "Turns the note history into material ready for a daily, a report or a conversation with a manager.",
      triggers: ["top 3 da semana", "o que mexi essa semana", "pendências"],
    },
  },
  {
    name: "session-sorter",
    url: `${REPO}/tree/main/session-sorter`,
    pt: {
      what: "Varre as sessões do Claude Desktop, coloca cada uma no grupo certo da barra lateral pelo status do título e sugere o que arquivar, sem apagar nada.",
      why: "Para quem trabalha em várias frentes ao mesmo tempo: a barra lateral vira um quadro de status.",
      triggers: ["organiza minhas sessões", "arruma a barra lateral"],
    },
    en: {
      what: "Scans Claude Desktop sessions, puts each one in the right sidebar group based on the status in its title and suggests what to archive, deleting nothing.",
      why: "For people working on several fronts at once: the sidebar becomes a status board.",
      triggers: ["organiza minhas sessões", "arruma a barra lateral"],
    },
  },
  {
    name: "focus-blocks",
    url: `${REPO}/tree/main/focus-blocks`,
    pt: {
      what: "Muda o estilo das respostas para blocos curtos e lógicos: ação primeiro, uma ideia por bloco, passos numerados e um único próximo passo. Persiste até ser desligada.",
      why: "Pensada para TDAH: texto corrido cansa e esconde o que importa. Dá para começar a agir sem reler.",
      triggers: ["modo foco", "em blocos", "não entendi"],
    },
    en: {
      what: "Switches answers to short, logical blocks: action first, one idea per block, numbered steps and a single next step. Stays on until turned off.",
      why: "Designed for ADHD: long prose is tiring and hides what matters. You can start acting without rereading.",
      triggers: ["modo foco", "em blocos", "não entendi"],
    },
  },
  {
    name: "ai-council",
    url: `${REPO}/tree/main/ai-council`,
    pt: {
      what: "Passa uma decisão por 5 conselheiros independentes, faz revisão cruzada anônima e entrega um veredito com consenso, tensões, ponto cego e próximos passos. Baseada na metodologia LLM Council de Karpathy.",
      why: "Para testar uma ideia antes de assumi-la, quando um \"sim, boa ideia\" seria perigoso.",
      triggers: ["conselho nisso", "sala de guerra", "council this"],
    },
    en: {
      what: "Runs a decision through 5 independent advisors, does an anonymous cross-review and delivers a verdict with consensus, tensions, blind spot and next steps. Based on Karpathy's LLM Council method.",
      why: "To test an idea before committing to it, when an easy \"yes, good idea\" would be dangerous.",
      triggers: ["conselho nisso", "sala de guerra", "council this"],
    },
  },
  {
    name: "qa-copilot",
    url: "https://github.com/ggvinos/qa-copilot",
    pt: {
      what: "Lê um ticket (Jira, Linear, Notion ou GitHub Issues), monta um plano de teste baseado em risco e em técnicas ISTQB, executa e documenta, sempre parando para confirmar antes de qualquer ação que mude estado.",
      why: "Teste com técnica, não com achismo, e com o QA humano no controle das decisões que importam. Repositório próprio.",
      triggers: ["validar ticket", "plano de teste"],
    },
    en: {
      what: "Reads a ticket (Jira, Linear, Notion or GitHub Issues), builds a risk-based test plan grounded in ISTQB techniques, executes and documents, always pausing for confirmation before any state-changing action.",
      why: "Testing with technique, not guesswork, with the human QA in control of the decisions that matter. Own repository.",
      triggers: ["validate ticket", "test plan"],
    },
  },
] as const;

export default function SkillsCase() {
  const { lang } = useLanguage();
  const pt = lang === "pt";
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {pt ? "PROJETO · CÓDIGO ABERTO" : "PROJECT · OPEN SOURCE"}
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        Claude Skills
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {pt
          ? "Skills que criei para o Claude Code para organizar meu trabalho de QA. Cada uma resolve uma tarefa repetitiva do dia a dia e é genérica: dá para usar em qualquer time, ferramenta e empresa."
          : "Skills I built for Claude Code to organize my QA work. Each one handles a repetitive daily task and is generic: it works for any team, tool and company."}
      </p>
      <a
        href={REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block min-h-11 py-3 text-sm font-semibold underline underline-offset-4"
      >
        {pt ? "Ver repositório no GitHub" : "View repository on GitHub"} ↗
      </a>

      <h2 className="mt-12 text-2xl font-semibold">
        {pt ? "As skills" : "The skills"}
      </h2>
      <ul className="mt-6 space-y-4">
        {skills.map((skill) => {
          const c = skill[pt ? "pt" : "en"];
          return (
            <li key={skill.name} className="border border-default p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-mono text-base font-semibold">
                  {skill.name}
                </h3>
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block min-h-11 py-3 text-sm font-semibold underline underline-offset-4"
                >
                  {pt ? "Ver no GitHub" : "View on GitHub"} ↗
                </a>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{c.what}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.why}</p>
              <ul
                aria-label={pt ? "Gatilhos" : "Triggers"}
                className="mt-4 flex flex-wrap gap-2"
              >
                {c.triggers.map((trigger) => (
                  <li
                    key={trigger}
                    className="border border-default px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {trigger}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">
        {pt ? "Como foram feitas" : "How they were built"}
      </h2>
      <ul className="mt-6 space-y-4 text-muted">
        {(pt
          ? [
              "Nasceram de rotinas reais de QA e foram generalizadas: sem nome de empresa, produto ou ferramenta específica.",
              "Rastreador somente leitura por regra: a skill gera o texto e o QA cola, nunca escreve no ticket sozinha.",
              "Só registram o que foi executado e confirmado. Item não testado vira pendência declarada.",
              "Escritas em Markdown, versionadas no GitHub e instaláveis copiando uma pasta.",
            ]
          : [
              "They came from real QA routines and were generalized: no company, product or specific tool names.",
              "Read-only tracker by rule: the skill drafts the text and the QA pastes it, never writing to the ticket on its own.",
              "They only record what was executed and confirmed. Untested items become declared pending work.",
              "Written in Markdown, versioned on GitHub and installable by copying a folder.",
            ]
        ).map((item) => (
          <li key={item} className="border-b border-default pb-4 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
      <a
        href="/#contact"
        className="mt-10 inline-block bg-black px-6 py-3 text-sm text-white"
      >
        {pt ? "Conversar sobre minha experiência" : "Discuss my experience"} →
      </a>
    </main>
  );
}
