"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Moon from "@/components/Moon";

/**
 * Envolve Hero + Sobre e faz o planeta viajar continuamente pelas duas
 * seções: grande no Hero, encolhe e desloca durante a transição, pequeno
 * e presente no Sobre — a mesma câmera atravessando o mesmo espaço, não
 * um elemento que desaparece e outro que aparece.
 *
 * ARQUITETURA (revisão importante): nao existe nenhum efeito de "sumir".
 * A lua e `position: sticky` (presa na tela) só durante o Hero + a
 * transição. Assim que ela chega na posição final do Sobre, o proprio
 * sticky nativo do CSS solta sozinho (e' assim que sticky sempre
 * funciona: fica preso so' enquanto sobra espaco de scroll no
 * container) — a partir dai' ela vira um elemento comum, PRESO NA
 * PAGINA (nao mais na tela), e rola embora junto com o resto do Sobre
 * exatamente como o texto da bio ou os cards rolam. Ela nunca e
 * escondida via display/opacity: ela so para de ser perseguida pela
 * camera. Tentativas anteriores tentaram ESTICAR o sticky pra ela
 * ficar presa na tela por mais tempo (com display:none pra tampar o
 * vazamento pra secao seguinte) — trocado por essa abordagem porque
 * qualquer "esconder" e' um efeito notavel, e o pedido era exatamente
 * o contrario: ela so' deve parar de seguir a tela, nunca "sumir".
 *
 * Técnica: CSS Grid com duas camadas na MESMA célula (col-start-1
 * row-start-1), não duas linhas empilhadas. Um elemento `sticky` ocupa
 * espaço próprio no fluxo normal igual a uma div comum da mesma altura —
 * colocá-lo como irmão *antes* do conteúdo empurraria tudo pra baixo em
 * h-screen. Sobrepondo na mesma célula, a altura do grid vem só do
 * conteúdo (Hero+Sobre), e a camada sticky gruda sem contar espaço extra.
 */
