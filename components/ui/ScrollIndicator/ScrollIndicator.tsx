'use client'

// styles
import './index.scss';

// types
import type { ScrollIndicatorProps } from './types';

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  return (
    <div
      className="scroll-indicator"
      aria-label="Scroll down"
      onClick={() => scrollToSection(targetId)}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToSection(targetId);
        }
      }}
    >
      <div className="scroll-indicator__icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="scroll-indicator__arrow"
          width="56"
          height="32"
        >
          <line x1="12" y1="2" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
      <div className="scroll-indicator__text">SCROLL</div>
    </div>
  );
}
