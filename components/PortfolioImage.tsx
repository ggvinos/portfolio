import Image from "next/image";

export default function PortfolioImage({ src, alt, caption, photo = false }: {
  src: string; alt: string; caption: string; photo?: boolean;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-default bg-surface">
      <div className="portfolio-image relative overflow-hidden">
        <Image src={src} alt={alt} width={1200} height={760}
          sizes="(max-width: 767px) 90vw, 850px"
          className={photo ? "aspect-[16/10] w-full object-cover" : "h-auto w-full"}
          style={photo ? { objectPosition: src.includes("hackathon") ? "center 76%" : "center 55%" } : undefined} />
        <span aria-hidden="true" className="portfolio-image-grain pointer-events-none absolute inset-0" />
      </div>
      <figcaption className="border-t border-default px-4 py-3 text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
