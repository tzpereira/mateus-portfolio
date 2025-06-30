'use client'

// styles
import './index.scss';

// types
import { ContactProps } from './types';

// i18n
import initTranslations from '@/app/i18n';
import { TFunction } from 'i18next';

// react
import { useEffect, useState } from 'react';

// motion
import { motion, Variants, AnimatePresence } from 'framer-motion';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.1 } },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.1 } },
};

export default function Contact({ locale }: ContactProps) {
  const isVisible = useSectionVisibility('contact', 0.8);
  const [t, setT] = useState<TFunction | null>(null);

  useEffect(() => {
    initTranslations(locale, ['contact']).then(({ t }) => {
      setT(() => t);
    });
  }, [locale]);

  return (
    <section id="contact" className="section contact">
      <AnimatePresence mode="wait">
        {isVisible && t && (
          <motion.div
            key="contact-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: {},
              exit: {},
            }}
          >
            <motion.div
              className="contact__title-container"
              variants={leftVariants}
            >
              <h2 className="contact__title">{t('title')}</h2>
            </motion.div>

            <div className="contact__frame">
              <motion.div
                className="contact__intro"
                variants={leftVariants}
              >
                <h3 className="contact__info-title">{t('talk_title')}</h3>
                <p className="contact__info-description">{t('talk_text')}</p>
                <div>
                  <span className="contact__info-subtitle">{t('find_me')}</span>
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
                      <a href="https://wa.me/5551997718421" target="_blank" rel="noreferrer">{t('whatsapp')}</a>
                      <a href="https://linkedin.com/in/mateuspdasilva" target="_blank" rel="noreferrer">{t('linkedin')}</a>
                      <a href="https://github.com/mateuspdasilva" target="_blank" rel="noreferrer">{t('github')}</a>
                    </div>
                    <div className="glass-reflection" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="contact__card contact__form-card"
                variants={rightVariants}
              >
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}