import '@/styles/main.scss';
import { Geist_Mono, Michroma } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// display font — closest Google Fonts match to the Arc'teryx wordmark (Handel Gothic)
const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-michroma',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f3ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0d0c' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mateuspereira.dev'),
  title: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer',
  description:
    'Senior software engineer, product engineer, and solution architect — a rare combination of engineering depth, product sense, and creative craft. I take problems from ambiguity to shipped product, end to end.',
  keywords: [
    'Senior Full-Stack Software Engineer', 'Senior Product Software Engineer',
    'Full-cycle Product Engineer', 'Founding Engineer', 'Solution Architect',
    'Product-minded Software Engineer', 'Software Architecture',
    'Product Discovery', 'B2B SaaS', 'Enterprise Software', 'Enterprise Platforms',
    'TypeScript', 'Next.js', 'React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'AWS',
    'LLM Applications', 'MCP', 'RAG',
  ],
  authors: [{ name: 'Mateus Pereira da Silva' }],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer',
    description: 'Software engineer, product engineer, and solution architect — from unclear problem to production system, end to end.',
    url: 'https://mateuspereira.dev/',
    siteName: 'Mateus P. S.',
    images: [{ url: 'https://mateuspereira.dev/og-image.png', width: 1200, height: 630, alt: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer',
    description: 'Product discovery, solution architecture, and engineering execution — end to end.',
    images: ['https://mateuspereira.dev/og-image.png'],
  },
  alternates: { canonical: 'https://mateuspereira.dev/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistMono.variable} ${michroma.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mateus Pereira da Silva',
              alternateName: 'Mateus P. S.',
              jobTitle: 'Senior Full-Stack / Product Software Engineer',
              url: 'https://mateuspereira.dev/',
              email: 'mailto:mateuspdasilva369@gmail.com',
              description: 'Senior software engineer, product engineer, and solution architect — product discovery, solution architecture, and engineering execution, end to end.',
              knowsAbout: ['Software architecture', 'Product discovery', 'Product engineering', 'TypeScript', 'Go', 'Python', 'PostgreSQL', 'AWS', 'LLM applications', 'RAG'],
              sameAs: ['https://www.linkedin.com/in/mateuspdasilva', 'https://github.com/tzpereira'],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
