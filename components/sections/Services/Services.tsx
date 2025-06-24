import './index.scss';
import { ServicesProps } from './types';
import initTranslations from '@/app/i18n';
import { ServiceCard } from '@/components/ui/ServiceCard';

export default async function Services({ locale }: ServicesProps) {
  const { t } = await initTranslations(locale, ['services']);
  const services = t('services', { returnObjects: true }) as {
    title: string;
    description: string;
    icon: string;
  }[];

  return (
    <section className="section services">
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