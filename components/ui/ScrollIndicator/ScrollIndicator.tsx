'use client';

// styles
import './index.scss';

// types
import type { ScrollIndicatorProps } from './types';

// motion
import { motion, Variants } from 'framer-motion';

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

const scrollMotion: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: 40, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="scroll-indicator"
      role="button"
      tabIndex={0}
      aria-label="Scroll down"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scrollMotion}
      onClick={() => scrollToSection(targetId)}
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
    </motion.div>
  );
}
