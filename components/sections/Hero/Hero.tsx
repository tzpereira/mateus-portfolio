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
import { AsciiArt } from '@/components/ui/AsciiArt';
import { Header } from '@/components/layout/Header';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

// motion
import { motion, AnimatePresence, Variants } from 'framer-motion';

const outerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const contentVariants: Variants = {
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

export default function Hero({ locale }: HeroProps) {
  const isVisible = useSectionVisibility('hero', 0.2);
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
          {t ? (
            <motion.div
              key="hero-content"
              className="hero__content"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              exit="exit"
              variants={outerVariants}
            >
              <motion.div className="hero__text-block" variants={contentVariants}>
                <motion.h1 className="hero__title">
                  {t('name')}
                </motion.h1>
                <motion.p className="hero__description">
                  {t('title')}
                </motion.p>
                <motion.span className="hero__note" variants={contentVariants}>
                  {t('note')}
                </motion.span>
              </motion.div>
              <motion.div className="hero__ascii-art-container" variants={contentVariants}>
                  <AsciiArt />
              </motion.div>
            </motion.div>
          ) : (
            null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}