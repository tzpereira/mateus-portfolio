import './index.scss';
import { Header } from '@/components/layout/Header';
import initTranslations from '@/app/i118n';

export default async function Hero({ locale }: HeroProps) {
  const { t } = await initTranslations(locale, ['hero']); 

  return (
    <section className="hero">
      <div className="hero__frame">
        <Header locale={locale} />
        <h1 className="hero__title">{t('title')}</h1>
        <p className="hero__description">{t('about_me')}</p>
        <span className="hero__note">{t('note')}</span>
      </div>
    </section>
  );
}