'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

// ── Perspective ascent ───────────────────────────────────────────────────────
// Concentric circles on a receding ground plane, projected through a pinhole —
// nested rings that cluster toward a vanishing point up top and open downward.
// The messy core sits at the centre; each phase widens the system outward until
// it lands, highlighted, as the business outcome. Pure geometry, no stock art.

type Stage = { num: string; name: string };

const STAGES: Stage[] = [
  { num: '01', name: 'Messy ideas' },
  { num: '02', name: 'Clarify' },
  { num: '03', name: 'Product decisions' },
  { num: '04', name: 'Production systems' },
  { num: '05', name: 'Business outcomes' },
];

// pinhole projection of a ground circle: X = R·cosθ, Z = ZC + R·sinθ
const F = 312;        // focal length
const CAM_H = 3.7;    // camera height above the plane
const ZC = 13;        // depth of the shared circle centre — higher = gentler perspective
const HORIZON = 60;   // screen y of the vanishing line
const CX = 500;
const RADII = [3.2, 5.9, 7.8, 9.3, 10.5];
const FONT = [18, 19, 21, 25, 33];

const project = (R: number, t: number): [number, number] => {
  const X = R * Math.cos(t);
  const Z = ZC + R * Math.sin(t);
  return [CX + (F * X) / Z, HORIZON + (F * CAM_H) / Z];
};

const ringPath = (R: number) => {
  const N = 120;
  let d = '';
  for (let i = 0; i < N; i++) {
    const [x, y] = project(R, (i / N) * Math.PI * 2);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
};

const ringBottom = (R: number) => HORIZON + (F * CAM_H) / (ZC - R);
const ringTop = (R: number) => HORIZON + (F * CAM_H) / (ZC + R);

const RINGS = STAGES.map((s, i) => {
  const R = RADII[i];
  // label sits in the open crescent below the previous ring
  const labelY =
    i === 0 ? (ringTop(R) + ringBottom(R)) / 2 : (ringBottom(RADII[i - 1]) + ringBottom(R)) / 2;
  return { ...s, i, d: ringPath(R), labelY, fs: FONT[i], last: i === STAGES.length - 1 };
});

const VB = { x: 0, y: 126, w: 1000, h: 414 };

export default function SystemWalkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.24 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // on narrow screens, crop the viewBox to the labeled core: the ring edges
  // bleed off both sides and the whole diagram fits the viewport, no scroll
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 620px)');
    const sync = () => setMob(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const vb = mob ? `290 ${VB.y} 420 ${VB.h}` : `${VB.x} ${VB.y} ${VB.w} ${VB.h}`;

  return (
    <div className={`proc-orbit${shown ? ' is-in' : ''}`} ref={ref}>
      <div className="po-wrap">
        <svg className="po-svg" viewBox={vb} aria-hidden="true">
          {/* perspective orbits — faint inner rings, accent outer ring */}
          {RINGS.map((r) => (
            <path
              key={`ring-${r.i}`}
              className={`po-ring${r.last ? ' acc' : ''}`}
              d={r.d}
              pathLength={1}
              style={{ '--d': `${0.1 + r.i * 0.13}s` } as CSSProperties}
            />
          ))}

          {/* stage labels — number kicker centred above the title, the title's
              optical centre sitting on the band midpoint (centred both axes) */}
          {RINGS.map((r) => (
            <text
              key={`lbl-${r.i}`}
              className={`po-lbl${r.last ? ' acc' : ''}`}
              textAnchor="middle"
              style={{ '--d': `${0.55 + r.i * 0.13}s` } as CSSProperties}
            >
              <tspan className="po-num" x={CX} y={r.labelY - r.fs * 0.62} fontSize={(r.fs * 0.6).toFixed(1)}>{r.num}</tspan>
              <tspan className="po-nm" x={CX} y={r.labelY + r.fs * 0.34} fontSize={r.fs}>{r.name}</tspan>
            </text>
          ))}
        </svg>
      </div>

      <p className="po-foot">
        I connect product thinking with <em>engineering execution.</em>
      </p>
    </div>
  );
}
