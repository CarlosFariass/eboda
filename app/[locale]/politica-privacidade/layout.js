export const metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do EBODA. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
  openGraph: {
    title: 'Política de Privacidade | EBODA',
    description: 'Como o EBODA coleta, usa e protege seus dados pessoais.',
    type: 'website',
  },
  alternates: {
    canonical: '/politica-privacidade',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadeLayout({ children }) {
  return children;
}
