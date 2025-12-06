'use client';

import { useState } from 'react';
import { Sparkles, Download, Save, Palette, Heart } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import PaletteViewer from '@/components/PaletteViewer';
import ColorSplash from '@/components/ColorSplash';
import ExportModal from '@/components/ExportModal';
import FavoritesModal from '@/components/FavoritesModal';
import { Button } from '@/components/ui/button';

// Default color palette
const DEFAULT_COLORS = [
  '#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', 
  '#8B5CF6', '#EF4444', '#06B6D4'
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [user, setUser] = useState(null); 

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
        {/* Header e Footer agora são renderizados pelo layout.js global */}
        
        <main className="container mx-auto px-4 py-12">
          {/* Main Palette Section */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
            {/* Title */}
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r 
                from-gray-700 via-gray-800 to-gray-900
                dark:from-purple-400 dark:via-pink-500 dark:to-purple-600">
                Sua Paleta de Cores
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />

              <p className="text-black dark:text-white/60 text-lg">
                Passe o mouse para ver os códigos, clique para ver combinações
              </p>
            </div>

            {/* Palette Viewer - NOVO COMPONENTE */}
            <PaletteViewer
              colors={colors}
              onColorClick={(color) => setSelectedColor(color)}
            />

            {/* <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={handleExport}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-white/20 text-black dark:text-white/60 hover:bg-white/10"
              >
                <Download className="w-5 h-5" />
                Exportar
              </Button>
              <Button
                onClick={() => setShowFavoritesModal(true)}
                disabled={!user}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                title={user ? 'Ver favoritos' : 'Faça login para ver favoritos'}
              >
                <Heart className="w-5 h-5" />
                Favoritos
              </Button>
            </div> */}
          </div>

          {/* Info Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">Insira uma imagem</h3>
              <p className="text-black dark:text-white/60">
                Veja todas as cores que complementam a sua imagem e crie paletas que combinam
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-black dark:text-white/60" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">Exportação Múltipla</h3>
              <p className="text-black dark:text-white/60">
                Exporte para CSS, SCSS, JS, JSON e Figma com um clique
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-black dark:text-white/60" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">Combinações Inteligentes</h3>
              <p className="text-black dark:text-white/60">
                Veja cores complementares, análogas e tríades automaticamente
              </p>
            </div>
          </div>
        </main>

        {/* Modals */}
        {selectedColor && (
          <ColorSplash
            color={selectedColor}
            onClose={() => setSelectedColor(null)}
          />
        )}

        {showExportModal && user && (
          <ExportModal
            colors={colors}
            paletteName={`Paleta EBODA ${new Date().toLocaleDateString('pt-BR')}`}
            onClose={() => setShowExportModal(false)}
          />
        )}

        {showFavoritesModal && user && (
          <FavoritesModal
            user={user}
            onClose={() => setShowFavoritesModal(false)}
          />
        )}
      </div>
    </>
  );
}