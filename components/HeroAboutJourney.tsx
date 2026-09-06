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
  const moonBoxRef = useRef<HTMLDivElement>(null);
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

  // altura real do conteudo (Hero+Sobre) — necessaria pro fix do sticky
  // logo abaixo. Sem isso nao da pra calcular quanto de "folga" o sticky
  // precisa pra ficar grudado ate o fim do Sobre.
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

  // pontos da jornada: grande e parada enquanto o Hero ocupa a tela
  // (0-heroFracao), transicao curta logo que o Sobre comeca a aparecer
  // (heroFracao a +0.2), depois PARADA DE VERDADE no Sobre — os dois
  // ultimos valores de cada array sao IGUAIS de proposito, sem deriva
  // residual depois que chega na posicao final. Janela alargada (era
  // +0.12) a pedido do usuario pra ficar mais suave, menos abrupta.
  const fimTransicao = Math.min(heroFracao + 0.2, 0.95);

  // A caixa (520px) fica ancorada em bottom:-20%/left:-10% do container
  // (h-screen) — de proposito cortada pelas duas bordas no Hero. Sem essa
  // conta, o x/y (que sao % da PROPRIA caixa, nao da tela) so empurra a
  // partir desse ponto cortado, e nunca garante que o circulo entre
  // inteiro na tela: ficou cortado em tentativas anteriores.
  // Aqui calculamos, em pixel real, onde o CENTRO da caixa esta no estado
  // "Hero" (scale 1, sem translate) e onde queremos que ele fique no
  // estado "Sobre".
  const BOX = 520;
  // 0.32 (era 0.4): reduzido a pedido do usuario pra garantir folga de
  // sobra e a lua aparecer inteira, sem chegar perto de nenhuma borda.
  const ESCALA_SOBRE = 0.32;
  const centroHeroX = -0.1 * viewport.w + BOX / 2;
  const centroHeroY = 1.2 * viewport.h - BOX / 2;
  const raioSobre = (BOX * ESCALA_SOBRE) / 2;

  // alvo: canto inferior-esquerdo — a UNICA area realmente vazia da
  // secao. A direita tem os cards (sem fundo opaco, entao a lua atras
  // deles atrapalhava leitura e contraste). Acima, na mesma coluna, tem
  // a bio. Abaixo da bio, na coluna esquerda, nao tem mais nada — e essa
  // zona nao muda de tamanho com o scroll porque a bio e sticky (fica
  // sempre nos mesmos 96px do topo + a propria altura, medida de
  // verdade via data-bio-col, nao chutada).
  const zonaProibidaAteY = 96 + bioAlturaPx + 40; // top-24 (96px) + bio + folga
  const centroSobreX = Math.max(0.14 * viewport.w, raioSobre + 24);
  // nunca deixa cortar embaixo, mesmo que isso, numa tela muito baixa,
  // signifique nao limpar 100% a folga da bio — prioridade e nao cortar
  const limiteInferior = viewport.h - raioSobre - 24;
  const centroSobreY = Math.min(
    Math.max(zonaProibidaAteY + raioSobre, Math.min(0.85 * viewport.h, limiteInferior)),
    limiteInferior,
  );
  const xSobrePct = ((centroSobreX - centroHeroX) / BOX) * 100;
  const ySobrePct = ((centroSobreY - centroHeroY) / BOX) * 100;

  const scale = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], [1, 1, ESCALA_SOBRE, ESCALA_SOBRE]);
  const x = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", `${xSobrePct}%`, `${xSobrePct}%`]);
  const y = useTransform(scrollYProgress, [0, heroFracao, fimTransicao, 1], ["0%", "0%", `${ySobrePct}%`, `${ySobrePct}%`]);
  // fade de seguranca extra nos ultimos 6% do progresso, sumida um pouco
  // antes do sticky soltar de vez. A causa real do "vazamento" pra
  // secao seguinte era outra (z-index, ver classe "z-0" removida
  // abaixo) — isso aqui e so um reforco, nao a correcao principal.
  const opacitySaida = useTransform(scrollYProgress, [0, 0.94, 1], [1, 1, 0]);

  // esconde a lua assim que a PROXIMA secao (irma depois deste wrapper
  // no DOM, ex: Acorde) alcança a propria borda de baixo da lua na tela
  // — nao uma fracao fixa da viewport, nao o sticky soltar. Descobertas
  // rolando de verdade: (1) como a lua fica perto do rodape da tela (pra
  // nao cobrir a bio, que fica no topo), qualquer margem fixa "generosa"
  // acabava, na pratica, sendo exatamente onde a proxima secao entra —
  // as duas brigam pelo mesmo pedaco de tela perto do rodape; medir
  // contra a posicao REAL da lua (nao um numero chutado) resolve. (2) o
  // calculo so pode confiar na leitura de "onde a lua esta" DEPOIS que
  // ela chegou no tamanho final do Sobre — lendo essa posicao ainda no
  // Hero (onde ela e gigante, quase saindo da tela por baixo) grava um
  // valor errado que trava a lua escondida o tempo todo depois.
  const larguraEsperadaSobre = BOX * ESCALA_SOBRE;
  const [visivel, setVisivel] = useState(true);
  const ultimaBordaInferiorRef = useRef(0);
  useEffect(() => {
    function verificar() {
      const wrapper = ref.current;
      const proximaSecao = wrapper?.nextElementSibling as HTMLElement | null;
      const moonBox = moonBoxRef.current;
      if (!proximaSecao || !moonBox) return;
      const rect = moonBox.getBoundingClientRect();
      // so grava/confia na medicao quando a lua ja esta no tamanho final
      // do Sobre (10% de tolerancia) — no Hero ou em transicao, o valor
      // nao serve de referencia pra decidir se deve esconder.
      const jaEstaNoTamanhoDoSobre = Math.abs(rect.width - larguraEsperadaSobre) < larguraEsperadaSobre * 0.1;
      if (jaEstaNoTamanhoDoSobre) {
        ultimaBordaInferiorRef.current = rect.bottom;
      }
      if (ultimaBordaInferiorRef.current === 0) {
        setVisivel(true);
        return;
      }
      const margemSeguranca = 24;
      setVisivel(proximaSecao.getBoundingClientRect().top > ultimaBordaInferiorRef.current + margemSeguranca);
    }
    verificar();
    window.addEventListener("scroll", verificar, { passive: true });
    window.addEventListener("resize", verificar);
    return () => {
      window.removeEventListener("scroll", verificar);
      window.removeEventListener("resize", verificar);
    };
  }, [larguraEsperadaSobre]);

  // BUG DE ARQUITETURA (achado rolando a pagina de verdade neste
  // ambiente via scrollTo+getBoundingClientRect, nao só olhando a
  // formula): `position: sticky` só fica grudado enquanto sobra
  // "altura do container menos altura da tela" de scroll. Como o
  // container (celula do grid) tinha exatamente a altura do conteudo
  // (1673px num teste real) e a tela 800px, o sticky descolava e
  // COMECAVA A SUBIR sozinho depois de só 873px de scroll — bem no meio
  // do Sobre, arrastando a posicao "congelada" pra cima, direto em cima
  // do texto da bio. Isso nao aparecia na conta de x/y (que assume
  // sticky sempre com top:0), só ficava visivel rolando de verdade.
  //
  // Fix: a camada decorativa passa a ter sua PROPRIA altura, igual ao
  // conteudo + 1 tela inteira. Isso empurra a linha do grid pra ficar
  // mais alta que o conteudo, dando ao sticky folga suficiente pra ficar
  // grudado ATE o fim do Sobre (e so entao soltar, junto com o Sobre
  // saindo de tela). O `marginBottom` negativo do mesmo tamanho no
  // container inteiro cancela esse espaco extra na pagina — sem isso,
  // apareceria um vao em branco entre o Sobre e Projetos.
  // a camada decorativa e "hidden lg:block" (some no mobile) — nesse
  // caso ela nao contribui em nada pra altura da linha do grid, e a
  // margem negativa NAO PODE ser aplicada (cortaria a proxima secao por
  // engano, ja que nao existe folga nenhuma pra compensar). So conta
  // quando ela realmente esta visivel (>=1024px, o breakpoint "lg").
  const decorativaVisivel = viewport.w >= 1024;
  const alturaComFolga = conteudoAlturaPx + viewport.h;
  const margemCompensacao = decorativaVisivel ? -viewport.h : 0;

  return (
    <div ref={ref} className="grid" style={{ marginBottom: margemCompensacao }}>
      {/* sem altura fixa aqui: precisa esticar pra altura da celula do
          grid inteira (Hero+Sobre), senao a div sticky de dentro so tem
          h-screen de "pista" pra colar e solta a lua logo apos o Hero */}
      {/* hidden abaixo de lg: em telas pequenas o Sobre vira coluna unica
          (about.tsx usa lg:grid-cols-2) e o layout fica apertado demais
          pra sobrar espaco decorativo — a lua some no mobile de proposito.
          SEM z-index (nem "z-0"): um z-index DEFINIDO, mesmo que seja 0,
          empilha acima de qualquer elemento com z-index:auto — inclusive
          secoes DEPOIS desta no DOM (Acorde), nao importa a ordem real no
          HTML. Foi por isso que a lua vazava visualmente por cima do
          Acorde na cauda da folga extra do sticky. Sem z-index aqui, esta
          camada volta a respeitar a ordem normal do documento (pinta
          embaixo de tudo que vem depois dela), e "z-10" no conteudo ao
          lado (mais abaixo) continua garantindo que o texto do Sobre
          fique por cima da lua enquanto as duas dividem a mesma secao. */}
      <div
        className="pointer-events-none relative col-start-1 row-start-1 hidden lg:block"
        style={{ height: alturaComFolga }}
      >
        {/* display:none aplicado AQUI (no sticky), nao no wrapper de fora:
            o wrapper de fora tem altura explicita (alturaComFolga) que
            precisa continuar contando pro tamanho da linha do grid — o
            sticky pega folga suficiente pra ficar grudado ate o fim do
            Sobre. Aplicar "hidden" la em cima fazia o wrapper sumir por
            inteiro (display:none ignora altura, mesmo explicita), a
            linha do grid encolhia de repente, e a margem negativa (que
            nao muda) ficava puxando space de menos — bug feio: a pagina
            toda saltava assim que a lua escondia. Aqui dentro, escondida
            ou nao, o wrapper de fora nunca muda de tamanho. */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ display: visivel ? undefined : "none" }}
        >
          <motion.div
            ref={moonBoxRef}
            className="absolute"
            // referencia enviada: um arco grande cortado por duas bordas ao
            // mesmo tempo (esquerda + baixo), nao o disco quase inteiro que
            // ficou em -6%/1% (achado "muito visivel") nem a fatia pequena
            // demais de -30%/-16% (achado "nao parece redondo"). Meio-termo.
            style={{ width: 520, height: 520, bottom: "-20%", left: "-10%", scale, x, y, opacity: opacitySaida }}
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

      {/* self-start: sem isso, o grid estica esta celula pra acompanhar a
          camada decorativa (que agora e mais alta de proposito, ver
          `alturaComFolga` acima) — estica o WRAPPER, nao rearranja os
          filhos, mas quebraria a medicao de `conteudoAlturaPx` (que le
          o offsetHeight deste proprio elemento): a altura medida
          cresceria pra acompanhar a folga que ela mesma define, um
          loop. self-start mantem a altura sempre igual ao conteudo real. */}
      <div ref={contentRef} className="relative z-10 col-start-1 row-start-1 self-start">
        {children}
      </div>
    </div>
  );
}
