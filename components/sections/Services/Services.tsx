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
import { iconMap } from '@/assets/icons/iconExporter';

// Variants extraídas
const titleVariants = {
  initial: { opacity: 0.1, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function Services({ locale }: ServicesProps) {
  const [t, setT] = useState<TFunction | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const isVisibleDesktop = useSectionVisibility('services', 0.8);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(max-width: 790px)').matches);
    }
  }, []);

  const isVisible = isMobile ? true : isVisibleDesktop;

  useEffect(() => {
    initTranslations(locale, ['services']).then(({ t }) => {
      setT(() => t);
      setServices(t('services', { returnObjects: true }) as Service[]);
    });
  }, [locale]);

  const GyroIcon = iconMap['gyroscope.svg'];
  // Handler para pedir permissão nativa e disparar evento global
  const handleGyroPermission = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            // Dispara evento global para ativar giroscópio nos cards
            window.dispatchEvent(new Event('enable-gyro'));
          }
        })
        .catch(console.error);
    } else {
      // Dispara evento para Android/outros navegadores
      window.dispatchEvent(new Event('enable-gyro'));
    }
  };

  return (
    <section id="services" className="section services">
      <AnimatePresence mode="wait">
        {isVisible && t ? (
          <motion.div
            key="services-title"
            className="services__title-container"
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <h2 className="services__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {t('title')}
              {GyroIcon && (
                <button
                  type="button"
                  aria-label="Ativar giroscópio"
                  onClick={handleGyroPermission}
                  style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <GyroIcon width={22} height={22} style={{ opacity: 0.7 }} />
                </button>
              )}
            </h2>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="services__frame">
          {isVisible && services.length > 0 ? (
            <div
              key="services-grid"
              className="services__grid"
            >
              {services.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  fromRight={idx % 2 === 1}
                />
              ))}
            </div>
          ) : null}
      </div>
    </section>
  );
}