'use client';

// styles
import './index.scss';

// types
import { HeaderProps } from './types';

// react
import React, { useState, useEffect } from 'react';

// i18next
import type { TFunction } from 'i18next';
import initTranslations from '@/app/i18n';

// custom components
import { BurgerMenu } from '@/components/ui/BurgerMenu';
import { ThemeChanger } from '@/components/ui/ThemeChanger';
import { LanguageChanger } from '@/components/ui/LanguageChanger';

export default function Header({ locale }: HeaderProps) {
  const [t, setT] = useState<TFunction | null>(null);

  useEffect(() => {
    initTranslations(locale, ['header']).then(({ t }) => {
      setT(() => t);
    });
  }, [locale]);

  if (!t) return null;

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const menuItems = [
    { label: t('services'), onClick: () => scrollToSection('services') },
    { label: t('work'), onClick: () => scrollToSection('work') },
    { label: t('stack'), onClick: () => scrollToSection('stack') },
    { label: t('contact'), onClick: () => scrollToSection('contact') },
  ];

  return (
    <header className="header">
      <BurgerMenu menuItems={menuItems} />
      <div className="header__actions">
        <ThemeChanger />
        <LanguageChanger />
      </div>
    </header>
  );
}
