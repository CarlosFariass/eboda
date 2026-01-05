export async function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: 'Contato',
    description: 'Entre em contato com a equipe EBODA. Envie suas dúvidas, sugestões ou feedback sobre nossas ferramentas de paleta de cores.',
    openGraph: {
      title: 'Contato | EBODA',
      description: 'Entre em contato com a equipe EBODA. Estamos aqui para ajudar.',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/contato`,
      languages: {
        'pt-BR': '/pt/contato',
        'en-US': '/en/contato',
      },
    },
  };
}

export default function ContatoLayout({ children }) {
  return children;
}
