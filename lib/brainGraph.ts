/** Grafo ilustrativo do vault: estrutura real, notas fictícias. Sem DOM, para rodar no navegador e em script. */

export type Lang = "pt" | "en";
export type GroupId =
  | "system"
  | "work"
  | "personal"
  | "career"
  | "reflect"
  | "ai"
  | "daily";

type Text = { pt: string; en: string };

export const GROUPS: Record<GroupId, { color: string; name: Text; desc: Text }> = {
  system: {
    color: "#f4f4f5",
    name: { pt: "Núcleo", en: "Core" },
    desc: {
      pt: "A Home, a Inbox e o changelog do vault. É por aqui que qualquer sessão começa a se orientar.",
      en: "The Home, the Inbox and the vault changelog. Every session starts getting its bearings here.",
    },
  },
  work: {
    color: "#8b9cff",
    name: { pt: "Trabalho", en: "Work" },
    desc: {
      pt: "Projetos, cards validados, referências e processos do trabalho. Tem um mapa de conteúdo com a lista completa.",
      en: "Work projects, validated cards, references and processes. It has a map of content with the full list.",
    },
  },
  personal: {
    color: "#7fd1a8",
    name: { pt: "Pessoal", en: "Personal" },
    desc: {
      pt: "Projetos próprios, identidade, rotina e finanças. Fica separado do trabalho de propósito.",
      en: "Own projects, identity, routine and finances. Kept apart from work on purpose.",
    },
  },
  career: {
    color: "#f0b86e",
    name: { pt: "Carreira", en: "Career" },
    desc: {
      pt: "A ponte entre os dois núcleos: estratégia, inglês, portfólio e estudos. Liga o que faço ao que quero fazer.",
      en: "The bridge between the two cores: strategy, English, portfolio and studies. It connects what I do to what I want to do.",
    },
  },
  reflect: {
    color: "#d98cc2",
    name: { pt: "Reflexões", en: "Reflections" },
    desc: {
      pt: "Pensamentos, logs e leituras que ainda não viraram projeto.",
      en: "Thoughts, logs and readings that have not become a project yet.",
    },
  },
  ai: {
    color: "#7dc4e8",
    name: { pt: "Sessões de IA", en: "AI sessions" },
    desc: {
      pt: "Cada conversa com IA vira uma nota, salva por um hook. É fonte secundária: dá contexto, mas o registro oficial mora nas notas temáticas.",
      en: "Each AI conversation becomes a note, saved by a hook. It is a secondary source: it gives context, but the official record lives in the topic notes.",
    },
  },
  daily: {
    color: "#a1a1aa",
    name: { pt: "Diário", en: "Daily" },
    desc: {
      pt: "Uma nota por dia, com o que foi feito e o que lembrar na daily. Linka para os cards do dia.",
      en: "One note per day, with what was done and what to bring up at the daily. It links to the day's cards.",
    },
  },
};

