'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ChevronDown, 
  Type, 
  Sliders,
  Grid,
  List,
  Heart,
  Download,
  ExternalLink,
  X,
  RefreshCw
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { toggleLike, getUserLikedIds, LIKE_TYPES } from '@/lib/likes';
import AuthModal from '@/components/AuthModal';

// Categorias de fontes do Google Fonts
const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'serif', label: 'Serif' },
  { id: 'sans-serif', label: 'Sans Serif' },
  { id: 'display', label: 'Display' },
  { id: 'handwriting', label: 'Handwriting' },
  { id: 'monospace', label: 'Monospace' }
];

// Opções de ordenação
const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularidade' },
  { id: 'trending', label: 'Tendência' },
  { id: 'alphabetical', label: 'A-Z' },
  { id: 'styles', label: 'Nº de Estilos' }
];

// Textos de preview pré-definidos
const PREVIEW_TEXTS = [
  'The quick brown fox jumps over the lazy dog',
  'Sphinx of black quartz, judge my vow',
  'Pack my box with five dozen liquor jugs',
  'Amazingly few discotheques provide jukeboxes',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  'Olá, mundo! Design é arte.'
];

// Tamanhos de preview
const FONT_SIZES = [12, 14, 16, 20, 24, 32, 40, 48, 64, 96];

