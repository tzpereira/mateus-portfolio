'use client';

// styles
import './index.scss';

// types
import { StackProps, StackData } from './types';
import type { TFunction } from 'i18next';

// 118n
import initTranslations from '@/app/i18n';

// react
import { useEffect, useRef, useState } from 'react';

// icons
import { HiveGroup } from '@/components/ui/HiveGroup';

export default function Stack({ locale }: StackProps) {
  const [t, setT] = useState<TFunction | null>(null);
  const [stackData, setStackData] = useState<StackData | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initTranslations(locale, ['stack']).then(({ t }) => {
      setT(() => t);
      const data = t('stack_data', { returnObjects: true }) as StackData;
      setStackData(data);
    });
  }, [locale]);

  useEffect(() => {
    const section = document.querySelector('.stack');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio === 1);
      },
      { threshold: [1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log('Visible:', visible);
  }, [visible]);

  if (!t || !stackData) return null;

  return (
    <section id="stack" className="section stack">
      <div className="stack__title-container">
        <h2 className="stack__title">{t('title')}</h2>
      </div>
      <div ref={ref} className={`stack__hive-grid ${visible ? 'animate' : ''}`}>
        {Object.entries(stackData).map(([key, group]) => (
          <HiveGroup
            key={key}
            title={group.title}
            items={group.children}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}
