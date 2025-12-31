'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-300 dark:from-amber-900/50 dark:to-amber-900/50 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-400 dark:to-amber-500 animate-pulse">
              404
            </span>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          {t('title')}
        </h2>
        <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 dark:from-amber-500 dark:to-amber-500 hover:from-gray-800 hover:to-black dark:hover:from-amber-600 dark:hover:to-amber-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('backToHome')}
          </Link>
          
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            {t('exploreTools')}
          </Link>
        </div>

        {/* Decoração */}
        <div className="mt-12 flex justify-center gap-2">
          {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ 
                backgroundColor: color,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