export default function HeroAboutJourney({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // fracao real (0-1) de onde o Hero termina dentro da altura total
  // Hero+Sobre. Breakpoints fixos (ex: 0.3) presumiam uma proporcao entre
  // as duas secoes que nao bate com o conteudo real — o Hero e ~100vh mas
  // o Sobre varia de tamanho, entao um numero fixo fazia a lua comecar a
  // encolher ainda dentro do Hero, antes do Sobre aparecer na tela.
  // Medido via DOM (altura do primeiro filho = Hero) em vez de chutado.
  const [heroFracao, setHeroFracao] = useState(0.55);

  // a lua so entra depois que o nome do Hero termina de se resolver
  // (animate-title: delay 0.2s + 2s de duracao = 2.2s), nao no instante em
  // que a pagina carrega — entrada por tempo, independente do scroll,
  // porque aos 0s de scroll o nome ainda esta em animacao.
  const [podeAparecer, setPodeAparecer] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPodeAparecer(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // viewport medido de verdade (nao chutado) — necessario pra calcular a
  // posicao final em pixels reais, ja que o ponto de partida (bottom:-20%,
  // left:-10%) e um recorte proposital que só existe fora da tela.
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  // altura real da bio (coluna esquerda do Sobre, marcada com
  // data-bio-col em About.tsx). Ela e sticky em top-24 (96px) e fica
  // PARADA nessa posicao o tempo todo que o Sobre esta na tela — entao
  // "96px + altura dela + folga" e uma zona proibida constante pra lua,
  // nao importa o quanto o usuario role dentro do Sobre.
  const [bioAlturaPx, setBioAlturaPx] = useState(260);

  // altura real do conteudo (Hero+Sobre) — so usada pra calcular ONDE o
  // sticky nativo solta sozinho (contentH - viewportH), garantindo que
  // a transicao termine ANTES desse ponto. Nao existe mais nenhum
  // "buffer" somado aqui — a altura e so pra fins de calculo, o sticky
  // usa o espaco natural do conteudo, sem esticar nada.
  const [conteudoAlturaPx, setConteudoAlturaPx] = useState(1600);

  useLayoutEffect(() => {
    function medir() {
      const container = contentRef.current;
      if (!container) return;
      const hero = container.firstElementChild as HTMLElement | null;
      if (!hero) return;
      const alturaTotal = container.offsetHeight;
      if (alturaTotal > 0) {
        setHeroFracao(hero.offsetHeight / alturaTotal);
        setConteudoAlturaPx(alturaTotal);
      }
      const bio = container.querySelector("[data-bio-col]") as HTMLElement | null;
      if (bio) {
        setBioAlturaPx(bio.offsetHeight);
      }
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  // A caixa (520px) fica ancorada em bottom:-20%/left:-10% do container
  // (h-screen) — de proposito cortada pelas duas bordas no Hero. Sem essa
  // conta, o x/y (que sao % da PROPRIA caixa, nao da tela) so empurra a
  // partir desse ponto cortado, e nunca garante que o circulo entre
  // inteiro na tela. Aqui calculamos, em pixel real, onde o CENTRO da
  // caixa esta no estado "Hero" (scale 1, sem translate) e onde
  // queremos que ele fique no estado "Sobre".
  const BOX = 520;
  // 0.28 (era 0.32): menor libera mais espaco de sobra pro dwell (ver
  // bufferMaximoSemSobrepor abaixo — um raio menor aumenta diretamente
  // quanto da pra esticar o tempo parado sem arriscar sobrepor a
  // proxima secao).
  const ESCALA_SOBRE = 0.28;
  const centroHeroX = -0.1 * viewport.w + BOX / 2;
  const centroHeroY = 1.2 * viewport.h - BOX / 2;
  const raioSobre = (BOX * ESCALA_SOBRE) / 2;

  // alvo: encostada na zona proibida da bio, SEM folga extra (era
  // "+20") — cada pixel mais perto do topo da zona segura vira pixel a
  // mais de dwell disponivel. Isso importa pro sticky soltar direito:
  // uma vez que o sticky solta (perto do fim do Sobre) a lua passa a
  // rolar 1:1 com a pagina, junto com tudo — a partir dai a distancia
  // dela ate a proxima secao NUNCA MUDA (as duas rolam juntas). Ficar
  // o mais perto possivel do topo da zona segura maximiza essa
  // distancia fixa, e portanto o dwell.
  const zonaProibidaAteY = 96 + bioAlturaPx + 40; // top-24 (96px) + bio + folga
  const centroSobreX = Math.max(0.14 * viewport.w, raioSobre + 24);
  const centroSobreY = Math.min(zonaProibidaAteY + raioSobre, viewport.h - raioSobre - 24);
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  // pontos da jornada: grande e parada no Hero, transicao curta,
  // PARADA DE VERDADE no Sobre (dwell), e SAIDA RAPIDA controlada.
  //
  // CRITERIO CERTO (corrigido apos o usuario mostrar 2 prints): nao
  // basta a lua nao COLIDIR em pixel com o Acorde — ela nao pode nem
  // estar na tela ao MESMO TEMPO que qualquer pedaco do Acorde ja
  // apareceu, mesmo sem tocar nele. O Acorde comeca a aparecer (top
  // toca o fundo da viewport) sempre em scrollY = alturaConteudo -
  // alturaTela — esse ponto NAO muda com buffer nenhum (a margem
  // negativa so cancela o espaco extra na pagina, nao move onde o
  // Acorde realmente comeca). Entao TODA a jornada (transicao + dwell
  // + saida) tem que terminar ANTES desse ponto. Isso limita o dwell
  // de verdade: dwell = altura do Sobre sozinho - altura da tela -
  // transicao - saida - folga. Quanto mais alto o Sobre, mais dwell —
  // por isso o espacamento de About.tsx foi aumentado (ver comentario
  // la).
  const heroFracaoPx = heroFracao * conteudoAlturaPx;
  const TRANSICAO_PX = 70;
  const SAIDA_PX = 80;
  const FOLGA_SEGURANCA = 20;

  const acordeApareceEmPx = conteudoAlturaPx - viewport.h;
  const fimTransicaoPx = heroFracaoPx + TRANSICAO_PX;
  const dwellDisponivelPx = Math.max(0, acordeApareceEmPx - fimTransicaoPx - SAIDA_PX - FOLGA_SEGURANCA);
  const saidaComecaPx = fimTransicaoPx + dwellDisponivelPx;
  const saidaFimPx = saidaComecaPx + SAIDA_PX;

  // o sticky nativo so fica grudado ate "altura do container - altura
  // da tela". O buffer aqui e' só uma garantia tecnica: sem ele, em
  // telas onde o Sobre sozinho e mais baixo que a propria tela, esse
  // ponto de soltura cairia ANTES da transicao terminar, quebrando a
  // jornada (a lua sairia da tela ainda gigante, no meio do Hero). Ele
  // NAO afeta o calculo do dwell acima (que usa a altura REAL do
  // conteudo, sem buffer) nem o momento em que o Acorde aparece (que
  // tambem nao muda com o buffer, ja que a margem negativa cancela
  // exatamente esse espaco extra). O `marginBottom` negativo do mesmo
  // tamanho evita um vao em branco antes de Projetos.
  const bufferNecessario = Math.max(0, saidaFimPx + FOLGA_SEGURANCA - acordeApareceEmPx);
  const alturaComBuffer = conteudoAlturaPx + bufferNecessario;
  const decorativaVisivel = viewport.w >= 1024;
  const margemCompensacao = decorativaVisivel ? -bufferNecessario : 0;

  // IMPORTANTE: com offset ["start start", "end end"], o scrollYProgress
  // do motion NAO mede 0-1 sobre a altura total do container — mede
  // sobre "altura do container - altura da tela" (progress=1 e' quando
  // o FIM do container encosta no FIM da viewport, o que acontece em
  // scrollY = alturaContainer - alturaTela, nao em scrollY =
  // alturaContainer). Dividir pelo denominador errado (jeito que uma
  // versao anterior fazia) faz TODOS os breakpoints ficarem fora de
  // escala — foi assim que a lua apareceu direto na posicao de SAIDA
  // ainda no meio do dwell esperado, achado rolando de verdade.
  const denominadorProgress = alturaComBuffer - viewport.h;
  const heroFracaoAjustada = heroFracaoPx / denominadorProgress;
  const fimTransicao = fimTransicaoPx / denominadorProgress;
  const saidaComeca = saidaComecaPx / denominadorProgress;
  const saidaFim = Math.min(saidaFimPx / denominadorProgress, 0.98);

  // alvo da saida: MESMO x, y bem mais negativo — o suficiente pra
  // cobrir qualquer altura de tela (centroSobreY + raioSobre e' quanto
  // falta, em pixel de tela, pra borda de baixo da lua sair do topo da
  // viewport a partir da posicao de dwell; +80 de folga extra).
  const ySaidaPct = ySobrePct - ((centroSobreY + raioSobre + 80) / BOX) * 100;

  const scale = useTransform(
    scrollYProgress,
    [0, heroFracaoAjustada, fimTransicao, saidaComeca, saidaFim],
    [1, 1, ESCALA_SOBRE, ESCALA_SOBRE, ESCALA_SOBRE],
  );
  const x = useTransform(
    scrollYProgress,
    [0, heroFracaoAjustada, fimTransicao, saidaComeca, saidaFim],
    ["0%", "0%", `${xSobrePct}%`, `${xSobrePct}%`, `${xSobrePct}%`],
  );
  const y = useTransform(
    scrollYProgress,
    [0, heroFracaoAjustada, fimTransicao, saidaComeca, saidaFim],
    ["0%", "0%", `${ySobrePct}%`, `${ySobrePct}%`, `${ySaidaPct}%`],
  );

  return (
    <div ref={ref} className="grid" style={{ marginBottom: margemCompensacao }}>
      {/* sem altura fixa aqui: precisa esticar pra altura da celula do
          grid inteira (Hero+Sobre), senao a div sticky de dentro so tem
          h-screen de "pista" pra colar e solta a lua logo apos o Hero.
          hidden abaixo de lg: em telas pequenas o Sobre vira coluna
          unica (about.tsx usa lg:grid-cols-2) e o layout fica apertado
          demais pra sobrar espaco decorativo — a lua some no mobile de
          proposito. altura explicita = alturaComBuffer: normalmente
          igual ao conteudo (buffer=0), so cresce quando o Sobre sozinho
          e mais baixo que a tela (ver bufferNecessario acima). */}
      <div
        className="pointer-events-none relative col-start-1 row-start-1 hidden lg:block"
        style={{ height: alturaComBuffer }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute"
            // referencia enviada: um arco grande cortado por duas bordas ao
            // mesmo tempo (esquerda + baixo), nao o disco quase inteiro que
            // ficou em -6%/1% (achado "muito visivel") nem a fatia pequena
            // demais de -30%/-16% (achado "nao parece redondo"). Meio-termo.
            style={{ width: 520, height: 520, bottom: "-20%", left: "-10%", scale, x, y }}
          >
            {/* entrada por tempo (opacity + escala pequena), separada do
                scale de scroll acima — nao existe mais scale ligado ao
                scroll, entao esta e a UNICA animacao de escala da lua */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={podeAparecer ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <div
                className="absolute rounded-full border border-black/[0.07]"
                style={{ width: 660, height: 660, top: -70, left: -70 }}
              />
              <Moon size={520} progress={scrollYProgress} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* self-start: quando o buffer dinamico entra em cena (Sobre curto
          pra tela), a camada decorativa fica mais alta que o conteudo —
          sem self-start o grid esticaria esta celula pra acompanhar,
          inflando `container.offsetHeight` medido acima (que alimenta o
          proprio buffer), um loop. self-start mantem a altura sempre
          igual ao conteudo real, nao a linha do grid. */}
      <div ref={contentRef} className="relative z-10 col-start-1 row-start-1 self-start">
        {children}
      </div>
    </div>
  );
}
