import type { ReactNode } from "react";

/** Decorative orbit stays within the hero, clear of the reading sections. */
export default function HeroAboutJourney({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[330px] hidden h-56 w-32 overflow-hidden lg:block"
      >
        <div
          className="h-48 w-48 -translate-x-24 rounded-full border border-black/10 bg-cover shadow-xl"
          style={{ backgroundImage: "url(/textures/moon-1k.jpg)" }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
