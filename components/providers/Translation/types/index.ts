import { ReactNode } from 'react';
import { Resource } from 'i18next';

export interface TranslationProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}