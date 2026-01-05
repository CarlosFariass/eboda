export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Biblioteca de Cores Populares',
    description: 'Explore nossa biblioteca com mais de 25 cores populares. Encontre códigos HEX, RGB, HSL e descubra combinações harmônicas para seus projetos de design.',
    keywords: ['cores populares', 'códigos hex', 'cores para design', 'paleta de cores', 'cores RGB', 'cores HSL'],
    openGraph: {
      title: 'Biblioteca de Cores Populares | EBODA',
      description: 'Mais de 25 cores populares com códigos HEX, RGB e HSL. Encontre a cor perfeita para seu projeto.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/cores`,
      languages: {
        'pt-BR': '/pt/cores',
        'en-US': '/en/cores',
      },
    },
  };
}

export default function CoresLayout({ children }) {
  return children;
}
