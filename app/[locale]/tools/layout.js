export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Ferramentas de Cores Online Grátis',
    description: 'Ferramentas gratuitas para designers: Color Wheel interativo, Image Color Picker para extrair cores de imagens, Contrast Checker WCAG e Gradient Generator.',
    keywords: ['color wheel', 'image color picker', 'extrair cores', 'roda de cores', 'paleta de cores', 'ferramentas design'],
    openGraph: {
      title: 'Ferramentas de Cores Online Grátis | EBODA',
      description: 'Color Wheel, Image Picker, Contrast Checker e Gradient Generator. Ferramentas gratuitas para criar paletas de cores.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools`,
      languages: {
        'pt-BR': '/pt/tools',
        'en-US': '/en/tools',
      },
    },
  };
}

export default function ToolsLayout({ children }) {
  return children;
}
