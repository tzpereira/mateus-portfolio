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

//components
import { Header } from '@/components/layout/Header';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// motion
import { motion } from 'framer-motion';

const fadeUpMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero({ locale }: HeroProps) {
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
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h1 className="hero__title" variants={fadeUpMotion}>
            MAT<span className="hero__title--break">EUS</span>
          </motion.h1>
          <motion.p className="hero__description" variants={fadeUpMotion}>
            {t ? t('title') : ''}
          </motion.p>
          <motion.span className="hero__note" variants={fadeUpMotion}>
            {t ? t('note') : ''}
          </motion.span>
        </motion.div>
        <ScrollIndicator targetId="services" />
      </div>
    </section>
  );
}