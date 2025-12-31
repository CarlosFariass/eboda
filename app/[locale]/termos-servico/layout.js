export const metadata = {
  title: 'Termos de Serviço',
  description: 'Termos de Serviço do EBODA. Leia nossos termos de uso, direitos de propriedade intelectual, limitações de responsabilidade e política de uso.',
  openGraph: {
    title: 'Termos de Serviço | EBODA',
    description: 'Termos e condições de uso do EBODA.',
    type: 'website',
  },
  alternates: {
    canonical: '/termos-servico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosLayout({ children }) {
  return children;
}
