'use client';

import { useState } from 'react';

const WORDS = ['Product', 'Architecture', 'Engineering', 'Data', 'AI'];

export default function Marquee() {
  const [held, setHeld] = useState(false);

  const copy = (key: string) => (
    <div className="mq-copy" key={key}>
      {WORDS.map(word => (
        <span className="mq-item" key={word}>
          {word}
          <i className="mq-dot" />
        </span>
      ))}
    </div>
  );

  // press-and-hold pauses the scroll and lights the band accent; release resumes.
  // pointer events cover mouse + touch, so it works the same on mobile.
  return (
    <div
      className={`marquee${held ? ' is-held' : ''}`}
      aria-hidden="true"
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
    >
      <div className="mq-track">{copy('a')}{copy('b')}</div>
    </div>
  );
}
