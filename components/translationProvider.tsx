'use client'

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '../app/i18n';
import { createInstance, i18n as I18nInstanceType, Resource } from 'i18next';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationsProviderProps) {
  const i18n: I18nInstanceType = createInstance();

  void initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
