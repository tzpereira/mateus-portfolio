import type { CSSProperties } from 'react';

export type LineArtVariant = 'discovery' | 'architecture' | 'engineering' | 'harness' | 'scale' | 'security';

interface LineArtProps {
  variant: LineArtVariant;
  className?: string;
}

const V = 120;
const f = (n: number) => +n.toFixed(2);

/** Product & Discovery — dotted probes drawn outward from one origin, each
 *  forming a node where it lands (the trail's reveal is staggered by distance). */
function Discovery() {
  const ox = 22;
  const oy = 98;
  const rays = 6;
  const maxLen = 86;
  const span = 0.5; // seconds the fan takes to draw outward
  const trail: { x: number; y: number; dd: number }[] = [];
  const nodes: { x: number; y: number; dd: number }[] = [];
  for (let i = 0; i < rays; i++) {
    const ang = (-78 + (i * 66) / (rays - 1)) * (Math.PI / 180);
    const len = 78 + (i % 2) * 8;
    for (let d = 10; d <= len; d += 7) {
      trail.push({ x: f(ox + Math.cos(ang) * d), y: f(oy + Math.sin(ang) * d), dd: f((d / maxLen) * span) });
    }
    nodes.push({
      x: f(ox + Math.cos(ang) * len),
      y: f(oy + Math.sin(ang) * len),
      dd: f((len / maxLen) * span + 0.05),
    });
  }
  return (
    <>
      {trail.map((p, i) => (
        <circle
          className="disc-trail"
          key={i}
          cx={p.x}
          cy={p.y}
          r={1.1}
          fill="currentColor"
          stroke="none"
          opacity={0.5}
          style={{ '--dd': `${p.dd}s` } as CSSProperties}
        />
      ))}
      {nodes.map((p, i) => (
        <circle key={`n${i}`} cx={p.x} cy={p.y} r={2.6} pathLength={1} style={{ '--dd': `${p.dd}s` } as CSSProperties} />
      ))}
      <circle cx={ox} cy={oy} r={3.4} fill="currentColor" stroke="none" />
    </>
  );
}

/** Solution Architecture — a connected node graph (structured system). */
function Architecture() {
  const N: Record<string, [number, number]> = {
    c: [60, 60], a: [60, 24], b: [96, 46], d: [88, 92], e: [32, 90], f: [24, 44],
  };
  const edges: [string, string][] = [
    ['c', 'a'], ['c', 'b'], ['c', 'd'], ['c', 'e'], ['c', 'f'], ['a', 'b'], ['e', 'f'], ['b', 'd'],
  ];
  return (
    <>
      {edges.map(([p, q], i) => (
        <line key={i} x1={N[p][0]} y1={N[p][1]} x2={N[q][0]} y2={N[q][1]} pathLength={1} />
      ))}
      {Object.entries(N).map(([k, [cx, cy]]) => {
        const big = k === 'c';
        return <circle key={k} cx={cx} cy={cy} r={big ? 4.5 : 3} fill={big ? 'currentColor' : 'var(--bg)'} />;
      })}
    </>
  );
}

/** Software Engineering — three meshing gears of different sizes: parts of a
 *  system fitting together. */
