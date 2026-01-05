export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Guia Completo de Teoria das Cores',
    description: 'Aprenda teoria das cores: roda de cores, harmonias cromáticas, temperatura, psicologia das cores, contraste e aplicação prática em design. Guia completo e gratuito.',
    keywords: ['teoria das cores', 'roda de cores', 'harmonia cromática', 'cores complementares', 'psicologia das cores', 'contraste de cores', 'guia de cores'],
    openGraph: {
      title: 'Guia Completo de Teoria das Cores | EBODA',
      description: 'Domine a teoria das cores: harmonias, psicologia, contraste e aplicação prática. Guia completo para designers.',
      type: 'article',
    },
    alternates: {
      canonical: `/${locale}/guia-cores`,
      languages: {
        'pt-BR': '/pt/guia-cores',
        'en-US': '/en/guia-cores',
      },
    },
  };
}

export default function GuiaCoresLayout({ children }) {
  return children;
}
