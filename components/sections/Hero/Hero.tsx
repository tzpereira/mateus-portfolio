import './index.scss';
import { Header } from '@/components/layout/Header';
import initTranslations from '@/app/i18n';

export default async function Hero({ locale }: HeroProps) {
  const { t } = await initTranslations(locale, ['hero']); 

  return (
    <section className="section hero">
      <div className="hero__frame">
        <Header locale={locale} />
        <span className="hero__note">{t('note')}</span>
      </div>
    </section>
  );
}