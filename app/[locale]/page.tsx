// i18n
import initTranslations from '../i18n';
import { TranslationProvider } from '@/components/providers/Translation';

// Sections
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

// Layout
import { Loading } from "@/components/layout/Loading"

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const { resources } = await initTranslations(locale, ['home']);

  return (
    <TranslationProvider
      namespaces={['home']}
      locale={locale}
      resources={resources}>
      <Loading>
        <main className="main">
          <Hero locale={locale} />
          <Services locale={locale} />
          <Work locale={locale} />
          <Stack locale={locale}/>
          <Contact locale={locale} />
        </main>
      </Loading>
    </TranslationProvider>
  );
}