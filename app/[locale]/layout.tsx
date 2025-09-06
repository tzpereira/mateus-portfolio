import '@/styles/main.scss';
import { ThemeProvider } from 'next-themes';
import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: "Mateus Pereira | Senior Software Engineer & Data Specialist",
  description: "Portfolio of Mateus Pereira, Senior Software Engineer and Data Specialist. AI, Machine Learning, Custom Software, Legacy Modernization, and Tech Strategy.",
  keywords: [
    "Mateus Pereira",
    "Software Engineer",
    "Data Engineer",
    "AI",
    "Machine Learning",
    "Custom Software",
    "Tech Strategy",
    "Legacy Modernization",
    "Portfolio"
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mateus Pereira | Senior Software Engineer & Data Specialist",
    description: "Portfolio of Mateus Pereira, Senior Software Engineer and Data Specialist. AI, Machine Learning, Custom Software, Legacy Modernization, and Tech Strategy.",
    url: "https://mateusdasilva.vercel.app/",
    siteName: "Mateus Pereira Portfolio",
    images: [
      {
        url: "/assets/image/generic/mateus.png",
        width: 1200,
        height: 630,
        alt: "Mateus Pereira Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "https://mateusdasilva.vercel.app/"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Canonical link for SEO */}
        <link rel="canonical" href="https://mateusdasilva.vercel.app/" />
        {/* Open Graph meta tags (redundant with metadata, but for extra compatibility) */}
        <meta property="og:title" content="Mateus Pereira | Senior Software Engineer & Data Specialist" />
        <meta property="og:description" content="Portfolio of Mateus Pereira, Senior Software Engineer and Data Specialist. AI, Machine Learning, Custom Software, Legacy Modernization, and Tech Strategy." />
        <meta property="og:url" content="https://mateusdasilva.vercel.app/" />
        <meta property="og:site_name" content="Mateus Pereira Portfolio" />
        <meta property="og:image" content="/assets/image/generic/mateus.png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mateus Pereira",
          "url": "https://mateusdasilva.vercel.app/",
          "jobTitle": "Senior Software Engineer & Data Specialist",
          "sameAs": [
            "https://github.com/tzpereira"
          ],
          "description": "Portfolio of Mateus Pereira, Senior Software Engineer and Data Specialist. AI, Machine Learning, Custom Software, Legacy Modernization, and Tech Strategy."
        }) }} />
        {/* Robots.txt is served from /public, not here */}
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
