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
  const ESCALA_SOBRE = 0.32;
  const centroHeroX = -0.1 * viewport.w + BOX / 2;
  const centroHeroY = 1.2 * viewport.h - BOX / 2;
  const raioSobre = (BOX * ESCALA_SOBRE) / 2;

  // alvo: canto inferior-esquerdo, ENCOSTADA na zona proibida da bio
  // (nao no rodape da tela). Isso importa pro sticky soltar direito:
  // uma vez que o sticky solta (perto do fim do Sobre) a lua passa a
  // rolar 1:1 com a pagina, junto com tudo — a partir dai a distancia
  // dela ate a proxima secao NUNCA MUDA (as duas rolam juntas). Ficar
  // colada no topo da zona segura (logo abaixo da bio) em vez de colada
  // no rodape da tela maximiza essa distancia fixa, garantindo que ela
  // ja esta bem acima de onde a proxima secao comeca quando as duas
  // ficarem visiveis ao mesmo tempo.
  const zonaProibidaAteY = 96 + bioAlturaPx + 40; // top-24 (96px) + bio + folga
  const centroSobreX = Math.max(0.14 * viewport.w, raioSobre + 24);
  const centroSobreY = Math.min(zonaProibidaAteY + raioSobre + 20, viewport.h - raioSobre - 24);
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  // pontos da jornada: grande e parada enquanto o Hero ocupa a tela
  // (0-heroFracao), transicao curta logo que o Sobre comeca a aparecer,
  // depois parada no Sobre — os dois ultimos valores de cada array sao
  // IGUAIS de proposito, sem deriva residual.
  //
  // O sticky nativo solta sozinho em "altura do container - altura da
  // tela" (e' assim que sticky sempre funciona). Se o Sobre (sozinho,
  // sem o Hero) for mais BAIXO que a propria tela — comum em telas
  // largas/altas com pouco texto — esse ponto de soltura cai ANTES do
  // Hero nem ter terminado, o que quebraria a jornada inteira (a lua
  // sairia da tela ainda gigante, no meio do Hero). BUFFER DINAMICO:
  // soma altura extra ao container SO' na medida exata que falta pra
  // garantir pelo menos um pouco de transicao depois do Hero — quando o
  // Sobre ja e' alto o bastante por si so, o buffer fica em 0 (nao
  // estica nada). O `marginBottom` negativo do mesmo tamanho cancela
  // esse espaco extra na pagina, senao apareceria um vao antes de
  // Projetos.
  const heroFracaoPx = heroFracao * conteudoAlturaPx;
  const TRANSICAO_MINIMA_PX = 70;
  const bufferDesejado = Math.max(0, heroFracaoPx + TRANSICAO_MINIMA_PX - (conteudoAlturaPx - viewport.h));
  // TETO DE SEGURANCA: um buffer grande demais (Sobre MUITO curto pra
  // tela) empurra o ponto de soltura tao pra frente que a lua, ja
  // parada na posicao final, acabaria "nascendo" (em coordenada de
  // pagina) DENTRO da area da proxima secao — sobreposicao garantida
  // assim que as duas rolarem juntas. O teto abaixo nunca deixa o
  // buffer passar desse limite, mesmo que isso, num caso bem extremo
  // (tablet vertical com Sobre curtissimo), deixe a transicao um pouco
  // mais abrupta — prioridade e' nunca sobrepor a proxima secao.
  const margemAteAcorde = 40;
  const bufferMaximoSemSobrepor = Math.max(0, viewport.h - centroSobreY - raioSobre - margemAteAcorde);
  const bufferNecessario = Math.min(bufferDesejado, bufferMaximoSemSobrepor);
  const alturaComBuffer = conteudoAlturaPx + bufferNecessario;
  const decorativaVisivel = viewport.w >= 1024;
  const margemCompensacao = decorativaVisivel ? -bufferNecessario : 0;

  const soltaSozinhoEmPx = alturaComBuffer - viewport.h;
  const folgaSeguranca = 30;
  const fimTransicaoPx = Math.max(heroFracaoPx + 40, soltaSozinhoEmPx - folgaSeguranca);

  // IMPORTANTE: o scrollYProgress do motion mede 0-1 sobre a altura
  // RENDERIZADA do container (que e' `alturaComBuffer` quando o buffer
  // existe, nao `conteudoAlturaPx`) — as duas fracoes abaixo tem que
  // dividir pelo MESMO denominador que o motion usa, senao os
  // breakpoints do useTransform ficam fora de escala assim que o buffer
  // entra em cena.
  const heroFracaoAjustada = heroFracaoPx / alturaComBuffer;
  const fimTransicao = Math.min(fimTransicaoPx / alturaComBuffer, 0.95);

  const scale = useTransform(scrollYProgress, [0, heroFracaoAjustada, fimTransicao, 1], [1, 1, ESCALA_SOBRE, ESCALA_SOBRE]);
  const x = useTransform(scrollYProgress, [0, heroFracaoAjustada, fimTransicao, 1], ["0%", "0%", `${xSobrePct}%`, `${xSobrePct}%`]);
  const y = useTransform(scrollYProgress, [0, heroFracaoAjustada, fimTransicao, 1], ["0%", "0%", `${ySobrePct}%`, `${ySobrePct}%`]);

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
