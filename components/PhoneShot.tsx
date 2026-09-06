"use client";

type Props = {
  srcs: string[];
  alt: string;
  /** largura máxima de cada aparelho, em px */
  width?: number;
  className?: string;
};

/**
 * Grupo de telas em moldura de iPhone. Com mais de um src os aparelhos
 * ficam escalonados: o do meio sobe e os das pontas inclinam para fora.
 *
 * A moldura antes era só uma borda arredondada com uma pilulazinha em
 * cima — lia como "celular genérico", não como iPhone. Aqui a moldura
 * ganha corpo (bezel metálico grosso), Dynamic Island, botões laterais
 * (mudo, volume, power) e indicador de home embaixo — tudo em unidades
 * proporcionais a `width`, pra continuar funcionando em qualquer
 * tamanho que o caller passar.
 */
export default function PhoneShot({ srcs, alt, width = 260, className = "" }: Props) {
  const many = srcs.length > 1;

  return (
    <div className={`flex items-center justify-center ${many ? "gap-2 sm:gap-5" : ""} ${className}`}>
      {srcs.map((src, i) => {
        const offset = many ? i - (srcs.length - 1) / 2 : 0;
        const isCenter = offset === 0;

        return (
          <div
            key={src}
            className="relative shrink-0"
            style={{
              width,
              maxWidth: many ? `${Math.floor(92 / srcs.length)}%` : "100%",
              transform: many
                ? `translateY(${isCenter ? -20 : 12}px) rotate(${offset * 4}deg) scale(${isCenter ? 1 : 0.94})`
                : undefined,
              zIndex: isCenter ? 2 : 1,
            }}
          >
            {/* bezel: metal escuro grosso, cantos continuos como o
                aparelho de verdade (raio bem maior que um card comum) */}
            <div
              className="relative bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-2xl shadow-black/60"
              style={{ padding: width * 0.045, borderRadius: width * 0.19 }}
            >
              {/* botoes laterais: sticks finos que furam pra fora do
                  bezel, como na peca real */}
              <span
                className="absolute bg-neutral-950"
                style={{
                  left: -2, top: width * 0.22, width: 3, height: width * 0.045,
                  borderRadius: "2px 0 0 2px",
                }}
              />
              <span
                className="absolute bg-neutral-950"
                style={{
                  left: -2, top: width * 0.32, width: 3, height: width * 0.075,
                  borderRadius: "2px 0 0 2px",
                }}
              />
              <span
                className="absolute bg-neutral-950"
                style={{
                  left: -2, top: width * 0.42, width: 3, height: width * 0.075,
                  borderRadius: "2px 0 0 2px",
                }}
              />
              <span
                className="absolute bg-neutral-950"
                style={{
                  right: -2, top: width * 0.3, width: 3, height: width * 0.11,
                  borderRadius: "0 2px 2px 0",
                }}
              />

              {/* tela: recorta a foto com cantos um pouco menores que o
                  bezel externo, como a borda interna de vidro */}
              <div
                className="relative overflow-hidden bg-black"
                style={{ borderRadius: width * 0.15 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  width={590}
                  height={1278}
                  className="block w-full"
                />

                {/* dynamic island */}
                <div
                  className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-black"
                  style={{ top: width * 0.025, width: width * 0.34, height: width * 0.075 }}
                />

                {/* indicador de home */}
                <div
                  className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/70"
                  style={{ bottom: width * 0.012, width: width * 0.32, height: Math.max(3, width * 0.008) }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