// Dataset completo de fontes populares do Google Fonts (Top 100+)
const GOOGLE_FONTS_DATA = [
  { family: 'Roboto', category: 'sans-serif', variants: ['100', '300', 'regular', '500', '700', '900'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700', '800'] },
  { family: 'Noto Sans', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Lato', category: 'sans-serif', variants: ['100', '300', 'regular', '700', '900'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Roboto Condensed', category: 'sans-serif', variants: ['300', 'regular', '700'] },
  { family: 'Source Sans Pro', category: 'sans-serif', variants: ['200', '300', 'regular', '600', '700', '900'] },
  { family: 'Inter', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Oswald', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700'] },
  { family: 'Raleway', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Roboto Mono', category: 'monospace', variants: ['100', '200', '300', 'regular', '500', '600', '700'] },
  { family: 'Nunito Sans', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Nunito', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Playfair Display', category: 'serif', variants: ['regular', '500', '600', '700', '800', '900'] },
  { family: 'Ubuntu', category: 'sans-serif', variants: ['300', 'regular', '500', '700'] },
  { family: 'Rubik', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Merriweather', category: 'serif', variants: ['300', 'regular', '700', '900'] },
  { family: 'PT Sans', category: 'sans-serif', variants: ['regular', '700'] },
  { family: 'Noto Serif', category: 'serif', variants: ['regular', '700'] },
  { family: 'Kanit', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Work Sans', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Lora', category: 'serif', variants: ['regular', '500', '600', '700'] },
  { family: 'Fira Sans', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Mulish', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Noto Sans JP', category: 'sans-serif', variants: ['100', '300', 'regular', '500', '700', '900'] },
  { family: 'Barlow', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Quicksand', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Inconsolata', category: 'monospace', variants: ['200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Titillium Web', category: 'sans-serif', variants: ['200', '300', 'regular', '600', '700', '900'] },
  { family: 'Heebo', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'IBM Plex Sans', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700'] },
  { family: 'DM Sans', category: 'sans-serif', variants: ['regular', '500', '700'] },
  { family: 'Libre Franklin', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Josefin Sans', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700'] },
  { family: 'Nanum Gothic', category: 'sans-serif', variants: ['regular', '700', '800'] },
  { family: 'Karla', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Libre Baskerville', category: 'serif', variants: ['regular', '700'] },
  { family: 'Dosis', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Oxygen', category: 'sans-serif', variants: ['300', 'regular', '700'] },
  { family: 'Source Code Pro', category: 'monospace', variants: ['200', '300', 'regular', '500', '600', '700', '900'] },
  { family: 'PT Serif', category: 'serif', variants: ['regular', '700'] },
  { family: 'Arimo', category: 'sans-serif', variants: ['regular', '500', '600', '700'] },
  { family: 'Cabin', category: 'sans-serif', variants: ['regular', '500', '600', '700'] },
  { family: 'Hind Siliguri', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Bebas Neue', category: 'display', variants: ['regular'] },
  { family: 'Anton', category: 'sans-serif', variants: ['regular'] },
  { family: 'Dancing Script', category: 'handwriting', variants: ['regular', '500', '600', '700'] },
  { family: 'Lobster', category: 'display', variants: ['regular'] },
  { family: 'Abril Fatface', category: 'display', variants: ['regular'] },
  { family: 'Comfortaa', category: 'display', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['regular'] },
  { family: 'Shadows Into Light', category: 'handwriting', variants: ['regular'] },
  { family: 'Indie Flower', category: 'handwriting', variants: ['regular'] },
  { family: 'Permanent Marker', category: 'handwriting', variants: ['regular'] },
  { family: 'Caveat', category: 'handwriting', variants: ['regular', '500', '600', '700'] },
  { family: 'Satisfy', category: 'handwriting', variants: ['regular'] },
  { family: 'Amatic SC', category: 'handwriting', variants: ['regular', '700'] },
  { family: 'Cormorant Garamond', category: 'serif', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Crimson Text', category: 'serif', variants: ['regular', '600', '700'] },
  { family: 'Archivo', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Exo 2', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Asap', category: 'sans-serif', variants: ['regular', '500', '600', '700'] },
  { family: 'Maven Pro', category: 'sans-serif', variants: ['regular', '500', '600', '700', '800', '900'] },
  { family: 'ABeeZee', category: 'sans-serif', variants: ['regular'] },
  { family: 'Space Grotesk', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Space Mono', category: 'monospace', variants: ['regular', '700'] },
  { family: 'Fira Code', category: 'monospace', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Manrope', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Sora', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Outfit', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Red Hat Display', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Urbanist', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Lexend', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Epilogue', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Be Vietnam Pro', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Figtree', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Bricolage Grotesque', category: 'sans-serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Geist', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Spectral', category: 'serif', variants: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { family: 'Source Serif Pro', category: 'serif', variants: ['200', '300', 'regular', '600', '700', '900'] },
  { family: 'EB Garamond', category: 'serif', variants: ['regular', '500', '600', '700', '800'] },
  { family: 'Bitter', category: 'serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Vollkorn', category: 'serif', variants: ['regular', '500', '600', '700', '800', '900'] },
  { family: 'Noto Serif JP', category: 'serif', variants: ['200', '300', 'regular', '500', '600', '700', '900'] },
  { family: 'Zilla Slab', category: 'serif', variants: ['300', 'regular', '500', '600', '700'] },
  { family: 'Cardo', category: 'serif', variants: ['regular', '700'] },
  { family: 'Fraunces', category: 'serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
  { family: 'Bodoni Moda', category: 'serif', variants: ['regular', '500', '600', '700', '800', '900'] },
  { family: 'Alfa Slab One', category: 'display', variants: ['regular'] },
  { family: 'Righteous', category: 'display', variants: ['regular'] },
  { family: 'Russo One', category: 'sans-serif', variants: ['regular'] },
  { family: 'Lilita One', category: 'display', variants: ['regular'] },
  { family: 'Fredoka One', category: 'display', variants: ['regular'] },
  { family: 'Bangers', category: 'display', variants: ['regular'] },
  { family: 'Concert One', category: 'display', variants: ['regular'] },
  { family: 'Bungee', category: 'display', variants: ['regular'] },
  { family: 'Staatliches', category: 'display', variants: ['regular'] },
  { family: 'Black Ops One', category: 'display', variants: ['regular'] },
];

export default function GoogleFontsExplorer() {
  const t = useTranslations('fontsExplorer');
  const { user } = useAuth();
  
  // Estados principais
  const [fonts, setFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de filtro
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados de preview
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [fontSize, setFontSize] = useState(32);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  
  // Estados de UI
  const [copied, setCopied] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedFont, setSelectedFont] = useState(null);
  const [loadedFonts, setLoadedFonts] = useState(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [likingFont, setLikingFont] = useState(null);
  
  // Paginação
  const [displayCount, setDisplayCount] = useState(24);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Carregar fontes do Google Fonts API
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
        
        if (!apiKey) {
          // Fallback para dataset local se não tiver API key
          setFonts(GOOGLE_FONTS_DATA);
          setFilteredFonts(GOOGLE_FONTS_DATA);
          setLoading(false);
          return;
        }
        
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao carregar fontes da API');
        }
        
        const data = await response.json();
        setFonts(data.items || []);
        setFilteredFonts(data.items || []);
      } catch (err) {
        console.error('Erro ao carregar fontes:', err);
        // Fallback para dataset local
        setFonts(GOOGLE_FONTS_DATA);
        setFilteredFonts(GOOGLE_FONTS_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  // Carregar favoritos do banco de dados quando usuário está logado
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const likedIds = await getUserLikedIds(user.id, LIKE_TYPES.FONT);
        setFavorites(likedIds);
      } else {
        setFavorites(new Set());
      }
    };
    loadFavorites();
  }, [user]);

  // Filtrar e ordenar fontes
  useEffect(() => {
    let result = [...fonts];

    // Filtrar por busca
    if (searchQuery) {
      result = result.filter(font => 
        font.family.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      result = result.filter(font => font.category === selectedCategory);
    }

    // Ordenar
    switch (sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.family.localeCompare(b.family));
        break;
      case 'styles':
        result.sort((a, b) => (b.variants?.length || 0) - (a.variants?.length || 0));
        break;
      case 'trending':
        // A API já retorna ordenado por popularidade, então invertemos um pouco para simular trending
        result = result.slice(0, 100).sort(() => Math.random() - 0.5);
        break;
      // 'popularity' é o default da API
    }

    setFilteredFonts(result);
    setDisplayCount(24); // Reset pagination quando filtros mudam
  }, [fonts, searchQuery, selectedCategory, sortBy]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredFonts.length) {
          setDisplayCount(prev => Math.min(prev + 24, filteredFonts.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredFonts.length]);

  // Carregar fonte dinamicamente
  const loadFont = useCallback((fontFamily, variants = ['regular']) => {
    if (loadedFonts.has(fontFamily)) return;

    const variantString = variants.slice(0, 4).join(',');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@${getWeightsFromVariants(variants)}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    setLoadedFonts(prev => new Set([...prev, fontFamily]));
  }, [loadedFonts]);

  // Converter variantes para pesos
  const getWeightsFromVariants = (variants) => {
    const weights = new Set();
    variants.forEach(v => {
      if (v === 'regular' || v === 'italic') weights.add('400');
      else if (v.includes('100')) weights.add('100');
      else if (v.includes('200')) weights.add('200');
      else if (v.includes('300')) weights.add('300');
      else if (v.includes('500')) weights.add('500');
      else if (v.includes('600')) weights.add('600');
      else if (v.includes('700')) weights.add('700');
      else if (v.includes('800')) weights.add('800');
      else if (v.includes('900')) weights.add('900');
    });
    return Array.from(weights).sort().join(';') || '400';
  };

  // Copiar para clipboard
  const copyToClipboard = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Toggle favorito com autenticação
  const toggleFavorite = async (font) => {
    // Se não está logado, mostra modal de login
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    if (likingFont === font.family) return;
    
    setLikingFont(font.family);
    
    // Optimistic update
    const wasLiked = favorites.has(font.family);
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(font.family);
      } else {
        newSet.add(font.family);
      }
      return newSet;
    });
    
    try {
      await toggleLike(user.id, font.family, LIKE_TYPES.FONT, {
        category: font.category,
        variants: font.variants,
      });
    } catch (error) {
      // Reverter em caso de erro
      setFavorites(prev => {
        const newSet = new Set(prev);
        if (wasLiked) {
          newSet.add(font.family);
        } else {
          newSet.delete(font.family);
        }
        return newSet;
      });
      console.error('Erro ao curtir fonte:', error);
    } finally {
      setLikingFont(null);
    }
  };

  // Gerar código de importação
  const getImportCode = (font) => {
    const weights = getWeightsFromVariants(font.variants || ['regular']);
    return `<link href="https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@${weights}&display=swap" rel="stylesheet">`;
  };

  // Gerar código CSS
  const getCSSCode = (font) => {
    return `font-family: '${font.family}', ${font.category};`;
  };

  // Fontes de fallback caso a API falhe
  const getFallbackFonts = () => {
    return [
      { family: 'Roboto', category: 'sans-serif', variants: ['100', '300', 'regular', '500', '700', '900'] },
      { family: 'Open Sans', category: 'sans-serif', variants: ['300', 'regular', '500', '600', '700', '800'] },
      { family: 'Lato', category: 'sans-serif', variants: ['100', '300', 'regular', '700', '900'] },
      { family: 'Montserrat', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
      { family: 'Poppins', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
      { family: 'Inter', category: 'sans-serif', variants: ['100', '200', '300', 'regular', '500', '600', '700', '800', '900'] },
      { family: 'Playfair Display', category: 'serif', variants: ['regular', '500', '600', '700', '800', '900'] },
      { family: 'Merriweather', category: 'serif', variants: ['300', 'regular', '700', '900'] },
      { family: 'Source Code Pro', category: 'monospace', variants: ['200', '300', 'regular', '500', '600', '700', '900'] },
      { family: 'Fira Code', category: 'monospace', variants: ['300', 'regular', '500', '600', '700'] },
    ];
  };

  // Renderizar card de fonte
  const FontCard = ({ font, index }) => {
    const isFavorite = favorites.has(font.family);
    const isLiking = likingFont === font.family;
    
    // Carregar fonte quando visível
    useEffect(() => {
      loadFont(font.family, font.variants);
    }, [font.family, font.variants]);

    return (
      <div 
        className={`group relative p-4 sm:p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 ${
          viewMode === 'list' ? 'flex items-center gap-6' : ''
        }`}
      >
        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(font)}
          disabled={isLiking}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${
            isFavorite 
              ? 'bg-red-100 dark:bg-red-500/20 text-red-500' 
              : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
          } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Font Preview */}
        <div className={viewMode === 'list' ? 'flex-1' : ''}>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-white/60 mb-1">
              {font.family}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/50 capitalize">
              {font.category}
            </span>
            <span className="text-xs ml-2 text-gray-500 dark:text-white/40">
              {font.variants?.length || 0} estilos
            </span>
          </div>

          <div 
            className="text-2xl sm:text-3xl text-gray-800 dark:text-white mb-4 min-h-[60px] line-clamp-2 break-words"
            style={{ 
              fontFamily: `'${font.family}', ${font.category}`,
              fontSize: viewMode === 'list' ? `${fontSize * 0.75}px` : `${fontSize}px`
            }}
          >
            {previewText}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-2 ${viewMode === 'list' ? '' : 'mt-4'}`}>
          <button
            onClick={() => setSelectedFont(font)}
            className="flex-1 py-2 px-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white text-sm font-medium transition-colors"
          >
            Ver detalhes
          </button>
          <button
            onClick={() => copyToClipboard(getCSSCode(font), `css-${font.family}`)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white/60 transition-colors"
            title="Copiar CSS"
          >
            {copied === `css-${font.family}` ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  };

  // Modal de detalhes da fonte
  const FontDetailModal = ({ font, onClose }) => {
    if (!font) return null;

    const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    const availableWeights = weights.filter(w => 
      font.variants?.some(v => v.includes(String(w)) || (w === 400 && v === 'regular'))
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{font.family}</h2>
              <p className="text-sm text-gray-500 dark:text-white/60 capitalize">{font.category} • {font.variants?.length || 0} estilos</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Preview grande */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-white/60 uppercase tracking-wider">
                Preview
              </h3>
              <div 
                className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                style={{ fontFamily: `'${font.family}', ${font.category}` }}
              >
                <p className="text-5xl text-gray-800 dark:text-white mb-4">Aa Bb Cc</p>
                <p className="text-2xl text-gray-700 dark:text-white/80 mb-2">
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-lg text-gray-600 dark:text-white/60">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>
            </div>

            {/* Pesos disponíveis */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-white/60 uppercase tracking-wider">
                Pesos Disponíveis
              </h3>
              <div className="grid gap-3">
                {availableWeights.map(weight => (
                  <div 
                    key={weight}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  >
                    <span className="text-sm text-gray-500 dark:text-white/60 w-24">
                      {weight === 100 && 'Thin'}
                      {weight === 200 && 'Extra Light'}
                      {weight === 300 && 'Light'}
                      {weight === 400 && 'Regular'}
                      {weight === 500 && 'Medium'}
                      {weight === 600 && 'Semi Bold'}
                      {weight === 700 && 'Bold'}
                      {weight === 800 && 'Extra Bold'}
                      {weight === 900 && 'Black'}
                      <span className="text-xs ml-1">({weight})</span>
                    </span>
                    <span 
                      className="text-xl text-gray-800 dark:text-white"
                      style={{ 
                        fontFamily: `'${font.family}', ${font.category}`,
                        fontWeight: weight
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Código de uso */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-white/60 uppercase tracking-wider">
                Como usar
              </h3>
              
              {/* HTML Import */}
              <div className="p-4 rounded-xl bg-gray-900 dark:bg-black/50 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">HTML</span>
                  <button
                    onClick={() => copyToClipboard(getImportCode(font), 'html-import')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === 'html-import' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-sm text-green-400 font-mono break-all">
                  {getImportCode(font)}
                </code>
              </div>

              {/* CSS */}
              <div className="p-4 rounded-xl bg-gray-900 dark:bg-black/50 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">CSS</span>
                  <button
                    onClick={() => copyToClipboard(getCSSCode(font), 'css-code')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === 'css-code' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-sm text-blue-400 font-mono">
                  {getCSSCode(font)}
                </code>
              </div>

              {/* Next.js */}
              <div className="p-4 rounded-xl bg-gray-900 dark:bg-black/50 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Next.js</span>
                  <button
                    onClick={() => copyToClipboard(`import { ${font.family.replace(/ /g, '_')} } from 'next/font/google';\n\nconst font = ${font.family.replace(/ /g, '_')}({ subsets: ['latin'] });`, 'nextjs-code')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === 'nextjs-code' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <pre className="text-sm text-amber-400 font-mono">
{`import { ${font.family.replace(/ /g, '_')} } from 'next/font/google';

const font = ${font.family.replace(/ /g, '_')}({ subsets: ['latin'] });`}
                </pre>
              </div>
            </div>

            {/* Link para Google Fonts */}
            <a
              href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, '+')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              Ver no Google Fonts
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header com título e controles */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              🔤 {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-white/60">
              {t('subtitle')}
            </p>
          </div>
          
          {/* Contador */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <Type className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700 dark:text-white font-semibold">
              {filteredFonts.length} fontes
            </span>
          </div>
        </div>

        {/* Barra de busca e filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Filtros toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
              showFilters 
                ? 'bg-amber-500 border-amber-500 text-white' 
                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">{t('filters')}</span>
          </button>

          {/* View mode */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Painel de filtros expandido */}
        {showFilters && (
          <div className="mt-4 p-4 sm:p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
            {/* Categorias */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                {t('category')}
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                {t('sortBy')}
              </label>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === opt.id
                        ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview customizado */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                  {t('previewText')}
                </label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Digite o texto de preview..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {PREVIEW_TEXTS.slice(0, 4).map((text, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewText(text)}
                      className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 truncate max-w-[150px]"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                  {t('fontSize')}: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="96"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between mt-2">
                  {[16, 24, 32, 48, 64].map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-2 py-1 text-xs rounded ${
                        fontSize === size 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60'
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <RefreshCw className="w-10 h-10 text-amber-500 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-white/60">{t('loading')}</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{t('error')}: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      )}

      {/* Grid de fontes */}
      {!loading && !error && (
        <>
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredFonts.slice(0, displayCount).map((font, index) => (
              <FontCard key={font.family} font={font} index={index} />
            ))}
          </div>

          {/* Load more trigger */}
          {displayCount < filteredFonts.length && (
            <div ref={loadMoreRef} className="flex justify-center py-10">
              <RefreshCw className="w-6 h-6 text-amber-500 animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {filteredFonts.length === 0 && (
            <div className="text-center py-20">
              <Type className="w-16 h-16 text-gray-300 dark:text-white/20 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-white/60">{t('noResults')}</p>
            </div>
          )}
        </>
      )}

      {/* Modal de detalhes */}
      {selectedFont && (
        <FontDetailModal font={selectedFont} onClose={() => setSelectedFont(null)} />
      )}
    </div>
  );
}
