import './index.scss';
import initTranslations from '@/app/i18n';

type ContactProps = {
  locale: string;
};

export default async function Contact({ locale }: ContactProps) {
  const { t } = await initTranslations(locale, ['contact']);

  return (
    <section className="section contact">
      <div className="contact__title-container">
        <h2 className="contact__title">{t('title')}</h2>
      </div>

      <div className="contact__frame">
        <div className="contact__intro">
          <h3 className="contact__info-title">{t('talk_title')}</h3>
          <p className="contact__info-description">{t('talk_text')}</p>
          <div>
            <span className="contact__info-subtitle">{t('find_me')} or </span>
            <a
              href="/resume.pdf"
              download
              className="contact__download-resume"
            >
              {t('download_resume')}
            </a>
          </div>

          <div className="contact__card contact__only-links-card">
            <div className="contact__card-content contact__only-links">
              <div className="contact__links">
                <a href="https://wa.me/" target="_blank" rel="noreferrer">{t('whatsapp')}</a>
                <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer">{t('linkedin')}</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer">{t('github')}</a>
              </div>
              <div className="glass-reflection" />
            </div>
          </div>
        </div>

        <div className="contact__card contact__form-card">
          <div className="contact__card-content">
            <form
              className="contact__form"
              action={`mailto:mateuspdasilva369@gmail.com`}
              method="POST"
              encType="text/plain"
            >
              <input name="name" type="text" placeholder={t('placeholder.name')} required />
              <input name="email" type="email" placeholder={t('placeholder.email')} required />
              <textarea name="message" placeholder={t('placeholder.message')} required />
              <button type="submit">{t('submit')}</button>
            </form>
            <div className="glass-reflection" />
          </div>
        </div>
      </div>
    </section>
  );
}