function gearPath(cx: number, cy: number, rTip: number, rRoot: number, teeth: number, phase: number) {
  const step = (Math.PI * 2) / teeth;
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth; i++) {
    const a = phase + i * step;
    pts.push([cx + rRoot * Math.cos(a), cy + rRoot * Math.sin(a)]);
    pts.push([cx + rTip * Math.cos(a + step * 0.2), cy + rTip * Math.sin(a + step * 0.2)]);
    pts.push([cx + rTip * Math.cos(a + step * 0.4), cy + rTip * Math.sin(a + step * 0.4)]);
    pts.push([cx + rRoot * Math.cos(a + step * 0.6), cy + rRoot * Math.sin(a + step * 0.6)]);
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${f(p[0])} ${f(p[1])}`).join(' ') + ' Z';
}
// each gear: geometry + a start offset (pushed apart) and spin angle for the
// "slide together and turn" hover; adjacent gears counter-rotate, like real mesh.
const GEARS = [
  { cx: 44, cy: 70, rT: 28, rR: 22, t: 12, ph: 0, hole: 7, tx: -9.5, ty: 3.3, rot: -15 },
  { cx: 78, cy: 44, rT: 21, rR: 16, t: 9, ph: 0.18, hole: 5, tx: 2.6, ty: -9.6, rot: 20 },
  { cx: 99, cy: 65, rT: 13.5, rR: 9.5, t: 6, ph: 0.1, hole: 3.4, tx: 9.8, ty: 2.1, rot: -30 },
];
function Engineering() {
  return (
    <>
      {GEARS.map((g, i) => (
        <g
          className="eng-gear"
          key={i}
          style={{ '--tx': `${g.tx}px`, '--ty': `${g.ty}px`, '--rot': `${g.rot}deg` } as CSSProperties}
        >
          <path d={gearPath(g.cx, g.cy, g.rT, g.rR, g.t, g.ph)} pathLength={1} />
          <circle cx={g.cx} cy={g.cy} r={g.hole} pathLength={1} />
        </g>
      ))}
    </>
  );
}

/** Harness — a source block that builds blocks: connectors fan out from the
 *  machine (which holds the seed of its own product) to the things it makes.
 *  "Build the thing that builds the thing." */
function Harness() {
  return (
    <>
      <rect x={16} y={44} width={32} height={32} rx={3} pathLength={1} />
      <rect x={25} y={53} width={14} height={14} rx={2} pathLength={1} />
      <line x1={48} y1={54} x2={76} y2={30} pathLength={1} />
      <line x1={48} y1={60} x2={86} y2={60} pathLength={1} />
      <line x1={48} y1={66} x2={76} y2={90} pathLength={1} />
      <rect x={76} y={20} width={20} height={20} rx={2.5} pathLength={1} />
      <rect x={86} y={50} width={20} height={20} rx={2.5} pathLength={1} />
      <rect x={76} y={80} width={20} height={20} rx={2.5} pathLength={1} />
    </>
  );
}

/** Scale & Operations — throughput climbing (ascending bars + trend). */
function Scale() {
  const base = 96;
  const x0 = 18;
  const bw = 12;
  const gap = 5;
  const heights = [14, 24, 30, 44, 54, 66];
  let tx = x0;
  const bars = heights.map((h) => {
    const rect = { x: tx, y: base - h, h };
    tx += bw + gap;
    return rect;
  });
  return (
    <>
      <line x1={14} y1={base} x2={106} y2={base} opacity={0.5} pathLength={1} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={bw} height={b.h} pathLength={1} />
      ))}
    </>
  );
}

/** Security & Trust — a shield (protection) with a check (delivered, verified). */
function Security() {
  return (
    <>
      <path d="M60 16 L92 28 L92 58 C92 82 78 98 60 105 C42 98 28 82 28 58 L28 28 Z" pathLength={1} />
      <path d="M45 60 L55 71 L77 45" pathLength={1} />
    </>
  );
}

/** The motif's inner shapes only (no <svg>), drawn in a 0–120 box — so it can be
 *  projected onto an isometric tile face or wrapped in a standalone <svg>. */
export function Motif({ variant }: { variant: LineArtVariant }) {
  return (
    <>
      {variant === 'discovery' && <Discovery />}
      {variant === 'architecture' && <Architecture />}
      {variant === 'engineering' && <Engineering />}
      {variant === 'harness' && <Harness />}
      {variant === 'scale' && <Scale />}
      {variant === 'security' && <Security />}
    </>
  );
}

/**
 * LineArt — abstract motif whose form encodes the layer it labels.
 * Inherits `currentColor`; decorative, hidden from the a11y tree.
 */
export default function LineArt({ variant, className }: LineArtProps) {
  return (
    <svg
      className={['line-art', `la-${variant}`, className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${V} ${V}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <Motif variant={variant} />
    </svg>
  );
}
