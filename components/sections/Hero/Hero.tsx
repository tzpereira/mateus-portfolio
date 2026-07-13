'use client';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DISCIPLINES = [
  { word: 'backend', cls: 'w2' },
  { word: 'AI', cls: 'w1' },
  { word: 'data', cls: 'w3' },
  { word: 'product engineering', cls: 'w5' },
];

/* uniform "+" grid, exactly like the ref — aligned marks, varied gray tones.
   Deterministic PRNG so server and client render the same grid. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROWS = 6;
const CELL = 28;
const PAD = 12;
/* mostly light-gray marks, a sparse scatter of bold dark ones — like the ref.
   COMPLETE grid (no holes — blank cells read as mistakes) with a floor on
   opacity so no mark disappears into the paper. Each mark starts scattered
   and rotated (messy) and settles into the grid (organized) on its own
   trajectory and timing. */
const LIGHT_TONES = [0.14, 0.18, 0.22, 0.28, 0.35, 0.42];

type Mark = {
  x: number; y: number; o: number; sw: number;
  dx: number; dy: number; dr: number; delay: number; dur: number;
};

type Grid = { marks: Mark[]; w: number; h: number };

/* desktop spans the full container with 33 cols; mobile gets 15 cols (and an
   extra row) so the marks stay big and the block holds real vertical presence */
function makeGrid(cols: number, rows: number = ROWS): Grid {
  const rand = mulberry32(3);
  const scatter = mulberry32(11);
  const marks: Mark[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = rand();
      const tone = rand();
      const bold = t > 0.84;
      marks.push({
        x: PAD + c * CELL,
        y: PAD + r * CELL,
        o: bold ? 0.75 + tone * 0.25 : LIGHT_TONES[Math.floor(tone * LIGHT_TONES.length)],
        sw: bold ? 2.8 : 2,
        dx: (scatter() - 0.5) * 100,
        dy: (scatter() - 0.5) * 80,
        dr: (scatter() - 0.5) * 160,
        delay: 0.25 + scatter() * 0.85,
        dur: 1.0 + scatter() * 0.8,
      });
    }
  }
  return { marks, w: PAD * 2 + (cols - 1) * CELL, h: PAD * 2 + (rows - 1) * CELL };
}

const GRID_DESKTOP = makeGrid(33);
const GRID_MOBILE = makeGrid(15, 7);

/* marks near the cursor push away and tilt, then spring back (CSS transition) */
const HOVER_R = 110;
const HOVER_PUSH = 22;

function PlusGrid({ grid, variant }: { grid: Grid; variant: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const reset = () => {
    const svg = svgRef.current;
    if (!svg) return;
    cancelAnimationFrame(raf.current);
    svg.querySelectorAll<SVGGElement>('.pw').forEach(n => { n.style.transform = ''; });
  };

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scale = rect.width / grid.w;
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      svg.querySelectorAll<SVGGElement>('.pw').forEach((n, i) => {
        const m = grid.marks[i];
        const ddx = m.x - mx;
        const ddy = m.y - my;
        const d = Math.hypot(ddx, ddy);
        if (d < HOVER_R && d > 0.01) {
          const f = (1 - d / HOVER_R) * HOVER_PUSH;
          const rot = (1 - d / HOVER_R) * (m.dr > 0 ? 18 : -18);
          n.style.transform = `translate(${((ddx / d) * f).toFixed(1)}px, ${((ddy / d) * f).toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
        } else {
          n.style.transform = '';
        }
      });
    });
  };

  return (
    <div className={`hero-plus ${variant}`} aria-hidden="true" onPointerMove={move} onPointerLeave={reset}>
      <svg ref={svgRef} viewBox={`0 0 ${grid.w} ${grid.h}`} xmlns="http://www.w3.org/2000/svg">
        {grid.marks.map((m, i) => (
          <g key={i} transform={`translate(${m.x},${m.y})`} opacity={m.o}>
            <g className="pw">
              <path
                className="pm"
                style={{
                  '--dx': `${m.dx.toFixed(1)}px`,
                  '--dy': `${m.dy.toFixed(1)}px`,
                  '--dr': `${m.dr.toFixed(1)}deg`,
                  '--pd': `${m.delay.toFixed(2)}s`,
                  '--pdur': `${m.dur.toFixed(2)}s`,
                } as React.CSSProperties}
                d="M-8.5 0H8.5M0 -8.5V8.5"
                stroke="currentColor"
                strokeWidth={m.sw}
                fill="none"
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="container hero-inner">
        <motion.h1 className="hero-line" {...fadeUp(0)}>
          From <strong className="hl-bold">ambiguity</strong>
          <br />
          to <strong className="hl-bold">production.</strong>
        </motion.h1>

        {/* no fade wrapper — the messy phase must be visible from first paint */}
        <PlusGrid grid={GRID_DESKTOP} variant="is-desktop" />
        <PlusGrid grid={GRID_MOBILE} variant="is-mobile" />

        <motion.p className="hero-copy" {...fadeUp(0.28)}>
          I design, build and ship end-to-end software:
          <br />
          {DISCIPLINES.map(({ word, cls }, i) => (
            <span key={cls}>
              <span className={`hl-w ${cls}`}>{word}</span>
              {i < DISCIPLINES.length - 2 ? ', ' : i === DISCIPLINES.length - 2 ? ' and ' : '.'}
            </span>
          ))}
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.4)}>
          <Magnetic>
            <a className="btn-ghost" href="#projects">
              See work
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn-primary" href="#contact">
              Let&apos;s talk
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
