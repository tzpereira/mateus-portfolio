'use client';

// styles
import './index.scss';

// types
import { Locale } from './types'

// i18n
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

// next
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;

    // Seta cookie
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Lógica de redirecionamento
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <div className="language-changer">
      <select
        onChange={handleChange}
        value={currentLocale}
        className="language-changer__select"
        aria-label="Change language"
      >
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>
    </div>
  );
}
