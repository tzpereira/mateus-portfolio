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

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

// motion
import { motion, AnimatePresence } from 'framer-motion';

export default function Services({ locale }: ServicesProps) {
  const isVisible = useSectionVisibility('services');
  const [t, setT] = useState<TFunction | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    initTranslations(locale, ['services']).then(({ t }) => {
      setT(() => t);
      setServices(t('services', { returnObjects: true }) as Service[]);
    });
  }, [locale]);

  return (
    <section id="services" className="section services">
      <AnimatePresence mode="wait">
        {isVisible && t ? (
          <motion.div
            key="services-title"
            className="services__title-container"
            initial={{ opacity: 0.1, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h2 className="services__title">{t('title')}</h2>
          </motion.div>
        ) : (
          null
        )}
      </AnimatePresence>

      <div className="services__frame">
        <AnimatePresence mode="wait">
          {isVisible && services.length > 0 ? (
            <motion.div
              key="services-grid"
              className="services__grid"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {services?.map((service, idx) => (
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
            null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}