'use client';

import { useState, useEffect, useCallback } from 'react';
import PaletteCard from '@/components/PaletteCard';
import { Search, Filter } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

// Inicializa o cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const FILTER_OPTIONS = [
  // Popularidade e Tempo
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'new', label: 'Novo', icon: '✨' },
  { id: 'trending', label: 'Tendência', icon: '🔥' },
  
  // Luminosidade
  { id: 'dark', label: 'Escuro', icon: '🌙' },
  { id: 'light', label: 'Claro', icon: '☀️' },
  { id: 'pastel', label: 'Pastel', icon: '🎀' },
  { id: 'neon', label: 'Neon', icon: '💡' },
  
  // Estilo Visual
  { id: 'vibrant', label: 'Vibrante', icon: '🎨' },
  { id: 'minimal', label: 'Minimalista', icon: '⚪' },
  { id: 'gradient', label: 'Gradiente', icon: '🌈' },
  { id: 'monochrome', label: 'Monocromático', icon: '◐' },
  { id: 'contrast', label: 'Alto Contraste', icon: '◐' },
  
  // Temperatura
  { id: 'warm', label: 'Quente', icon: '🔥' },
  { id: 'cool', label: 'Frio', icon: '❄️' },
  
  // Estilos e Temas
  { id: 'vintage', label: 'Vintage', icon: '📼' },
  { id: 'retro', label: 'Retrô', icon: '🕹️' },
  { id: 'modern', label: 'Moderno', icon: '🏢' },
  { id: 'classic', label: 'Clássico', icon: '🎩' },
  { id: 'elegant', label: 'Elegante', icon: '👔' },
  { id: 'playful', label: 'Divertido', icon: '🎪' },
  { id: 'professional', label: 'Profissional', icon: '💼' },
  { id: 'creative', label: 'Criativo', icon: '🎭' },
  
  // Natureza
  { id: 'nature', label: 'Natureza', icon: '🌿' },
  { id: 'ocean', label: 'Oceano', icon: '🌊' },
  { id: 'forest', label: 'Floresta', icon: '🌲' },
  { id: 'sunset', label: 'Pôr do Sol', icon: '🌅' },
  { id: 'earth', label: 'Terra', icon: '🌍' },
  
  // Estações
  { id: 'summer', label: 'Verão', icon: '🏖️' },
  { id: 'autumn', label: 'Outono', icon: '🍂' },
  { id: 'winter', label: 'Inverno', icon: '⛄' },
  { id: 'spring', label: 'Primavera', icon: '🌸' },
  
  // Emoções
  { id: 'calm', label: 'Calmo', icon: '🧘' },
  { id: 'energetic', label: 'Energético', icon: '⚡' },
  { id: 'romantic', label: 'Romântico', icon: '💕' },
  { id: 'bold', label: 'Ousado', icon: '💪' },
  { id: 'soft', label: 'Suave', icon: '🤍' },
  
  // Aplicações
  { id: 'web', label: 'Web Design', icon: '💻' },
  { id: 'app', label: 'App Design', icon: '📱' },
  { id: 'branding', label: 'Branding', icon: '🎯' },
  { id: 'illustration', label: 'Ilustração', icon: '🖼️' },
  { id: 'ui', label: 'UI Design', icon: '🖥️' },
  
  // Cores Dominantes
  { id: 'pink', label: 'Rosa', icon: '🌸' },
  { id: 'blue', label: 'Azul', icon: '🔵' },
  { id: 'green', label: 'Verde', icon: '🟢' },
  { id: 'purple', label: 'Roxo', icon: '🟣' },
  { id: 'orange', label: 'Laranja', icon: '🟠' },
  { id: 'red', label: 'Vermelho', icon: '🔴' },
  { id: 'yellow', label: 'Amarelo', icon: '🟡' },
  { id: 'brown', label: 'Marrom', icon: '🟤' },
  { id: 'gold', label: 'Dourado', icon: '✨' },
  
  // Outros Estilos
  { id: 'pop', label: 'Pop Art', icon: '💥' },
  { id: 'material', label: 'Material Design', icon: '📐' },
  { id: 'corporate', label: 'Corporativo', icon: '🏛️' },
  { id: 'luxury', label: 'Luxo', icon: '💎' },
  { id: 'bohemian', label: 'Boêmio', icon: '🌻' },
];

