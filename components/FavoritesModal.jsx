'use client';

import { useState, useEffect } from 'react';
import { X, Heart, Copy, Download, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FavoritesModal = ({ user, onClose }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/favorites?userId=${user.id}`);
      const data = await response.json();
      
      if (data.favorites) {
        setFavorites(data.favorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (favoriteId) => {
    if (!confirm('Tem certeza que deseja remover este componente dos favoritos?')) {
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: favoriteId, userId: user.id })
      });

      if (response.ok) {
        setFavorites(favorites.filter(f => f.id !== favoriteId));
        if (selectedFavorite?.id === favoriteId) {
          setSelectedFavorite(null);
        }
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      alert('Erro ao remover favorito');
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert('✅ Código copiado!');
  };

  const handleDownload = (favorite) => {
    const blob = new Blob([favorite.component_code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${favorite.component_name.replace(/\s+/g, '-').toLowerCase()}.jsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredFavorites = favorites.filter(f => {
    const matchesFilter = filter === 'all' || f.component_type === filter;
    const matchesSearch = f.component_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         f.component_preview?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const componentTypes = [...new Set(favorites.map(f => f.component_type))];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0015] rounded-2xl w-full max-w-6xl max-h-[90vh] shadow-2xl border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Componentes Favoritos</h2>
              <p className="text-gray-600 dark:text-white/60 text-sm">{favorites.length} componentes salvos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-6 border-b border-white/10 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar componentes..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/5 text-gray-600 dark:text-white/60 hover:bg-white/10'
              }`}
            >
              Todos ({favorites.length})
            </button>
            {componentTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all ${
                  filter === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-gray-600 dark:text-white/60 hover:bg-white/10'
                }`}
              >
                {type} ({favorites.filter(f => f.component_type === type).length})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* List */}
          <div className="w-1/3 border-r border-white/10 overflow-y-auto p-4 space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum componente encontrado</p>
              </div>
            ) : (
              filteredFavorites.map((favorite) => (
                <button
                  key={favorite.id}
                  onClick={() => setSelectedFavorite(favorite)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedFavorite?.id === favorite.id
                      ? 'bg-white/10 border border-purple-500'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {favorite.component_name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-white/60 line-clamp-2">
                        {favorite.component_preview || 'Sem descrição'}
                      </p>
                    </div>
                    <div 
                      className="w-8 h-8 rounded flex-shrink-0"
                      style={{ backgroundColor: favorite.primary_color }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="px-2 py-1 bg-white/10 rounded capitalize">
                      {favorite.component_type}
                    </span>
                    <span>•</span>
                    <span>{new Date(favorite.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Preview */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedFavorite ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedFavorite.component_name}
                    </h3>
                    <p className="text-gray-600 dark:text-white/60 mb-4">
                      {selectedFavorite.component_preview}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: selectedFavorite.primary_color }}
                        />
                        <span className="text-gray-600 dark:text-white/60 text-sm font-mono">
                          {selectedFavorite.primary_color}
                        </span>
                      </div>
                      {selectedFavorite.tags && selectedFavorite.tags.length > 0 && (
                        <>
                          <span className="text-white/40">•</span>
                          {selectedFavorite.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-600 dark:text-white/60 capitalize">
                              {tag}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopy(selectedFavorite.component_code)}
                    variant="outline"
                    className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Código
                  </Button>
                  <Button
                    onClick={() => handleDownload(selectedFavorite)}
                    variant="outline"
                    className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    onClick={() => handleDelete(selectedFavorite.id)}
                    variant="outline"
                    className="flex items-center gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </Button>
                </div>

                {/* Code */}
                <div className="relative">
                  <pre className="bg-[#1e1e1e] rounded-lg p-6 overflow-x-auto max-h-[500px]">
                    <code className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                      {selectedFavorite.component_code}
                    </code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white/40">
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Selecione um componente para ver os detalhes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;