'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

/* ── refraction motif geometry ──────────────────────────────────────────
   scattered possibilities (multicolor rays) converge at the prism's left
   vertex; judgment focuses them into one accent beam → directed impact. */
const CX = 300;
const CY = 250;
const PRISM = {
  T: [358, 166], // top apex
  R: [416, 250], // right vertex (beam exit)
  B: [358, 334], // bottom apex
  L: [300, 250], // left vertex (convergence)
  F: [358, 268], // front vertex (3D facet)
};
const IMPACT_X = 720;

const RAY_DEFS: { a: number; l: number; c: string }[] = [
  { a: -38, l: 196, c: '#818cf8' },
  { a: -31, l: 232, c: '#6366f1' },
  { a: -24, l: 250, c: '#4338ca' },
  { a: -17, l: 212, c: '#818cf8' },
  { a: -9, l: 244, c: '#a855f7' },
  { a: -2, l: 224, c: '#c084fc' },
  { a: 6, l: 250, c: '#ec4899' },
  { a: 13, l: 214, c: '#f472b6' },
  { a: 20, l: 242, c: '#f59e0b' },
  { a: 28, l: 206, c: '#fbbf24' },
  { a: 35, l: 232, c: '#c7cad6' },
  { a: 41, l: 190, c: '#818cf8' },
];
const RAY_SCALE = 1.28; // longer threads, reaching further left
const RAYS = RAY_DEFS.map(({ a, l, c }) => {
  const r = (a * Math.PI) / 180;
  const L = l * RAY_SCALE;
  return { x: +(CX - L * Math.cos(r)).toFixed(1), y: +(CY + L * Math.sin(r)).toFixed(1), c };
});

const STAGES: { x: number; k: string; s: [string, string] }[] = [
  { x: 177, k: 'POSSIBILITIES', s: ['AI expands', 'the frontier'] },
  { x: 358, k: 'JUDGMENT', s: ['I bring focus,', 'context, and taste'] },
  { x: 539, k: 'DIRECTION', s: ['One path', 'chosen'] },
  { x: 720, k: 'IMPACT', s: ['Outcomes that', 'move the business'] },
];

const ic = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

const FORK =
  '<path d="M12 20V12"/><path d="M12 12 6 6"/><path d="M6 6h4"/><path d="M6 6v4"/><path d="M12 12 18 6"/><path d="M18 6h-4"/><path d="M18 6v4"/>';

