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
import { motion } from 'framer-motion';

// components
import { HiveGroup } from '@/components/ui/HiveGroup';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

export default function Stack({ locale }: StackProps) {
  const [t, setT] = useState<TFunction | null>(null);
  const [stackData, setStackData] = useState<StackData | null>(null);

  const isVisible = useSectionVisibility('stack');

  useEffect(() => {
    initTranslations(locale, ['stack']).then(({ t }) => {
      setT(() => t);
      const data = t('stack_data', { returnObjects: true }) as StackData;
      setStackData(data);
    });
  }, [locale]);

  return (
    <section id="stack" className="section stack">
      {isVisible && t ? (
        <>
          <motion.div
            className="stack__title-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="stack__title">{t('title')}</h2>
          </motion.div>

          <div className="stack__hive-grid">
            {stackData && Object.entries(stackData).map(([key, group]) => (
              <HiveGroup
                key={key}
                title={group.title}
                items={group.children}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