export const KINDS: Record<string, { name: Text; desc: Text }> = {
  home: {
    name: { pt: "Home", en: "Home" },
    desc: {
      pt: "Ponto de entrada do vault. Aponta para os núcleos e para o que está em andamento.",
      en: "The vault's entry point. It points to the cores and to what is in progress.",
    },
  },
  work: {
    name: { pt: "Trabalho", en: "Work" },
    desc: {
      pt: "Núcleo de trabalho. Concentra projetos, cards, referências e processos.",
      en: "The work core. It holds projects, cards, references and processes.",
    },
  },
  personal: {
    name: { pt: "Pessoal", en: "Personal" },
    desc: {
      pt: "Núcleo pessoal. Projetos próprios, identidade, rotina e finanças.",
      en: "The personal core. Own projects, identity, routine and finances.",
    },
  },
  career: {
    name: { pt: "Carreira", en: "Career" },
    desc: {
      pt: "Fica no meio dos dois núcleos e linka para os dois. É onde trabalho e vida pessoal se encontram.",
      en: "Sits between the two cores and links to both. It is where work and personal life meet.",
    },
  },
  reflect: {
    name: { pt: "Reflexões", en: "Reflections" },
    desc: {
      pt: "Pasta de pensamentos, logs e leituras.",
      en: "Folder for thoughts, logs and readings.",
    },
  },
  ai: {
    name: { pt: "Sessões de IA", en: "AI sessions" },
    desc: {
      pt: "Histórico das conversas com IA, registrado automaticamente.",
      en: "History of AI conversations, logged automatically.",
    },
  },
  daily: {
    name: { pt: "Diário", en: "Daily" },
    desc: {
      pt: "Pasta das notas diárias.",
      en: "Folder for the daily notes.",
    },
  },
  inbox: {
    name: { pt: "Inbox", en: "Inbox" },
    desc: {
      pt: "Capturas rápidas, sem contexto ainda. Quando ganham contexto, vão para o lugar certo.",
      en: "Quick captures with no context yet. Once they gain context, they move to the right place.",
    },
  },
  releases: {
    name: { pt: "Releases", en: "Releases" },
    desc: {
      pt: "Changelog do próprio vault. Consulto ao trocar de computador para saber o que mudou.",
      en: "Changelog of the vault itself. I check it when switching computers to see what changed.",
    },
  },
  wprojects: {
    name: { pt: "Projetos", en: "Projects" },
    desc: {
      pt: "Cada projeto de trabalho tem um hub, um changelog e um handoff.",
      en: "Each work project has a hub, a changelog and a handoff.",
    },
  },
  wcards: {
    name: { pt: "Cards", en: "Cards" },
    desc: {
      pt: "Uma nota por card validado, com riscos, plano de testes, evidências e bugs.",
      en: "One note per validated card, with risks, test plan, evidence and bugs.",
    },
  },
  wrefs: {
    name: { pt: "Referências", en: "References" },
    desc: {
      pt: "Conhecimento reutilizável: como as integrações e os ambientes se comportam.",
      en: "Reusable knowledge: how integrations and environments behave.",
    },
  },
  wprocess: {
    name: { pt: "Processos", en: "Processes" },
    desc: {
      pt: "Templates, padrões de validação e métricas de QA.",
      en: "Templates, validation standards and QA metrics.",
    },
  },
  pprojects: {
    name: { pt: "Projetos pessoais", en: "Personal projects" },
    desc: {
      pt: "Apps e ferramentas que construo por conta própria.",
      en: "Apps and tools I build on my own.",
    },
  },
  identity: {
    name: { pt: "Identidade", en: "Identity" },
    desc: {
      pt: "Valores, preferências e perfil. Ajuda a IA a me conhecer.",
      en: "Values, preferences and profile. It helps the AI get to know me.",
    },
  },
  life: {
    name: { pt: "Vida", en: "Life" },
    desc: {
      pt: "Treino, moradia, hobbies e organização do dia a dia.",
      en: "Training, housing, hobbies and day-to-day organization.",
    },
  },
  finance: {
    name: { pt: "Finanças", en: "Finances" },
    desc: {
      pt: "Controle financeiro pessoal do ano.",
      en: "Personal finance tracking for the year.",
    },
  },
  card: {
    name: { pt: "Nota de card", en: "Card note" },
    desc: {
      pt: "Registro de uma validação: riscos, testes executados, evidências e fechamento. Linka para o projeto e para as referências usadas.",
      en: "A validation record: risks, executed tests, evidence and wrap-up. It links to the project and the references used.",
    },
  },
  project: {
    name: { pt: "Nota de projeto", en: "Project note" },
    desc: {
      pt: "Hub, changelog ou handoff de um projeto. É a ponte de contexto entre sessões de IA.",
      en: "Hub, changelog or handoff of a project. It is the context bridge between AI sessions.",
    },
  },
  ref: {
    name: { pt: "Nota de referência", en: "Reference note" },
    desc: {
      pt: "Conhecimento que se repete em vários cards, escrito uma vez e linkado de volta.",
      en: "Knowledge that repeats across cards, written once and linked back.",
    },
  },
  process: {
    name: { pt: "Nota de processo", en: "Process note" },
    desc: {
      pt: "Um padrão que o time e as skills seguem, como o formato da lista de testes.",
      en: "A standard that the team and the skills follow, such as the test list format.",
    },
  },
  pproject: {
    name: { pt: "Projeto pessoal", en: "Personal project" },
    desc: {
      pt: "Nota de um projeto próprio, com decisões e pendências abertas.",
      en: "A note about an own project, with decisions and open items.",
    },
  },
  idnote: {
    name: { pt: "Nota de identidade", en: "Identity note" },
    desc: {
      pt: "Um traço do perfil que orienta como a IA deve responder.",
      en: "A profile trait that guides how the AI should answer.",
    },
  },
  lifenote: {
    name: { pt: "Nota de vida", en: "Life note" },
    desc: {
      pt: "Rotina, treino ou planejamento pessoal.",
      en: "Routine, training or personal planning.",
    },
  },
  fin: {
    name: { pt: "Nota financeira", en: "Finance note" },
    desc: {
      pt: "Planilha viva de um mês ou de um objetivo.",
      en: "A living sheet for a month or a goal.",
    },
  },
  reflection: {
    name: { pt: "Reflexão", en: "Reflection" },
    desc: {
      pt: "Um pensamento solto que pode virar projeto, carreira ou nada.",
      en: "A loose thought that may become a project, a career move or nothing.",
    },
  },
  session: {
    name: { pt: "Sessão de IA", en: "AI session" },
    desc: {
      pt: "Conversa salva por hook, com data, tags detectadas e links para os cards citados.",
      en: "A conversation saved by a hook, with date, detected tags and links to the cards mentioned.",
    },
  },
  day: {
    name: { pt: "Nota diária", en: "Daily note" },
    desc: {
      pt: "O dia em uma nota: cards mexidos, o que lembrar na daily e pendências.",
      en: "The day in one note: cards handled, what to bring up at the daily and open items.",
    },
  },
  release: {
    name: { pt: "Nota de release", en: "Release note" },
    desc: {
      pt: "Uma mudança no próprio vault: estrutura, plugin ou convenção nova.",
      en: "A change to the vault itself: structure, plugin or new convention.",
    },
  },
  capture: {
    name: { pt: "Captura", en: "Capture" },
    desc: {
      pt: "Uma ideia anotada na pressa, esperando contexto.",
      en: "An idea jotted down in a hurry, waiting for context.",
    },
  },
};

