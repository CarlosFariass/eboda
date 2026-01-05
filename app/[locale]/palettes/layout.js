export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Paletas de Cores Prontas para Usar',
    description: 'Descubra paletas de cores curadas para seus projetos. Filtros por estilo: escuro, claro, pastel, neon, vintage, moderno e mais. Copie e use instantaneamente.',
    keywords: ['paletas de cores', 'paletas prontas', 'combinação de cores', 'paletas para web', 'paletas design', 'cores tendência'],
    openGraph: {
      title: 'Paletas de Cores Prontas para Usar | EBODA',
      description: 'Centenas de paletas de cores curadas. Filtre por estilo e copie para usar em seus projetos.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/palettes`,
      languages: {
        'pt-BR': '/pt/palettes',
        'en-US': '/en/palettes',
      },
    },
  };
}

export default function PalettesLayout({ children }) {
  return children;
}
