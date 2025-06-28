// styles
import './index.scss';

// types
import { HeroProps } from './types';

// i18n
import initTranslations from '@/app/i18n';

// components
import { Header } from '@/components/layout/Header';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export default async function Hero({ locale }: HeroProps) {
  const { t } = await initTranslations(locale, ['hero']);

  return (
    <section id="hero" className="section hero">
      <div className="hero__header-frame">
        <Header locale={locale} />
      </div>
      <div className="hero__frame">
        <div className="hero__content">
          <h1 className="hero__title">
            MAT<span className="hero__title--break">EUS</span>
          </h1>
          <p className="hero__description">{t('title')}</p>
          <span className="hero__note">{t('note')}</span>
        </div>
        <ScrollIndicator targetId={'services'} />
      </div>
    </section>
  );
}