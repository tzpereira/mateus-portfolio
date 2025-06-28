'use client';

// styles
import './index.scss';

// types
import { ServicesProps, Service } from './types';

// i18n
import initTranslations from '@/app/i18n';
import { TFunction } from 'i18next';

// react
import { useEffect, useState } from 'react';

// components
import { ServiceCard } from '@/components/ui/ServiceCard';

// motion
import { motion } from 'framer-motion';

export default function Services({ locale }: ServicesProps) {
  const [t, setT] = useState<TFunction | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    initTranslations(locale, ['services']).then(({ t }) => {
      setT(() => t);
      setServices(t('services', { returnObjects: true }) as Service[]);
    });
  }, [locale]);

  useEffect(() => {
    const section = document.querySelector('.services');
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio === 1);
      },
      { threshold: [1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section services">
      {isVisible ? (
        <motion.div
          className='services__title-container'
          initial={{ opacity: 0.1, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}>
          <h2 className="services__title">{t ? t('title') : ''}</h2>
        </motion.div>
      ) : (
        <></>
      )}
      <div className="services__frame">
        {isVisible ? (
          <motion.div
            className="services__grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
              hidden: {},
            }}
          >
            {services?.map && services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                fromRight={idx % 2 === 1}
              />
            ))}
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}