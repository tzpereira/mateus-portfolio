import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GridBackdrop } from '@/components/ui/generative/GridBackdrop';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Projects } from '@/components/sections/Projects';
import { AILeverage } from '@/components/sections/AILeverage';
import { Process } from '@/components/sections/Process';
import { Depth } from '@/components/sections/Depth';
import { Writing } from '@/components/sections/Writing';
import { Contact } from '@/components/sections/Contact';
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <Analytics/>
      <GridBackdrop />
      <ScrollReveal />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Depth />
        <Projects />
        <Process />
        <AILeverage />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
