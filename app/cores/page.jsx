'use client';

import Link from 'next/link';
import { POPULAR_COLORS } from '@/lib/popular_colors_data';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * Página Index de Cores
 * 
 * Este arquivo deve ser colocado em: app/cores/page.jsx
 * 
 * Exibe todas as cores populares em um grid interativo.
 */

export default function CoresIndexPage() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (hex, colorName) => {
    navigator.clipboard.writeText(hex);
    setCopied(colorName);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      {/* Header */} 
      <div className="text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r  from-gray-700 via-gray-800 to-gray-900 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600 mb-4">Paleta de Cores Populares</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"  />
          <p className="text-black dark:text-white/60 text-lg mt-4">
            Explore nossa coleção de {POPULAR_COLORS.length} cores populares com informações detalhadas de acessibilidade e harmonias.
          </p>
        </div>
      </div>

      {/* Grid de Cores */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {POPULAR_COLORS.map((color) => (
          <Link
            key={color.id}
            href={`/cores/${color.id}`}
            className="group cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:z-10 relative"
          >
            {/* Visualização da Cor */}
            <div
              className="w-full h-32 transition-all"
              style={{ backgroundColor: color.hex }}
            />

            {/* Informações */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {color.name}
              </h3>

              {/* Código HEX */}
              <div className="flex items-center justify-between mb-3">
                <code className="text-sm font-mono text-slate-300">{color.hex}</code>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(color.hex, color.id);
                  }}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copiar HEX"
                >
                  {copied === color.id ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Descrição Curta */}
              <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                {color.description}
              </p>

              {/* CTA */}
              <div className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors font-semibold">
                Ver Detalhes →
              </div>
            </div>
          </Link>
        ))}
      </div>

        {/* Seção de CTA */}
        <div className="mt-16 group cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300 p-6">
          <h3 className="text-2xl font-bold text-white mb-3">Quer Criar Sua Própria Paleta?</h3>
          <p className="text-slate-300 mb-6">
            Use nossas ferramentas inovadoras para gerar paletas únicas baseadas na identidade da sua marca.
          </p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
          >
            Explorar Ferramentas
          </Link>
        </div>
      </div>
    </div>
  );
}