export default function PalettesPage() {
  const t = useTranslations('palettes');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('filters');
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [totalPalettes, setTotalPalettes] = useState(0);

  // Função para buscar dados do Supabase com filtros e ordenação
  const fetchPalettes = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('palettes')
      .select('*', { count: 'exact' });

    // 1. Aplicar Filtros de Tags usando OVERLAPS (correto para arrays PostgreSQL)
    if (selectedFilters.length > 0) {
      query = query.overlaps('tags', selectedFilters);
    }

    // 2. Aplicar Busca por Texto
    if (searchQuery) {
      const searchPattern = `%${searchQuery.toLowerCase()}%`;
      query = query.ilike('description', searchPattern);
    }

    // 3. Aplicar Ordenação
    switch (sortBy) {
      case 'popular':
        query = query.order('likes', { ascending: false });
        break;
      case 'views':
        query = query.order('views', { ascending: false });
        break;
      case 'new':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // 4. Executar a Query
    const { data, error, count } = await query;

    if (error) {
      console.error('Erro ao buscar paletas:', error);
      setPalettes([]);
      setTotalPalettes(0);
    } else {
      const mappedData = data.map(p => ({
        ...p,
        likes: p.likes || 0,
        views: p.views || 0,
        tags: p.tags || [],
        description: p.description || 'Paleta de cores da comunidade',
      }));
      setPalettes(mappedData);
      setTotalPalettes(count || 0);
    }
    setLoading(false);
  }, [selectedFilters, searchQuery, sortBy]);

  useEffect(() => {
    fetchPalettes();
  }, [fetchPalettes]);

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r  from-gray-700 via-gray-800 to-gray-900 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600 mb-4">
            {t('title')}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          <p className="text-black dark:text-white/60 text-lg mt-4">
            {t('subtitle')}
          </p>
        </div>

        {/* Barra de Busca */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filtros e Ordenação */}
        <div className="mb-8 space-y-4">
          {/* Ordenação */}
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-800 dark:text-white-300" />
            <label className="text-black dark:text-white/60">{t('sortBy')}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="popular">{t('mostPopular')}</option>
              <option value="new">{t('mostRecent')}</option>
              <option value="views">{t('mostViewed')}</option>
            </select>
          </div>

          {/* Filtros de Tags */}
          <div>
            <p className="text-black dark:text-white/60 mb-3 font-semibold">{t('filterByCategory')}</p>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                    selectedFilters.includes(filter.id)
                      ? 'bg-purple-600 text-white border border-purple-400'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-purple-500'
                  }`}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros Ativos */}
          {selectedFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-400">{t('activeFilters')}</span>
              {selectedFilters.map((filter) => {
                const filterOption = FILTER_OPTIONS.find(f => f.id === filter);
                return (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm flex items-center gap-2 hover:bg-purple-700 transition-colors"
                  >
                    {filterOption?.label || filter}
                    <span>×</span>
                  </button>
                );
              })}
              <button
                onClick={() => setSelectedFilters([])}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
              >
                {tCommon('clearAll')}
              </button>
            </div>
          )}
        </div>

        {/* Indicador de Carregamento */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-black dark:text-white/60 text-xl">{t('loadingPalettes')}</p>
          </div>
        )}

        {/* Grid de Paletas */}
        {!loading && palettes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {palettes.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              {t('noPalettesFound')}
            </p>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-black dark:text-white/60 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {tCommon('clearFilters')}
            </button>
          </div>
        )}

        {/* Informações de Resultados */}
        {!loading && palettes.length > 0 && (
          <div className="mt-12 text-center">
            <p>
              {tCommon('showing')} <span className="text-black dark:text-white/60">{palettes.length}</span> {tCommon('of')}{' '}
              <span className="text-black dark:text-white/60">{totalPalettes}</span> {t('palettesCount')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}