export default function Grain() {
  return (
    <>
      <svg style={{ position: "fixed", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9996,
          pointerEvents: "none",
          filter: "url(#grain-filter)",
          opacity: 0.08,
        }}
      />
    </>
  );
}
