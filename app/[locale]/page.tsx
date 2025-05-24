import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";
import initTranslations from '../i118n';
import TranslationsProvider from '@/components/translationProvider';
import '@/styles-test/components/_page.scss';

const i18nNamespaces = ['home'];

interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: HomeProps) {

  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
        <main className="main">
          <Hero locale={locale} />
          <Footer locale={locale} />
        </main>
    </TranslationsProvider>
  );
}
