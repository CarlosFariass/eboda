export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Sobre Nós',
    description: 'Conheça a EBODA: nossa missão é democratizar o design de cores com ferramentas gratuitas e educação de qualidade. Saiba mais sobre nossa história e valores.',
    openGraph: {
      title: 'Sobre Nós | EBODA',
      description: 'Nossa missão é democratizar o design de cores com ferramentas gratuitas e educação de qualidade.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/sobre`,
      languages: {
        'pt-BR': '/pt/sobre',
        'en-US': '/en/sobre',
      },
    },
  };
}

export default function SobreLayout({ children }) {
  return children;
}
