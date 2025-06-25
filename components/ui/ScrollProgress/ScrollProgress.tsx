'use client';

import './index.scss';
import { ScrollProgressProps } from './types';

export default function ScrollProgress({ total, currentIndex, onDotClick }: ScrollProgressProps) {
  const fillHeight = (currentIndex / (total - 1)) * 100;

  return (
    <aside className="scroll-progress">
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" style={{ height: `${fillHeight}%` }} />
        {Array.from({ length: total }).map((_, idx) => {
          const dotTop = (idx / (total - 1)) * 100;
          const isVisible = currentIndex >= idx;

          return (
            <button
              key={idx}
              className={`
                scroll-progress__dot
                ${currentIndex === idx ? 'active' : ''}
                ${isVisible ? 'visible' : ''}
              `}
              style={{ top: `${dotTop}%` }}
              onClick={(e) => {
                e.currentTarget.blur();
                onDotClick(idx);
              }}
              aria-label={`Ir para o card ${idx + 1}`}
            />
          );
        })}
      </div>
    </aside>
  );
}
