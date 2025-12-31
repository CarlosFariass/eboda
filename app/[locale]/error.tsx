'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');
  
  useEffect(() => {
    // Log do erro para serviços de monitoramento (opcional)
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        
        {/* Ícone de Erro */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-red-100 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/30 flex items-center justify-center">
              <svg className="w-14 h-14 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            {/* Pulso animado */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
          </div>
        </div>

        {/* Mensagem */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          {t('title')}
        </h1>
        <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed">
          {t('description')}
        </p>

        {/* Código do erro (opcional) */}
        {error.digest && (
          <div className="mb-6 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg inline-block">
            <code className="text-sm text-gray-500 dark:text-white/40">
              {t('code')}: {error.digest}
            </code>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 hover:from-gray-800 hover:to-black dark:hover:from-amber-600 dark:hover:to-amber-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t('tryAgain')}
          </button>
          
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('backToHome')}
          </a>
        </div>

        {/* Decoração */}
        <div className="mt-12 flex justify-center gap-2">
          {['#FF6B6B', '#FFA07A', '#FFD93D', '#FF6B6B', '#FFA07A'].map((color, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full opacity-60"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
