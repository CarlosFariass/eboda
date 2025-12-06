'use client';

import { useState } from 'react';
import ColorWheel from '@/components/Tools/ColorWheel';
import ImageColorPicker from '@/components/Tools/ImageColorPicker';
import { onAuthStateChange, signOut } from '@/lib/auth';
import { useEffect } from 'react';

export default function ToolsPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('wheel');

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
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r  from-gray-700 via-gray-800 to-gray-900 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600">
            Ferramentas de Cores
          </h1>
          <p className="text-gray-600 dark:text-white/60 text-lg">
            Explore cores com a roda de cores interativa ou extraia cores de suas imagens
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'wheel'
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-transparent'
            }`}
          >
            🎨 Color Wheel
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-transparent'
            }`}
          >
            🖼️ Insira uma imagem
          </button>
        </div>

        {/* Content */}
        <div className="mb-24">
          {activeTab === 'wheel' && <ColorWheel />}
          {activeTab === 'image' && <ImageColorPicker />}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
            <h3 className="text-xl font-bold text-gray-600 dark:text-white mb-3">🎨 Color Wheel</h3>
            <p className="text-gray-600 dark:text-gray-600 dark:text-white/60 text-sm">
              Explore o espectro completo de cores com nossa roda de cores interativa. Selecione cores
              perfeitas e obtenha os valores em HEX, RGB e HSL instantaneamente.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-600 dark:border-white/10">
            <h3 className="text-xl font-bold text-xl font-bold text-gray-600 dark:text-white/60 mb-3">🖼️ Insira uma imagem</h3>
            <p className="text-gray-600 dark:text-white/60 text-sm">
              Faça upload de uma imagem e extraia automaticamente as cores dominantes. Passe o mouse
              sobre a imagem para obter as cores RGB exatas de qualquer pixel.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}