// app/[locale]/layout.js
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import '../globals.css';

import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next";
import { WebsiteJsonLd, OrganizationJsonLd, SoftwareApplicationJsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'EBODA - Gerador de Paleta de Cores Online Grátis',
    template: '%s | EBODA'
  },
  description: 'Crie paletas de cores profissionais com ferramentas gratuitas: Color Wheel, Image Color Picker, Contrast Checker e Gradient Generator. Extraia cores de imagens, verifique acessibilidade WCAG e exporte para CSS, SCSS e Tailwind.',
  keywords: ['paleta de cores', 'gerador de cores', 'color picker', 'cores complementares', 'harmonia de cores', 'WCAG', 'acessibilidade', 'gradiente CSS', 'design', 'UI/UX'],
  authors: [{ name: 'EBODA' }],
  creator: 'EBODA',
  publisher: 'EBODA',
  metadataBase: new URL('https://eboda.com.br'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://eboda.com.br',
    siteName: 'EBODA',
    title: 'EBODA - Gerador de Paleta de Cores Online Grátis',
    description: 'Crie paletas de cores profissionais com ferramentas gratuitas. Extraia cores de imagens, verifique acessibilidade e exporte para CSS.',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EBODA - Gerador de Paleta de Cores',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EBODA - Gerador de Paleta de Cores Online Grátis',
    description: 'Crie paletas de cores profissionais com ferramentas gratuitas. Color Wheel, Image Picker, Contrast Checker e mais.',
    images: ['/assets/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'sua-verification-code-aqui',
  },
};

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pt' }
  ];
}

export default async function RootLayout({ children, params }) {
  // Validação do locale - IMPORTANTE!
  if (!['en', 'pt'].includes(params.locale)) {
    notFound();
  }

  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2115500079864644" />
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <SoftwareApplicationJsonLd />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            
            <HeaderWrapper />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />

            <Analytics />

          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}