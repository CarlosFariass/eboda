import React from 'react';
import ContrastChecker from '@/components/ContrastChecker';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  return {
    title: 'Verificador de Contraste WCAG - Acessibilidade',
    description: 'Verifique o contraste entre cores e garanta acessibilidade WCAG AA e AAA para seu projeto. Ferramenta gratuita para designers e desenvolvedores.',
    keywords: ['contrast checker', 'verificador de contraste', 'WCAG', 'acessibilidade', 'AA', 'AAA', 'cores acessíveis'],
    openGraph: {
      title: 'Verificador de Contraste WCAG | EBODA',
      description: 'Verifique se suas combinações de cores atendem aos padrões WCAG AA e AAA de acessibilidade.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools/contrast-checker`,
      languages: {
        'pt-BR': '/pt/tools/contrast-checker',
        'en-US': '/en/tools/contrast-checker',
      },
    },
  };
}

export default function ContrastCheckerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <ContrastChecker />
      </div>
    </main>
  );
}