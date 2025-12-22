'use client';

import { Github, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-4 border-t border-gray-200 dark:border-white/10 bg-[#fafafa] dark:bg-[#060010]">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center">
          
          {/* Left - Logo (Absolute) */}
          <Link href="/" className="absolute left-0 flex-shrink-0">
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-400 dark:to-pink-600">
              E
            </span>
          </Link>

          {/* Center - Navigation (Truly Centered) */}
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/cores"
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.colors')}
            </Link>
            <Link
              href="/palettes"
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.palettes')}
            </Link>
            <Link
              href="/tools"
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.tools')}
            </Link>
            <Link
              href="/sobre"
              className="hidden sm:inline text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/termos-servico"
              className="hidden sm:inline text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.terms')}
            </Link>
          </nav>

          {/* Right - Copyright, GitHub & Scroll to Top (Absolute) */}
          <div className="absolute right-0 flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Copyright - Hidden on mobile */}
            <span className="hidden lg:block text-gray-400 dark:text-white/40 text-xs">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </span>

            {/* GitHub */}
            <a
              href="https://github.com/CarlosFariass"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-all"
              title={t('header.backToTop')}
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;