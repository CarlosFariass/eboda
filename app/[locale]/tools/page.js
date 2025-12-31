'use client';

import { useState } from 'react';
import ColorWheel from '@/components/Tools/ColorWheel';
import ImageColorPicker from '@/components/Tools/ImageColorPicker';
import { onAuthStateChange, signOut } from '@/lib/auth';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ToolsPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('wheel');
  const t = useTranslations('toolsPage');

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    // Implementar modal de login
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      <main className="container mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r  from-gray-700 via-gray-800 to-gray-900 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600">
            {t('title')}
          </h1>
          <p className="text-black dark:text-white/60 text-lg mt-4">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'wheel'
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-transparent'
            }`}
          >
            🎨 {t('colorWheelTab')}
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-transparent'
            }`}
          >
            🖼️ {t('imageTab')}
          </button>
        </div>

        {/* Content */}
        <div className="mb-24">
          {activeTab === 'wheel' && <ColorWheel />}
          {activeTab === 'image' && <ImageColorPicker />}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Card 1 - Color Wheel */}
          <div className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {t('colorWheelTitle')}
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                {t('colorWheelDesc')}
              </p>
            </div>
          </div>

          {/* Card 2 - Image Picker */}
          <div className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <span className="text-2xl">🖼️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t('imagePickerTitle')}
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                {t('imagePickerDesc')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}