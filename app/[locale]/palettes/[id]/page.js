'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, Check, Heart, Share2, ArrowLeft, Download } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Função auxiliar para converter HEX para RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return hex;
}

export default function PaletteDetailPage({ params }) {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedPalettes, setRelatedPalettes] = useState([]);

  useEffect(() => {
    const fetchPalette = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        console.error('Erro ao buscar paleta:', error);
        setPalette(null);
      } else {
        setPalette({
          ...data,
          likes: data.likes || 0,
          views: data.views || 0,
          tags: data.tags || [],
          description: data.description || 'Paleta de cores da comunidade',
        });
        
        const { data: relatedData } = await supabase
          .from('palettes')
          .select('*')
          .neq('id', params.id)
          .order('likes', { ascending: false })
          .limit(3);
            
        setRelatedPalettes(relatedData || []);
      }
      setLoading(false);
    };

    fetchPalette();
  }, [params.id]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadPalette = () => {
    if (!palette) return;
    const data = palette.colors.map((color) => color.toUpperCase()).join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', `palette-${palette.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (!palette) return;
    
    const url = window.location.href;
    const text = `Confira esta paleta incrível no EBODA: ${palette.description}`;
    const title = `Paleta de Cores - ${palette.description}`;

    // Usar Web Share API se disponível (móvel e navegadores modernos)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        // Usuário cancelou ou erro - não fazer nada
        if (err.name !== 'AbortError') {
          console.log('Erro ao compartilhar:', err);
          fallbackShare(url);
        }
      }
    } else {
      // Fallback para navegadores sem Web Share API
      fallbackShare(url);
    }
  };

  const fallbackShare = (url) => {
    // Copiar link para clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
    }).catch(() => {
      // Fallback final: prompt com o link
      prompt('Copie o link abaixo:', url);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010] flex items-center justify-center pt-20">
        <p className="text-black dark:text-white/60 text-xl">Carregando detalhes da paleta...</p>
      </div>
    );
  }

  if (!palette) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010] flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Paleta não encontrada</h1>
          <Link href="/palettes" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">
            ← Voltar para paletas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Botão Voltar */}
        <Link
          href="/palettes"
          className="inline-flex items-center gap-2 text-black dark:text-white/60 hover:text-amber-700 dark:hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para paletas
        </Link>

        {/* Visualização Principal da Paleta */}
        <div className="bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-lg dark:shadow-amber-500/5 mb-8 border border-gray-200 dark:border-white/10">
          <div className="flex h-64 w-full">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 transition-all duration-300 hover:flex-grow cursor-pointer relative group"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <span className="text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {color.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações da Paleta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Descrição e Metadados */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{palette.description}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {palette.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-600 text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{palette.views || 0}</p>
              </div>
              <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Curtidas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{palette.likes || 0}</p>
              </div>
              <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Criador</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{palette.creator || 'Comunidade'}</p>
              </div>
            </div>
          </div>

          {/* Ações Laterais */}
          <div className="space-y-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                isLiked
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'Curtido' : 'Curtir'}
            </button>

            <button
              onClick={downloadPalette}
              className="w-full py-3 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10"
            >
              <Download size={20} />
              Baixar
            </button>

            <button
              onClick={() => shareOnSocial('twitter')}
              className="w-full py-3 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10"
            >
              <Share2 size={20} />
              Compartilhar
            </button>
          </div>
        </div>

        {/* Cores Detalhadas */}
        <div className="bg-white dark:bg-white/5 rounded-xl p-8 border border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cores da Paleta</h2>

          <div className="space-y-4">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                {/* Amostra de Cor */}
                <div
                  className="w-20 h-20 rounded-lg shadow-lg flex-shrink-0 border border-gray-200 dark:border-white/20"
                  style={{ backgroundColor: color }}
                />

                {/* Informações da Cor */}
                <div className="flex-grow">
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{color.toUpperCase()}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Cor #{index + 1}</p>
                </div>

                {/* Botões de Cópia */}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(color.toUpperCase(), `hex-${index}`)}
                    className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                      copiedIndex === `hex-${index}`
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {copiedIndex === `hex-${index}` ? (
                      <>
                        <Check size={18} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        HEX
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const rgb = hexToRgb(color);
                      copyToClipboard(rgb, `rgb-${index}`);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                      copiedIndex === `rgb-${index}`
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {copiedIndex === `rgb-${index}` ? (
                      <>
                        <Check size={18} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        RGB
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paletas Relacionadas */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Paletas Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPalettes.map((relatedPalette) => (
              <Link
                key={relatedPalette.id}
                href={`/palettes/${relatedPalette.id}`}
                className="group cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-white/5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-white/10"
              >
                <div className="flex h-24 w-full">
                  {relatedPalette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-white/5">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                    {relatedPalette.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
