/** Textured moon: only transforms move; lighting remains static. */
export default function Moon() {
  return (
    <div className="moon-sphere">
      <div data-moon-texture className="moon-texture" />
      <div className="moon-light" />
      <div className="moon-rim" />
    </div>
  );
}
