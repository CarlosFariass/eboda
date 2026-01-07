import React from 'react';
import GoogleFontsExplorer from '@/components/GoogleFontsExplorer';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  return {
    title: locale === 'pt' ? 'Explorador de Fontes Google' : 'Google Fonts Explorer',
    description: locale === 'pt' 
      ? 'Explore mais de 1500 fontes do Google Fonts. Filtre por categoria, peso e popularidade. Visualize, compare e exporte para CSS, HTML ou Next.js.'
      : 'Explore over 1500 Google Fonts. Filter by category, weight and popularity. Preview, compare and export to CSS, HTML or Next.js.',
    keywords: ['google fonts', 'fontes', 'tipografia', 'typography', 'font explorer', 'web fonts', 'font pairing'],
    openGraph: {
      title: locale === 'pt' ? 'Explorador de Fontes Google | EBODA' : 'Google Fonts Explorer | EBODA',
      description: locale === 'pt' 
        ? 'Explore e descubra as melhores fontes para seu projeto. Preview, compare e exporte facilmente.'
        : 'Explore and discover the best fonts for your project. Preview, compare and export easily.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools/fonts`,
      languages: {
        'pt-BR': '/pt/tools/fonts',
        'en-US': '/en/tools/fonts',
      },
    },
  };
}

export default function FontsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <GoogleFontsExplorer />
      </div>
    </main>
  );
}
