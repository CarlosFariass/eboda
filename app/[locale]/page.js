'use client';

import { useState } from 'react';
import { Sparkles, Download, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LoadingScreen from '@/components/LoadingScreen';
import PaletteViewer from '@/components/PaletteViewer';
import ColorSplash from '@/components/ColorSplash';
import ExportModal from '@/components/ExportModal';
import FavoritesModal from '@/components/FavoritesModal';
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
                dark:from-purple-400 dark:via-pink-500 dark:to-purple-600">
                {t('title')}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />

              <p className="text-black dark:text-white/60 text-lg">
                {t('subtitle')}
              </p>
            </div>

            <PaletteViewer
              colors={colors}
              onColorClick={(color) => setSelectedColor(color)}
            />
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">{t('insertImage')}</h3>
              <p className="text-black dark:text-white/60">
                {t('insertImageDesc')}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-black dark:text-white/60" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">{t('multipleExport')}</h3>
              <p className="text-black dark:text-white/60">
                {t('multipleExportDesc')}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-black dark:text-white/60" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white/60 mb-2">{t('smartCombinations')}</h3>
              <p className="text-black dark:text-white/60">
                {t('smartCombinationsDesc')}
              </p>
            </div>
          </div>
          <section id="ferramentas" className=" mt-24 max-w-5xl mx-auto">
            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              {t('availableTools')}
            </h2>
            <div className="space-y-4">
              <p className="text-black dark:text-white/60 text-lg mt-4 text-center">
                {t('useToolsDesc')}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <Link 
                  href="/tools#color-wheel"
                  className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black-500 dark:hover:border-black-500 transition-all"
                >
                  <div className="text-3xl mb-3">🎨</div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black-600 dark:group-hover:text-black-400 transition-colors">
                    Color Wheel
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                    {t('colorWheelDesc')}
                  </p>
                </Link>

                <Link 
                  href="/tools#image-picker"
                  className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black-500 dark:hover:border-black-500 transition-all"
                >
                  <div className="text-3xl mb-3">🖼️</div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black-600 dark:group-hover:text-black-400 transition-colors">
                    Image Color Picker
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                    {t('imagePickerDesc')}
                  </p>
                </Link>

                <Link 
                  href="/tools/contrast-checker"
                  className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black-500 dark:hover:border-black-500 transition-all"
                >
                  <div className="text-3xl mb-3">🔍</div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black-600 dark:group-hover:text-black-400 transition-colors">
                    Contrast Checker
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                    {t('contrastCheckerDesc')}
                  </p>
                </Link>

                <Link 
                  href="/tools/gradient-generator"
                  className="group p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-black-500 dark:hover:border-black-500 transition-all"
                >
                  <div className="text-3xl mb-3">🌈</div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-black-600 dark:group-hover:text-black-400 transition-colors">
                    Gradient Generator
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                    {t('gradientGeneratorDesc')}
                  </p>
                </Link>
              </div>
            </div>
          </section>
          <section className="mt-24 max-w-5xl mx-auto text-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('readyToCreate')}
          </h3>
          <p className="text-gray-600 dark:text-white/60 mb-6 max-w-lg mx-auto">
            {t('readyToCreateDesc')}
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 hover:from-gray-800 hover:to-black dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all"
          >
            {t('exploreTools')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>
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