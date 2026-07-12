/**
 * GridBackdrop — fixed, full-viewport thin-line grid behind all content.
 * Pure CSS (see .grid-backdrop in globals.scss). Renders a static element;
 * decorative only, hidden from assistive tech.
 */
export default function GridBackdrop() {
  return <div className="grid-backdrop" aria-hidden="true" />;
}
