'use client';

// styles
import './index.scss';

// types
import { HeroProps } from './types';

// i18n
import initTranslations from '@/app/i18n';
import { TFunction } from 'i18next';

// react
import React, { useEffect, useState } from 'react';

// components
import { Header } from '@/components/layout/Header';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

// motion
import { motion, AnimatePresence, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const fadeUpMotion: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function Hero({ locale }: HeroProps) {
  const isVisible = useSectionVisibility('hero');
  const [t, setT] = useState<TFunction | null>(null);

  useEffect(() => {
    initTranslations(locale, ['hero']).then(({ t }) => {
      setT(() => t);
    });
  }, [locale]);

  return (
    <section id="hero" className="section hero">
      <div className="hero__header-frame">
        <Header locale={locale} />
      </div>

      <div className="hero__frame">
        <AnimatePresence mode="wait">
          {isVisible && t ? (
            <motion.div
              key="hero-content"
              className="hero__content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <motion.h1 className="hero__title" variants={fadeUpMotion}>
                MAT<span className="hero__title--break">EUS</span>
              </motion.h1>
              <motion.p className="hero__description" variants={fadeUpMotion}>
                {t('title')}
              </motion.p>
              <motion.span className="hero__note" variants={fadeUpMotion}>
                {t('note')}
              </motion.span>
            </motion.div>
          ) : (
            null
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isVisible ? (
            <ScrollIndicator key="scroll-indicator" targetId="services" />
          ) : (
            null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}