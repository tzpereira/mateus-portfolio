// i18n
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/translationProvider';

// Sections
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Footer } from "@/components/layout/Footer";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: HomeProps) {

  const { resources } = await initTranslations(locale, ['home']);

  return (
    <TranslationsProvider
      namespaces={['home']}
      locale={locale}
      resources={resources}>
        <main className="main">
          <Hero locale={locale} />
          <Services locale={locale} />
          <Work locale={locale} />
          <Footer locale={locale} />
        </main>
    </TranslationsProvider>
  );
}
