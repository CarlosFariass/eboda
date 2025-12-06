'use client';

import LegalLayout from '@/components/LegalLayout';

const content = `# Sobre Nós

## Nossa Missão

A **EBODA** nasceu da frustração de designers e desenvolvedores com a complexidade e o tempo gasto na escolha de paletas de cores perfeitas. Nossa missão é simplificar a criação de cores, tornando a harmonia e a acessibilidade cromática instantâneas e intuitivas.

Acreditamos que a cor é a linguagem mais poderosa do design, e nossa plataforma é a ferramenta que traduz essa linguagem em resultados práticos e inovadores.

## O que Oferecemos

Somos um SaaS inovador focado em acelerar o fluxo de trabalho de cores. Nossas principais ferramentas incluem:

*   **Image Color Picker**: Extraia cores dominantes e específicas de qualquer imagem com precisão de pixel.
*   **Color Wheel Interativa**: Explore relações de cores, harmonias e contrastes em tempo real.
*   **Biblioteca de Cores**: Um vasto catálogo de cores populares e tendências, com informações detalhadas sobre acessibilidade e uso.

## Nossa Tecnologia

Construído com **Next.js** para performance, **Tailwind CSS** para design ágil e **Supabase** para escalabilidade e segurança de dados. Utilizamos modelos avançados de Inteligência Artificial para garantir que cada paleta gerada seja não apenas bonita, mas também funcional e alinhada com as melhores práticas de design.

## Contato

Se você tem alguma dúvida, sugestão ou quer apenas dizer olá, entre em contato conosco.

*   **E-mail**: ebodapalette@gmail.com
`;

export default function SobreNosPage() {
  return (
    <LegalLayout
      title="Sobre Nós"
      content={content}
      breadcrumb={[{ label: 'Sobre Nós' }]}
    />
  );
}