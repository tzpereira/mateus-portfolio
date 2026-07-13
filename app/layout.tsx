import '@/styles/main.scss';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mateusps.vercel.app'),
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-16x16.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer',
    description: 'Software engineer, product engineer, and solution architect — from unclear problem to production system, end to end.',
    url: 'https://mateusps.vercel.app/',
    siteName: 'Mateus P. S.',
    images: [{ url: 'https://mateusps.vercel.app/og-image.png', width: 1200, height: 630, alt: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateus P. S. — Senior Full-Stack / Product Software Engineer',
    description: 'Product discovery, solution architecture, and engineering execution — end to end.',
    images: ['https://mateusps.vercel.app/og-image.png'],
  },
  alternates: { canonical: 'https://mateusps.vercel.app/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);var c=t==='dark'?'#0a0a0f':'#fbfbfc';var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].setAttribute('content',c);}}catch(e){}})();`,
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
              url: 'https://mateusps.vercel.app/',
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
