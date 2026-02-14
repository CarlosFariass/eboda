import React from 'react';
import RemoveBackground from '@/components/RemoveBackground';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  return {
    title: locale === 'pt' 
      ? 'Remover Fundo de Imagem Online Grátis | EBODA'
      : 'Remove Image Background Online Free | EBODA',
    description: locale === 'pt'
      ? 'Remova o fundo de qualquer imagem automaticamente com IA. Ferramenta gratuita, sem cadastro. Baixe sua imagem PNG transparente em segundos.'
      : 'Remove background from any image automatically with AI. Free tool, no signup required. Download your transparent PNG image in seconds.',
    keywords: ['remove background', 'remover fundo', 'background remover', 'transparent png', 'imagem sem fundo', 'remove bg', 'AI background removal'],
    openGraph: {
      title: locale === 'pt' 
        ? 'Remover Fundo de Imagem | EBODA'
        : 'Remove Image Background | EBODA',
      description: locale === 'pt'
        ? 'Remova o fundo de qualquer imagem automaticamente com IA. Gratuito e sem cadastro.'
        : 'Remove background from any image automatically with AI. Free and no signup.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools/remove-background`,
      languages: {
        'pt-BR': '/pt/tools/remove-background',
        'en-US': '/en/tools/remove-background',
      },
    },
  };
}

export default function RemoveBackgroundPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <RemoveBackground />
      </div>
    </main>
  );
}
