"use client";
import { useLanguage } from "@/lib/context";

const REPO = "https://github.com/ggvinos/claude-skills";

const skills = [
  {
    name: "validar",
    url: `${REPO}/tree/main/validar`,
    pt: {
      what: "Inicia a validação de um card: pede o link, lê o card e o código alterado e cria a nota com riscos em visão de QA e plano de testes.",
      why: "Todo card começa do mesmo jeito, com o contexto completo antes do primeiro teste.",
      triggers: ["/validar","vamos validar o card"],
    },
    en: {
      what: "Starts a card validation: takes the link, reads the card and the changed code and creates the note with QA-view risks and a test plan.",
      why: "Every card starts the same way, with full context before the first test.",
      triggers: ["/validar","vamos validar o card"],
    },
  },
  {
    name: "retornou",
    url: `${REPO}/tree/main/retornou`,
    pt: {
      what: "Retoma a validação quando o card volta do dev: lê o que mudou e atualiza a nota com o que revalidar.",
      why: "Nada é marcado como corrigido antes de ser testado de novo.",
      triggers: ["/retornou","voltou do dev"],
    },
    en: {
      what: "Resumes validation when the card comes back from dev: reads what changed and updates the note with what to retest.",
      why: "Nothing is marked fixed before it is tested again.",
      triggers: ["/retornou","voltou do dev"],
    },
  },
  {
    name: "finalizar-card",
    url: `${REPO}/tree/main/finalizar-card`,
    pt: {
      what: "Fecha a validação: lista de testes no padrão Jira, texto corrido de fechamento e organização das notas. Também cobre reprovação.",
      why: "Só entra o que foi executado e confirmado, e o texto sai pronto para colar.",
      triggers: ["/finalizar-card","validei"],
    },
    en: {
      what: "Closes the validation: Jira-style test list, a prose wrap-up text and note organization. Also covers rejection.",
      why: "Only what was executed and confirmed goes in, and the text is ready to paste.",
      triggers: ["/finalizar-card","validei"],
    },
  },
  {
    name: "jira-lista-validados",
    url: `${REPO}/tree/main/jira-lista-validados`,
    pt: {
      what: "Gera só a lista de testes validados e o texto de fechamento, prontos para colar no Jira.",
      why: "Para quando a validação já foi feita e falta só o registro.",
      triggers: ["/jira-lista-validados","lista de testes validados"],
    },
    en: {
      what: "Generates only the validated test list and wrap-up text, ready to paste into Jira.",
      why: "For when validation is done and only the record is missing.",
      triggers: ["/jira-lista-validados","lista de testes validados"],
    },
  },
  {
    name: "top-cards-semana",
    url: `${REPO}/tree/main/top-cards-semana`,
    pt: {
      what: "Escolhe os 3 cards de maior impacto da semana, com nome resumido e motivos.",
      why: "Transforma o histórico de notas em material pronto para daily, relatório e conversa com gestor.",
      triggers: ["/top-cards-semana","top 3 da semana"],
    },
    en: {
      what: "Picks the 3 highest-impact cards of the week, with a short name and reasons.",
      why: "Turns the note history into material ready for a daily, a report or a manager conversation.",
      triggers: ["/top-cards-semana","top 3 da semana"],
    },
  },
  {
    name: "organizar-sessoes",
    url: `${REPO}/tree/main/organizar-sessoes`,
    pt: {
      what: "Varre as sessões do Claude Desktop, coloca cada uma no grupo certo da barra lateral e sugere o que arquivar, sem apagar nada.",
      why: "Para quem trabalha em várias frentes ao mesmo tempo: a barra lateral vira um quadro de status.",
      triggers: ["/organizar-sessoes","arruma a barra lateral"],
    },
    en: {
      what: "Scans Claude Desktop sessions, puts each in the right sidebar group and suggests what to archive, deleting nothing.",
      why: "For people working on several fronts at once: the sidebar becomes a status board.",
      triggers: ["/organizar-sessoes","arruma a barra lateral"],
    },
  },
  {
    name: "focus-blocks",
    url: `${REPO}/tree/main/focus-blocks`,
    pt: {
      what: "Muda o estilo das respostas para blocos curtos e lógicos: ação primeiro, uma ideia por bloco e um único próximo passo. Persiste até ser desligada.",
      why: "Pensada para TDAH: texto corrido cansa e esconde o que importa.",
      triggers: ["modo foco","em blocos","não entendi"],
    },
    en: {
      what: "Switches answers to short logical blocks: action first, one idea per block and a single next step. Stays on until turned off.",
      why: "Designed for ADHD: long prose is tiring and hides what matters.",
      triggers: ["modo foco","em blocos","não entendi"],
    },
  },
  {
    name: "ai-council",
    url: `${REPO}/tree/main/ai-council`,
    pt: {
      what: "Passa uma decisão por 5 conselheiros independentes, faz revisão cruzada anônima e entrega um veredito. Baseada no LLM Council de Karpathy.",
      why: "Para testar uma ideia antes de assumi-la, quando um \"sim, boa ideia\" seria perigoso.",
      triggers: ["conselho nisso","sala de guerra","council this"],
    },
    en: {
      what: "Runs a decision through 5 independent advisors, does an anonymous cross-review and delivers a verdict. Based on Karpathy's LLM Council.",
      why: "To test an idea before committing, when an easy \"yes, good idea\" would be dangerous.",
      triggers: ["conselho nisso","sala de guerra","council this"],
    },
  },
  {
    name: "qa-copilot",
    url: "https://github.com/ggvinos/qa-copilot",
    pt: {
      what: "Lê um ticket, monta um plano de teste baseado em risco e técnicas ISTQB, executa e documenta, sempre confirmando antes de qualquer ação que mude estado. Repositório próprio.",
      why: "Teste com técnica, não com achismo, e com o QA humano no controle.",
      triggers: ["validar ticket","plano de teste"],
    },
    en: {
      what: "Reads a ticket, builds a risk-based test plan with ISTQB techniques, executes and documents, always confirming before any state-changing action. Own repository.",
      why: "Testing with technique, not guesswork, with the human QA in control.",
      triggers: ["validar ticket","plano de teste"],
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
