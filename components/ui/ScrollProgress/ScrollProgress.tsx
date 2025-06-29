'use client';

// styles
import './index.scss';

// types
import { ScrollProgressProps } from './types';

// motion
import { motion, Variants } from 'framer-motion';

const variants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.1, ease: 'easeIn' } },
};

export default function ScrollProgress({ total, currentIndex, onDotClick, isVisible }: ScrollProgressProps) {
  const fillHeight = (currentIndex / (total - 1)) * 100;

  return (
    <>
      {isVisible ? (
        <motion.aside 
          className="scroll-progress"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <div className="scroll-progress__track">
            <div className="scroll-progress__fill" style={{ height: `${fillHeight}%` }} />
            {Array.from({ length: total }).map((_, idx) => {
              const dotTop = (idx / (total - 1)) * 100;
              const isDotVisible = currentIndex >= idx;

              return (
                <button
                  key={idx}
                  className={`
                scroll-progress__dot
                ${currentIndex === idx ? 'active' : ''}
                ${isDotVisible ? 'visible' : ''}
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
        </motion.aside>
      ) : (
        null
      )}
    </>
  );
}
