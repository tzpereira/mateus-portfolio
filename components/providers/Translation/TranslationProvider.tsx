'use client'

// types
import { TranslationProviderProps } from './types';

// i18n
import { I18nextProvider } from 'react-i18next';
import initTranslations from '../../../app/i18n';
import { createInstance, i18n as I18nInstanceType } from 'i18next';

export default function TranslationProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationProviderProps) {
  const i18n: I18nInstanceType = createInstance();

  void initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
