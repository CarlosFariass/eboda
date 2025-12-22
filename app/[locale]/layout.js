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

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EBODA - Paleta de Cores',
  description: 'Ferramenta inovadora de paleta de cores',
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