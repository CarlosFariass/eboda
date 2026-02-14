'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, LogIn, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ user, onLogin, onLogout }) => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const isLightMode = mounted && theme === 'light';

  return (
    <header className="relative w-full bg-[#fafafa] dark:bg-[#060010]">
      {/* Line */}
      <div className="absolute w-full top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />
      
      {/* Logo Container */}
      <div className="relative z-10 flex justify-center py-8">
        <div 
          className="bg-[#fafafa] dark:bg-[#060010] border-2 border-gray-200 dark:border-white/10 rounded-2xl px-6 sm:px-8 py-4 backdrop-blur-sm w-11/12 sm:w-auto"
          style={{
            boxShadow: isLightMode 
              ? 'rgba(131, 41, 55, 0.3) 0px 0px 40px'
              : '0 0 40px rgba(147, 51, 234, 0.3)'
          }}
        >
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Logo - Absolute positioning para não afetar altura do header */}
            <Link href="/" className="relative flex-shrink-0">
              <Image
                src="/assets/logo-eboda.png"
                alt="EBODA Logo"
                width={220}
                height={80}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-20 sm:h-24 w-auto dark:invert dark:brightness-200 transition-all hover:opacity-80"
                priority
              />
              {/* Spacer para manter o espaço do logo no layout */}
              <div className="w-28 sm:w-36 h-8" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Ferramentas Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-bold">
                  {t('nav.tools')}
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-0 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {/* <Link
                    href="/tools"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('nav.allTools')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Veja todas as ferramentas</div>
                  </Link> */}
                  <div className="border-t border-gray-200 dark:border-slate-700/30 my-1" />
                  <Link
                    href="/tools#color-wheel"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('tools.colorWheel.name')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{t('tools.colorWheel.description')}</div>
                  </Link>
                  <Link
                    href="/tools#image-picker"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('tools.imageColorPicker.name')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{t('tools.imageColorPicker.description')}</div>
                  </Link>
                  <Link
                    href="/tools/contrast-checker"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('tools.contrastChecker.name')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{t('tools.contrastChecker.description')}</div>
                  </Link>
                  <Link
                    href="/tools/gradient-generator"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('tools.gradientGenerator.name')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{t('tools.gradientGenerator.description')}</div>
                  </Link>
                  <Link
                    href="/tools/remove-background"
                    className="block px-4 py-2 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="font-semibold">{t('tools.removeBackground.name')}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{t('tools.removeBackground.description')}</div>
                  </Link>
                  </div>
              </div>

              {/* Cores */}
              <Link
                href="/cores"
                className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-bold"
              >
                {t('nav.colors')}
              </Link>
              <Link href="/palettes" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-bold">
                {t('nav.palettes')}
              </Link>
              <Link href="/guia-cores" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-bold">
                {t('nav.colorGuide')}
              </Link>
              <Link href="/tools/fonts" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-bold">
                {t('nav.fonts')}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  title={t('header.toggleTheme')}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-white" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              )}

              {/* User Menu */}
              {user ? (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-700 dark:text-white" />
                    <span className="text-sm text-gray-700 dark:text-white truncate max-w-[100px] font-bold">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || t('auth.user')}
                    </span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    title={t('auth.logout')}
                  >
                    <LogOut className="w-5 h-5 text-gray-700 dark:text-white" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-500 hover:from-amber-600 hover:to-amber-600 transition-all"
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">{t('auth.login')}</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-white/10 space-y-2">
              {/* Ferramentas Mobile */}
              <div>
                <button
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <span>{t('mobile.tools')}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      toolsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {toolsDropdownOpen && (
                  <div className="ml-2 mt-1 space-y-1 border-l border-gray-200 dark:border-white/10 pl-3">
                    <Link
                      href="/tools"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('nav.allTools')}
                    </Link>
                    <Link
                      href="/tools#color-wheel"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('tools.colorWheel.name')}
                    </Link>
                    <Link
                      href="/tools#image-picker"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('tools.imageColorPicker.name')}
                    </Link>
                    <Link
                      href="/tools/contrast-checker"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('tools.contrastChecker.name')}
                    </Link>
                    <Link
                      href="/tools/gradient-generator"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('tools.gradientGenerator.name')}
                    </Link>
                    <Link
                      href="/tools/remove-background"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      {t('tools.removeBackground.name')}
                    </Link>
                  </div>
                )}
              </div>

              {/* Cores Mobile */}
              <Link
                href="/cores"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.colors')}
              </Link>
              <Link
                href="/palettes"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.palettes')}
              </Link>
              <Link
                href="/guia-cores"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.colorGuide')}
              </Link>
              
              {/* Sobre - Mobile Only (hidden in footer on mobile) */}
              <Link
                href="/sobre"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.about')}
              </Link>
              
              {/* Termos - Mobile Only (hidden in footer on mobile) */}
              <Link
                href="/termos-servico"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.terms')}
              </Link>
              
              {/* Contato - Mobile Only */}
              <Link
                href="/contato"
                onClick={handleNavClick}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('nav.contact')}
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-white/10 my-2" />

              {/* User Menu Mobile */}
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={handleNavClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-700 dark:text-white" />
                    <span className="text-sm text-gray-700 dark:text-white">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || t('auth.user')}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      handleNavClick();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">{t('auth.logout')}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    handleNavClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-500 hover:from-amber-600 hover:to-amber-600 transition-all"
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">{t('auth.login')}</span>
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