export type GNode = {
  id: string;
  group: GroupId;
  kind: string;
  hub: boolean;
  r: number;
  label?: Text;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed: boolean;
};
export type GLink = { a: number; b: number; len: number };
export type Graph = { nodes: GNode[]; links: GLink[] };

function rng(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(): Graph {
  const rand = rng(20261122);
  const nodes: GNode[] = [];
  const links: GLink[] = [];
  const index = new Map<string, number>();
  const add = (
    id: string,
    group: GroupId,
    kind: string,
    hub: boolean,
    r: number,
    label?: Text,
  ) => {
    const angle = rand() * Math.PI * 2;
    const dist = 0.2 + rand() * 0.8;
    index.set(id, nodes.length);
    nodes.push({
      id,
      group,
      kind,
      hub,
      r,
      label,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      vx: 0,
      vy: 0,
      fixed: false,
    });
  };
  const link = (a: string, b: string, len: number) => {
    const ia = index.get(a);
    const ib = index.get(b);
    if (ia === undefined || ib === undefined || ia === ib) return;
    if (links.some((l) => (l.a === ia && l.b === ib) || (l.a === ib && l.b === ia))) return;
    links.push({ a: ia, b: ib, len });
  };

  add("home", "system", "home", true, 9, { pt: "Home", en: "Home" });
  const hubs: [string, GroupId, string, number, Text, string][] = [
    ["work", "work", "work", 7, { pt: "Trabalho", en: "Work" }, "home"],
    ["personal", "personal", "personal", 7, { pt: "Pessoal", en: "Personal" }, "home"],
    ["career", "career", "career", 7, { pt: "Carreira", en: "Career" }, "home"],
    ["reflect", "reflect", "reflect", 5, { pt: "Reflexões", en: "Reflections" }, "home"],
    ["ai", "ai", "ai", 6, { pt: "Sessões de IA", en: "AI sessions" }, "home"],
    ["daily", "daily", "daily", 5.5, { pt: "Diário", en: "Daily" }, "home"],
    ["inbox", "system", "inbox", 4.5, { pt: "Inbox", en: "Inbox" }, "home"],
    ["releases", "system", "releases", 4.5, { pt: "Releases", en: "Releases" }, "home"],
    ["wprojects", "work", "wprojects", 5, { pt: "Projetos", en: "Projects" }, "work"],
    ["wcards", "work", "wcards", 5.5, { pt: "Cards", en: "Cards" }, "work"],
    ["wrefs", "work", "wrefs", 5, { pt: "Referências", en: "References" }, "work"],
    ["wprocess", "work", "wprocess", 5, { pt: "Processos", en: "Processes" }, "work"],
    ["pprojects", "personal", "pprojects", 5, { pt: "Projetos pessoais", en: "Personal projects" }, "personal"],
    ["identity", "personal", "identity", 4.5, { pt: "Identidade", en: "Identity" }, "personal"],
    ["life", "personal", "life", 4.5, { pt: "Vida", en: "Life" }, "personal"],
    ["finance", "personal", "finance", 4.5, { pt: "Finanças", en: "Finances" }, "personal"],
  ];
  for (const [id, group, kind, r, label] of hubs) add(id, group, kind, true, r, label);
  for (const [id, , , , , parent] of hubs) link(id, parent, parent === "home" ? 0.34 : 0.26);
  link("career", "work", 0.4);
  link("career", "personal", 0.4);

  const sats: [string, GroupId, string, string, number][] = [
    ["card", "work", "card", "wcards", 16],
    ["project", "work", "project", "wprojects", 8],
    ["ref", "work", "ref", "wrefs", 8],
    ["process", "work", "process", "wprocess", 5],
    ["pproject", "personal", "pproject", "pprojects", 5],
    ["idnote", "personal", "idnote", "identity", 3],
    ["lifenote", "personal", "lifenote", "life", 6],
    ["fin", "personal", "fin", "finance", 3],
    ["reflection", "reflect", "reflection", "reflect", 5],
    ["session", "ai", "session", "ai", 18],
    ["day", "daily", "day", "daily", 14],
    ["release", "system", "release", "releases", 4],
    ["capture", "system", "capture", "inbox", 2],
  ];
  const ids: Record<string, string[]> = {};
  for (const [prefix, group, kind, parent, count] of sats) {
    ids[prefix] = [];
    for (let i = 0; i < count; i++) {
      const id = `${prefix}-${i}`;
      add(id, group, kind, false, 2.2 + rand() * 1.1);
      link(id, parent, 0.12 + rand() * 0.05);
      ids[prefix].push(id);
    }
  }
  const pick = (list: string[]) => list[Math.floor(rand() * list.length)];
  for (const id of ids.day) {
    link(id, pick(ids.card), 0.24);
    if (rand() > 0.75) link(id, pick(ids.session), 0.26);
  }
  for (const id of ids.session) {
    link(id, pick(rand() > 0.35 ? ids.card : ids.pproject), 0.26);
    if (rand() > 0.85) link(id, pick(ids.project), 0.26);
  }
  for (const id of ids.card) {
    link(id, pick(ids.ref), 0.24);
    if (rand() > 0.5) link(id, pick(ids.project), 0.24);
    if (rand() > 0.75) link(id, pick(ids.card), 0.22);
  }
  for (const id of ids.project) link(id, pick(ids.process), 0.26);
  for (const id of ids.release) link(id, pick(ids.process), 0.28);
  for (const id of ids.reflection) link(id, "career", 0.3);
  for (const id of ids.pproject.slice(0, 3)) link(id, "career", 0.32);
  for (const id of ids.project.slice(0, 3)) link(id, "career", 0.34);
  for (const id of ids.idnote) link(id, "career", 0.34);
  return { nodes, links };
}

export function tick(graph: Graph, alpha: number) {
  const { nodes, links } = graph;
  const n = nodes.length;
  for (let i = 0; i < n; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < n; j++) {
      const b = nodes[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 1e-6) {
        dx = (i % 2 ? 1 : -1) * 0.001;
        dy = 0.001;
        d2 = 1e-6;
      }
      const d = Math.sqrt(d2);
      const strength = 0.0042 * (a.hub ? 2.6 : 1) * (b.hub ? 2.6 : 1) ** 0.5;
      const f = (strength * alpha) / Math.max(d2, 0.003);
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      if (!a.fixed) {
        a.vx -= fx;
        a.vy -= fy;
      }
      if (!b.fixed) {
        b.vx += fx;
        b.vy += fy;
      }
    }
  }
  for (const l of links) {
    const a = nodes[l.a];
    const b = nodes[l.b];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1e-6;
    const f = (d - l.len) * 0.22 * alpha;
    const fx = (dx / d) * f;
    const fy = (dy / d) * f;
    if (!a.fixed) {
      a.vx += fx;
      a.vy += fy;
    }
    if (!b.fixed) {
      b.vx -= fx;
      b.vy -= fy;
    }
  }
  for (const nd of nodes) {
    if (nd.fixed) {
      nd.vx = 0;
      nd.vy = 0;
      continue;
    }
    nd.vx -= nd.x * 0.05 * alpha;
    nd.vy -= nd.y * 0.05 * alpha;
    nd.vx *= 0.78;
    nd.vy *= 0.78;
    nd.x += nd.vx;
    nd.y += nd.vy;
  }
}

export function settledGraph(ticks = 420): Graph {
  const g = buildGraph();
  for (let i = 0; i < ticks; i++) tick(g, Math.max(0.04, 1 - i / ticks));
  return g;
}

export function bounds(nodes: GNode[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x);
    maxY = Math.max(maxY, n.y);
  }
  return { minX, minY, maxX, maxY };
}
