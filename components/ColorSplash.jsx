'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { generateColorPalette } from '@/lib/colors';

const ColorSplash = ({ color, onClose, position }) => {
  const t = useTranslations('colorSplash');
  const [palette, setPalette] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPalette(generateColorPalette(color));
    setTimeout(() => setIsVisible(true), 10);
  }, [color]);

  if (!palette) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-start justify-end p-8 transition-all duration-500 overflow-y-auto ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'rgba(6, 0, 16, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div 
        className={`bg-[#0a0015] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10 transition-all duration-500 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 50px ${color}40`
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">{t('title')}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Base Color */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3">{t('baseColor')}</h4>
            <div className="flex items-center gap-3">
              <div 
                className="w-16 h-16 rounded-lg shadow-lg"
                style={{ backgroundColor: palette.base }}
              />
              <span className="font-mono text-white">{palette.base}</span>
            </div>
          </div>

          {/* Complementary */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3">{t('complementary')}</h4>
            <div className="flex items-center gap-3">
              <div 
                className="w-16 h-16 rounded-lg shadow-lg"
                style={{ backgroundColor: palette.complementary }}
              />
              <span className="font-mono text-white">{palette.complementary}</span>
            </div>
          </div>

          {/* Analogous */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3">{t('analogous')}</h4>
            <div className="flex gap-2">
              {palette.analogous.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-lg"
                    style={{ backgroundColor: c }}
                  />
                  <span className="font-mono text-xs text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Triadic */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3">{t('triadic')}</h4>
            <div className="flex gap-2">
              {palette.triadic.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-lg"
                    style={{ backgroundColor: c }}
                  />
                  <span className="font-mono text-xs text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shades */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3">{t('shades')}</h4>
            <div className="flex gap-2">
              {palette.shades.map((c, i) => (
                <div 
                  key={i}
                  className="flex-1 h-12 rounded-lg shadow-lg"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSplash;