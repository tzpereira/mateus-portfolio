// styles
import './index.scss';

// types
import { ServicesProps, Service } from './types';

// i18n
import initTranslations from '@/app/i18n';

// components
import { ServiceCard } from '@/components/ui/ServiceCard';

export default async function Services({ locale }: ServicesProps) {
  const { t } = await initTranslations(locale, ['services']);

  const services = t('services', { returnObjects: true }) as Service[];

  return (
    <section id="services" className="section services">
      <div className='services__title-container'>
        <h2 className="services__title">{t('title')}</h2>
      </div>
      <div className="services__frame">
        <div className="services__grid">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}