import React from 'react';
import GradientGenerator from '@/components/GradientGenerator';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  return {
    title: 'Gerador de Gradientes CSS Online Grátis',
    description: 'Crie gradientes CSS personalizados: linear, radial e conic. Exporte código CSS e Tailwind instantaneamente. Ferramenta gratuita para designers.',
    keywords: ['gradient generator', 'gerador de gradientes', 'gradiente CSS', 'linear gradient', 'radial gradient', 'Tailwind gradients'],
    openGraph: {
      title: 'Gerador de Gradientes CSS Online | EBODA',
      description: 'Crie gradientes CSS personalizados e exporte para CSS ou Tailwind. Ferramenta gratuita.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools/gradient-generator`,
      languages: {
        'pt-BR': '/pt/tools/gradient-generator',
        'en-US': '/en/tools/gradient-generator',
      },
    },
  };
}

export default function GradientGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <GradientGenerator />
      </div>
    </main>
  );
}