"use client";

type Props = {
  srcs: string[];
  alt: string;
  /** largura máxima de cada aparelho, em px */
  width?: number;
  className?: string;
};

/**
 * Grupo de telas em moldura de celular. Com mais de um src os aparelhos
 * ficam escalonados: o do meio sobe e os das pontas inclinam para fora.
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
            className="relative shrink-0 rounded-[1.75rem] border border-[var(--border)] bg-surface p-1.5 shadow-2xl shadow-black/60"
            style={{
              width,
              maxWidth: many ? `${Math.floor(92 / srcs.length)}%` : "100%",
              transform: many
                ? `translateY(${isCenter ? -20 : 12}px) rotate(${offset * 4}deg) scale(${isCenter ? 1 : 0.94})`
                : undefined,
              zIndex: isCenter ? 2 : 1,
            }}
          >
            {/* notch */}
            <div className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/70" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              width={590}
              height={1278}
              className="block w-full rounded-[1.35rem]"
            />
          </div>
        );
      })}
    </div>
  );
}
