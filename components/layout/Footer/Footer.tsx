import './index.scss';
import { FooterProps } from './types';
import initTranslations from '@/app/i18n';
import { useEffect, useState } from 'react';

export default function Footer({ locale }: FooterProps) {
  const [t, setT] = useState(() => (key: string) => key);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    initTranslations(locale, ['footer']).then(({ t }) => {
      setT(() => t);
    });
  }, [locale]);

  return (
    <footer className="footer">
      <p className='footer___content'>{t('footer_content')}, {currentYear}</p>
    </footer>
  );
}