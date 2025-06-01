import './index.scss';
import { ThemeChanger } from '@/components/ui/ThemeChanger';
import { LanguageChanger } from '@/components/ui/LanguageChanger';
import initTranslations from '@/app/i18n';

export default async function Header({ locale }: HeaderProps) {
  const { t } = await initTranslations(locale, ['header']); 

  return (
    <header className="header">
      <h1 className="header__logo">{t('logo')}</h1>
      <nav className="header__nav">
        <ul className="header__menu">
          <li>{t('services')}</li>
          <li>{t('work')}</li>
          <li>{t('stack')}</li>
          <li>{t('contact')}</li>
        </ul>
        <ThemeChanger />
        <LanguageChanger />
      </nav>
    </header>
  );
}