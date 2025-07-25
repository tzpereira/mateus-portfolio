'use client';

// styles
import './index.scss';

// types
import { StackProps, StackData } from './types';
import type { TFunction } from 'i18next';

// i18n
import initTranslations from '@/app/i18n';

// react
import { useEffect, useState } from 'react';

// motion
import { motion, AnimatePresence, Variants } from 'framer-motion';

// components
import { HiveGroup } from '@/components/ui/HiveGroup';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const stackVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

export default function Stack({ locale }: StackProps) {
  const [t, setT] = useState<TFunction | null>(null);
  const [stackData, setStackData] = useState<StackData | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const isVisibleDesktop = useSectionVisibility('stack', 0.8);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(max-width: 790px)').matches);
    }
  }, []);

  const isVisible = isMobile ? true : isVisibleDesktop;

  useEffect(() => {
    initTranslations(locale, ['stack']).then(({ t }) => {
      setT(() => t);
      const data = t('stack_data', { returnObjects: true }) as StackData;
      setStackData(data);
    });
  }, [locale]);

  return (
    <section id="stack" className="section stack">
      <AnimatePresence mode="wait">
        {isVisible && t && (
          <>
            <motion.div
              key="stack-title"
              className="stack__title-container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={titleVariants}
            >
              <h2 className="stack__title">{t('title')}</h2>
            </motion.div>

            <motion.div
              key="stack-content"
              className="stack__hive-grid"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stackVariants}
            >
              {stackData &&
                Object.entries(stackData).map(([key, group]) => (
                  <HiveGroup
                    key={key}
                    title={group.title}
                    items={group.children}
                  />
                ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}