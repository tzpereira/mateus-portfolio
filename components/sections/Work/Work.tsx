import './index.scss';
import initTranslations from '@/app/i118n';

type WorkProps = {
  locale: string;
};

export default async function Work({ locale }: WorkProps) {
  const { t } = await initTranslations(locale, ['work']);

  return (
    <section className="work">
      <div className='work__title-container'>
        <h2 className="work__title">{t('title')}</h2>
      </div>
      <div className="work__frame">
            <p>grande grafico aqui</p>
      </div>
    </section>
  );
}