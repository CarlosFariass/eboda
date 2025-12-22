import ColorPageClient from '@/components/ColorPageClient';
import { POPULAR_COLORS, getColorBySlug } from '@/lib/popular_colors_data';
import { notFound } from 'next/navigation';

/**
 * Página Dinâmica de Cores (Server Component)
 * 
 * Este arquivo deve ser colocado em: app/cores/[slug]/page.jsx
 * 
 * Este é um Server Component que:
 * - Gera os parâmetros estáticos com generateStaticParams()
 * - Gera os metadados com generateMetadata()
 * - Renderiza o componente ColorPageClient (Client Component)
 */

export async function generateStaticParams() {
  /**
   * Gera os parâmetros estáticos para todas as cores.
   * O Next.js pré-renderizará uma página para cada cor durante a build.
   */
  return POPULAR_COLORS.map((color) => ({
    slug: color.id,
  }));
}

export async function generateMetadata({ params }) {
  /**
   * Gera metadados (SEO) para cada página de cor.
   * Crucial para SEO e compartilhamento em redes sociais.
   */
  const color = getColorBySlug(params.slug);

  if (!color) {
    return {
      title: 'Cor não encontrada',
      description: 'A cor que você procura não existe em nosso catálogo.',
    };
  }

  return {
    title: `${color.name} - ${color.hex} | EBODA Paleta de Cores`,
    description: color.description,
    keywords: [
      color.name,
      color.hex,
      'paleta de cores',
      'harmonia de cores',
      'design',
      'cores RGB',
      'cores HSL',
      ...color.uses,
    ],
    openGraph: {
      title: `${color.name} - ${color.hex}`,
      description: color.description,
      type: 'website',
      images: [
        {
          url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'%3E%3Crect fill='${encodeURIComponent(color.hex)}' width='1200' height='630'/%3E%3C/svg%3E`,
          width: 1200,
          height: 630,
          alt: `Cor ${color.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${color.name} - ${color.hex}`,
      description: color.description,
    },
  };
}

export default function ColorPageRoute({ params }) {
  /**
   * Componente Server que renderiza a página de cor.
   * Busca os dados da cor e passa para o componente Client.
   */
  const color = getColorBySlug(params.slug);

  if (!color) {
    notFound();
  }

  return (
    <ColorPageClient
      colorName={color.name}
      colorHex={color.hex}
      colorDescription={color.description}
      colorUses={color.uses}
    />
  );
}