'use client';

import './index.scss';

// types
import { WorkCardProps } from './types';

// images
import { imageMap } from '@/assets/image/imageExporter';

// framer motion
import { motion, AnimatePresence, Variants } from 'framer-motion';

const textVariants: Variants = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -200,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

export default function WorkCard({ work, isCardVisible, scrollDirection, isVisible }: WorkCardProps) {
  return (
    <div className={`work-card ${isCardVisible ? `visible ${scrollDirection || ''}` : ''}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <>
            <motion.div
              key="text"
              className="work-card__text"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
            >
              <h2>{work.title}</h2>
              <p>{work.description}</p>
            </motion.div>

            <motion.div
              key="image"
              className="work-card__image"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={imageVariants}
            >
              {imageMap[work.icon] && <img src={imageMap[work.icon].src} alt={work.title} />}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