const ICONS: Record<string, string> = {
  speed: ic('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>'),
  fork: ic(FORK),
  loop: ic(
    '<path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64L3 16"/><path d="M3 21v-5h5"/>',
  ),
  down: ic('<path d="M12 4v15"/><path d="m6 13 6 6 6-6"/>'),
  expand: ic(
    '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  ),
  target: ic('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>'),
  person: ic('<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>'),
  heart: ic(
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
  ),
  shield: ic('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>'),
};

const GIVES: { k: string; t: string; d: string }[] = [
  { k: 'speed', t: 'Speed to explore', d: 'Go from idea to prototype fast. Test more, learn earlier.' },
  { k: 'fork', t: 'Parallel possibilities', d: 'Explore many angles at once. See connections others miss.' },
  { k: 'loop', t: 'Better feedback loops', d: 'Validate assumptions continuously. Iterate with less friction.' },
  { k: 'down', t: 'Lower execution cost', d: 'Ship more ideas with fewer resources. Focus on what matters.' },
  { k: 'expand', t: 'Leverage multiplies', d: 'One person can now operate at a scale that wasn’t possible before.' },
];
const MINE: { k: string; t: string; d: string }[] = [
  { k: 'target', t: 'Judgment', d: 'Decide what’s worth building — and what’s not.' },
  { k: 'person', t: 'Context', d: 'Understand people, business, and the real problem.' },
  { k: 'heart', t: 'Empathy', d: 'Design for humans, not just for users.' },
  { k: 'fork', t: 'Product decisions', d: 'Make trade-offs. Set priorities. Say no to good ideas.' },
  { k: 'shield', t: 'Responsibility', d: 'Own the outcome and the consequences.' },
];

function Column({ kicker, items }: { kicker: string; items: { k: string; t: string; d: string }[] }) {
  return (
    <div className="ai-col">
      <span className="ai-col-k">{kicker}</span>
      <ul className="ai-list">
        {items.map(({ k, t, d }) => (
          <li className="ai-item" key={t}>
            <span className="ai-ic" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[k] }} />
            <div className="ai-item-tx">
              <b>{t}</b>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AILeverage() {
  const svgRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const outline = `M${PRISM.L} L${PRISM.T} L${PRISM.R} L${PRISM.B} Z`;
  return (
    <section className={`ai-edge${shown ? ' is-in' : ''}`} id="ai">
      <div className="container">
        <FadeIn as="header" className="sec-head">
          <div className="sec-eyebrow">
            <span className="num">04</span>
            <span className="lbl">Working with leverage</span>
          </div>
          <h2>
            Answers are abundant. <em>Direction is not.</em>
          </h2>
          <p className="sub">
            AI creates countless possibilities. My job is to bring judgment, context, and responsibility to choose the path that creates real impact.
          </p>
        </FadeIn>

        <FadeIn className="ai-flow" delay={0.1}>
          <div ref={svgRef}>
          <svg
              className="ai-flow-svg"
              viewBox="-16 20 896 410"
              role="img"
              aria-label="AI expands possibilities; judgment focuses them into one direction that drives business impact."
            >
              {/* scattered possibilities → convergence */}
              <g className="ai-rays">
                {RAYS.map((r, i) => (
                  <g key={i}>
                    <line x1={r.x} y1={r.y} x2={CX} y2={CY} stroke={r.c} strokeWidth="1.7" strokeLinecap="round" opacity="0.5" pathLength={1} />
                    <circle cx={r.x} cy={r.y} r="3" fill={r.c} opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* prism — line-art crystal, lines only (no fill) */}
              <path className="prism-edge" d={outline} pathLength={1} style={{ '--pe': 0 } as CSSProperties} />
              <path className="prism-edge" d={`M${PRISM.F} L${PRISM.T}`} pathLength={1} style={{ '--pe': 1 } as CSSProperties} />
              <path className="prism-edge" d={`M${PRISM.F} L${PRISM.R}`} pathLength={1} style={{ '--pe': 2 } as CSSProperties} />
              <path className="prism-edge" d={`M${PRISM.F} L${PRISM.B}`} pathLength={1} style={{ '--pe': 3 } as CSSProperties} />
              <path className="prism-edge" d={`M${PRISM.F} L${PRISM.L}`} pathLength={1} style={{ '--pe': 4 } as CSSProperties} />

              {/* focused beam → impact */}
              <line className="beam" x1={PRISM.R[0]} y1={PRISM.R[1]} x2={IMPACT_X} y2={CY} pathLength={1} />

              {/* impact — rings fade in when beam lands, ping fires once */}
              <g className="impact-rings">
                <circle className="ring" cx={IMPACT_X} cy={CY} r="58" opacity="0.28" />
                <circle className="ring" cx={IMPACT_X} cy={CY} r="38" opacity="0.5" />
                <circle className="ring" cx={IMPACT_X} cy={CY} r="18" opacity="0.8" />
              </g>
              <circle className="impact-ping" cx={IMPACT_X} cy={CY} r="6" />
              <circle className="impact-dot" cx={IMPACT_X} cy={CY} r="5.5" />

              {/* stage labels */}
              {STAGES.map(({ x, k, s }) => (
                <g key={k}>
                  <text className="flow-k" x={x} y={64} textAnchor="middle">{k}</text>
                  <text className="flow-sub" x={x} y={88} textAnchor="middle">
                    <tspan x={x}>{s[0]}</tspan>
                    <tspan x={x} dy="16">{s[1]}</tspan>
                  </text>
                </g>
              ))}
            </svg>
            {/* mobile: svg labels get too small when the diagram scales down,
                so the stages read as an HTML strip under the diagram */}
            <div className="ai-flow-stages" aria-hidden="true">
              {STAGES.map(({ k }, i) => (
                <span key={k}>
                  {k}
                  {i < STAGES.length - 1 && <i>→</i>}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="ai-board" delay={0.1}>
          <Column kicker="What leverage gives me" items={GIVES} />
          <Column kicker="What still belongs to me" items={MINE} />
        </FadeIn>
      </div>
    </section>
  );
}
