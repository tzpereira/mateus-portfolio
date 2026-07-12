import type { ReactNode } from 'react';
import { Motif, type LineArtVariant } from '../LineArt/LineArt';

type P = [number, number];

// isometric block geometry (2:1 dimetric top face + extruded thickness)
const CX = 140;
const CY = 60;
const A = 112; // half-width of the top diamond
const B = 56; // half-height (2:1)
const D = 24; // thickness
const f = (p: P) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;

function rounded(pts: P[], r: number) {
  let d = '';
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const pr = pts[(i - 1 + n) % n];
    const nx = pts[(i + 1) % n];
    const v1: P = [p[0] - pr[0], p[1] - pr[1]];
    const v2: P = [nx[0] - p[0], nx[1] - p[1]];
    const l1 = Math.hypot(...v1) || 1;
    const l2 = Math.hypot(...v2) || 1;
    const a1: P = [p[0] - (v1[0] / l1) * r, p[1] - (v1[1] / l1) * r];
    const b1: P = [p[0] + (v2[0] / l2) * r, p[1] + (v2[1] / l2) * r];
    d += `${i === 0 ? `M${f(a1)} ` : `L${f(a1)} `}Q${f(p)} ${f(b1)} `;
  }
  return `${d}Z`;
}

const RAD = 12; // top-face corner radius
const T: P = [CX, CY - B];
const R: P = [CX + A, CY];
const BTM: P = [CX, CY + B];
const L: P = [CX - A, CY];
const TOP = rounded([T, R, BTM, L], RAD);

// sample the lid's rounded contour as points, so the side walls can follow the
// SAME front silhouette (corner arcs included) → thickness reaches the full
// width with no gaps and tucks flush under the lid.
function roundedPts(pts: P[], r: number, seg: number): P[] {
  const out: P[] = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const pr = pts[(i - 1 + n) % n];
    const nx = pts[(i + 1) % n];
    const l1 = Math.hypot(p[0] - pr[0], p[1] - pr[1]) || 1;
    const l2 = Math.hypot(nx[0] - p[0], nx[1] - p[1]) || 1;
    const a: P = [p[0] - ((p[0] - pr[0]) / l1) * r, p[1] - ((p[1] - pr[1]) / l1) * r];
    const b: P = [p[0] + ((nx[0] - p[0]) / l2) * r, p[1] + ((nx[1] - p[1]) / l2) * r];
    for (let s = 0; s <= seg; s++) {
      const t = s / seg;
      const x = (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * p[0] + t * t * b[0];
      const y = (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * p[1] + t * t * b[1];
      out.push([+x.toFixed(2), +y.toFixed(2)]);
    }
  }
  return out;
}
const CONTOUR = roundedPts([T, R, BTM, L], RAD, 6);
const idxBy = (cmp: (p: P, best: P) => boolean) =>
  CONTOUR.reduce((bi, p, i) => (cmp(p, CONTOUR[bi]) ? i : bi), 0);
const iR = idxBy((p, best) => p[0] > best[0]); // rightmost
const iB = idxBy((p, best) => p[1] > best[1]); // lowest (front vertex)
const iL = idxBy((p, best) => p[0] < best[0]); // leftmost
const wall = (slice: P[]) => {
  const top = slice.map((p, i) => `${i === 0 ? 'M' : 'L'}${f(p)}`).join(' ');
  const bot = [...slice].reverse().map((p) => `L${f([p[0], p[1] + D])}`).join(' ');
  return `${top} ${bot} Z`;
};
const RIGHT = wall(CONTOUR.slice(iR, iB + 1)); // R corner → front-right edge → B
const LEFT = wall(CONTOUR.slice(iB, iL + 1)); // B → front-left edge → L corner

const inset = (p: P, d: number): P => {
  const vx = CX - p[0];
  const vy = CY - p[1];
  const l = Math.hypot(vx, vy) || 1;
  return [p[0] + (vx / l) * d, p[1] + (vy / l) * d];
};
const DOTS = [T, R, BTM, L].map((p) => inset(p, 17));


const IA = A * 0.46;
const IB = B * 0.46;
const MOTIF_TRANSFORM = `translate(${CX},${CY}) matrix(${IA.toFixed(2)},${IB.toFixed(2)},${(-IA).toFixed(2)},${IB.toFixed(2)},0,0) scale(${(1 / 120).toFixed(5)}) translate(-60,-60)`;

/**
 * IsoLayer — one extruded isometric tile (top face + thickness + corner rivets
 * + side tick marks) with a motif projected onto the tilted face. Pass either a
 * LineArt `variant` (the range layers) or an arbitrary `glyph` drawn in a 0–120
 * box (e.g. a process stage). `motifClass` scopes the motif for hover animation.
 */
export default function IsoLayer({
  variant,
  glyph,
  motifClass,
}: {
  variant?: LineArtVariant;
  glyph?: ReactNode;
  motifClass?: string;
}) {
  const motif = ['iso-motif', motifClass ?? (variant ? `la-${variant}` : '')]
    .filter(Boolean)
    .join(' ');
  return (
    <svg className="iso-tile" viewBox="0 0 280 150" aria-hidden="true">
      <path className="iso-side iso-side-l" d={LEFT} />
      <path className="iso-side iso-side-r" d={RIGHT} />
      <path className="iso-top" d={TOP} />
      {DOTS.map((p, i) => (
        <circle className="iso-dot" key={i} cx={p[0]} cy={p[1]} r={2.6} />
      ))}
      <g className={motif} transform={MOTIF_TRANSFORM}>
        {glyph ?? (variant ? <Motif variant={variant} /> : null)}
      </g>
    </svg>
  );
}
