'use client';

import { useState } from 'react';
import { Sparkles, Download, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LoadingScreen from '@/components/LoadingScreen';
import PaletteViewer from '@/components/PaletteViewer';
import ColorSplash from '@/components/ColorSplash';
import ExportModal from '@/components/ExportModal';
import FavoritesModal from '@/components/FavoritesModal';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

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
  const t = useTranslations('home'); 

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">        
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r 
                from-gray-700 via-gray-800 to-gray-900
                dark:from-white dark:via-amber-400 dark:to-amber-600">
                {t('title')}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />

              <p className="text-black dark:text-white/60 text-lg">
                {t('subtitle')}
              </p>
            </div>

            <PaletteViewer
              colors={colors}
              onColorClick={(color) => setSelectedColor(color)}
            />
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 - Insira uma imagem */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {t('insertImage')}
                </h3>
                <p className="text-gray-600 dark:text-white/60">
                  {t('insertImageDesc')}
                </p>
              </div>
            </div>

            {/* Card 2 - Exportação Múltipla */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t('multipleExport')}
                </h3>
                <p className="text-gray-600 dark:text-white/60">
                  {t('multipleExportDesc')}
                </p>
              </div>
            </div>

            {/* Card 3 - Combinações Inteligentes */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t('smartCombinations')}
                </h3>
                <p className="text-gray-600 dark:text-white/60">
                  {t('smartCombinationsDesc')}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Divider Wave */}
        <div className="w-full overflow-hidden mt-16 bg-gray-100 dark:bg-transparent">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1000 100" 
            className="w-full h-auto fill-gray-900 dark:fill-[#0a0015]"
            preserveAspectRatio="none"
          >
            <path d="M0 0v80l227.5 18c12.1 1 22.5-8.6 22.5-20.7s10.4-21.8 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8s10.4-21.7 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8S760.4 5 772.5 6L1000 24V0H0Z" />
          </svg>
        </div>

        {/* Ferramentas Section - Background diferente */}
        <section id="ferramentas" className="bg-gray-100 dark:bg-[#0a0015] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 mb-4">
                  🛠️ {t('availableTools')}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                  {t('availableTools')}
                </h2>
                <p className="text-gray-600 dark:text-white/60 text-lg max-w-2xl mx-auto">
                  {t('useToolsDesc')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/tools#color-wheel"
                  className="group relative p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Color Wheel
                    </h4>
                    <p className="text-gray-600 dark:text-white/60">
                      {t('colorWheelDesc')}
                    </p>
                  </div>
                </Link>

                <Link 
                  href="/tools#image-picker"
                  className="group relative p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Image Color Picker
                    </h4>
                    <p className="text-gray-600 dark:text-white/60">
                      {t('imagePickerDesc')}
                    </p>
                  </div>
                </Link>

                <Link 
                  href="/tools/contrast-checker"
                  className="group relative p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Contrast Checker
                    </h4>
                    <p className="text-gray-600 dark:text-white/60">
                      {t('contrastCheckerDesc')}
                    </p>
                  </div>
                </Link>

                <Link 
                  href="/tools/gradient-generator"
                  className="group relative p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🌈</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Gradient Generator
                    </h4>
                    <p className="text-gray-600 dark:text-white/60">
                      {t('gradientGeneratorDesc')}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

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