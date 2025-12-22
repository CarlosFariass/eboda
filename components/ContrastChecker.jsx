'use client';

import { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Copy, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Função para calcular luminância relativa
const getLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Função para calcular ratio de contraste
const getContrastRatio = (color1, color2) => {
  const l1 = getLuminance(color1.r, color1.g, color1.b);
  const l2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// Converter HEX para RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// Converter RGB para HEX
const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Gerar sugestões de cores que passam no WCAG
const generateSuggestions = (bgColor, targetRatio) => {
  const suggestions = [];
  const bgRgb = hexToRgb(bgColor);
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  // Tentar variações de preto/branco e cinzas
  const testColors = [];
  for (let i = 0; i <= 255; i += 15) {
    testColors.push({ r: i, g: i, b: i });
  }
  
  // Adicionar algumas cores vibrantes
  const vibrantColors = [
    { r: 0, g: 0, b: 139 },      // Dark blue
    { r: 139, g: 0, b: 0 },      // Dark red
    { r: 0, g: 100, b: 0 },      // Dark green
    { r: 75, g: 0, b: 130 },     // Indigo
    { r: 255, g: 140, b: 0 },    // Dark orange
    { r: 0, g: 139, b: 139 },    // Dark cyan
  ];
  
  testColors.push(...vibrantColors);
  
  for (const color of testColors) {
    const ratio = getContrastRatio(bgRgb, color);
    if (ratio >= targetRatio) {
      suggestions.push({
        hex: rgbToHex(color.r, color.g, color.b),
        ratio: ratio.toFixed(2)
      });
    }
  }
  
  // Ordenar por ratio e retornar os melhores
  return suggestions
    .sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio))
    .slice(0, 6);
};

export default function ContrastChecker() {
  const t = useTranslations('contrastChecker');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [contrastRatio, setContrastRatio] = useState(21);
  const [copied, setCopied] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);
    const ratio = getContrastRatio(textRgb, bgRgb);
    setContrastRatio(ratio);
    
    // Gerar sugestões se não passar AAA
    if (ratio < 7) {
      setSuggestions(generateSuggestions(bgColor, 7));
    } else {
      setSuggestions([]);
    }
  }, [textColor, bgColor]);

  const swapColors = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // WCAG Levels
  const wcagResults = {
    aaNormal: contrastRatio >= 4.5,
    aaLarge: contrastRatio >= 3,
    aaaNormal: contrastRatio >= 7,
    aaaLarge: contrastRatio >= 4.5,
  };

  const getScoreColor = () => {
    if (contrastRatio >= 7) return 'text-green-500';
    if (contrastRatio >= 4.5) return 'text-yellow-500';
    if (contrastRatio >= 3) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = () => {
    if (contrastRatio >= 7) return 'bg-green-500/10 border-green-500/30';
    if (contrastRatio >= 4.5) return 'bg-yellow-500/10 border-yellow-500/30';
    if (contrastRatio >= 3) return 'bg-orange-500/10 border-orange-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {t('title')}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 dark:text-white/60 mb-4 sm:mb-6">
        {t('description')}
      </p>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Color Inputs */}
        <div className="space-y-4 sm:space-y-6">
          {/* Text Color */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/80">
              {t('textColor')}
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex justify-center sm:justify-start">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-white/20"
                />
              </div>
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-mono text-sm sm:text-base uppercase"
                  placeholder="#000000"
                />
                <button
                  onClick={() => copyToClipboard(textColor, 'text')}
                  className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  {copied === 'text' ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-white/60" />}
                </button>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapColors}
              className="p-3 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all hover:rotate-180 duration-300"
              title={t('swapColors')}
            >
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-white/60" />
            </button>
          </div>

          {/* Background Color */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/80">
              {t('backgroundColor')}
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex justify-center sm:justify-start">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-white/20"
                />
              </div>
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-mono text-sm sm:text-base uppercase"
                  placeholder="#FFFFFF"
                />
                <button
                  onClick={() => copyToClipboard(bgColor, 'bg')}
                  className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  {copied === 'bg' ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-white/60" />}
                </button>
              </div>
            </div>
          </div>

          {/* Contrast Score */}
          <div className={`p-4 sm:p-6 rounded-xl border-2 ${getScoreBg()} text-center`}>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 mb-2">{t('contrastRatio')}</p>
            <p className={`text-3xl sm:text-5xl font-black ${getScoreColor()}`}>
              {contrastRatio.toFixed(2)}:1
            </p>
          </div>
        </div>

        {/* Preview and Results */}
        <div className="space-y-4 sm:space-y-6">
          {/* Live Preview */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/80">
              {t('preview')}
            </label>
            <div
              className="p-4 sm:p-6 rounded-xl border-2 border-gray-200 dark:border-white/20 transition-all"
              style={{ backgroundColor: bgColor }}
            >
              <p className="text-xl sm:text-3xl font-bold mb-2" style={{ color: textColor }}>
                {t('largeTitle')}
              </p>
              <p className="text-base sm:text-lg mb-2" style={{ color: textColor }}>
                {t('normalText')}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: textColor }}>
                {t('smallText')}
              </p>
            </div>
          </div>

          {/* WCAG Results */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/80">
              {t('wcagResults')}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* AA Normal */}
              <div className={`p-3 sm:p-4 rounded-lg border ${wcagResults.aaNormal ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {wcagResults.aaNormal ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                  <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">AA</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-white/60">{t('normalTextLabel')}</p>
                <p className="text-xs text-gray-500 dark:text-white/40">≥ 4.5:1</p>
              </div>

              {/* AA Large */}
              <div className={`p-3 sm:p-4 rounded-lg border ${wcagResults.aaLarge ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {wcagResults.aaLarge ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                  <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">AA</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-white/60">{t('largeTextLabel')}</p>
                <p className="text-xs text-gray-500 dark:text-white/40">≥ 3:1</p>
              </div>

              {/* AAA Normal */}
              <div className={`p-3 sm:p-4 rounded-lg border ${wcagResults.aaaNormal ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {wcagResults.aaaNormal ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                  <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">AAA</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-white/60">{t('normalTextLabel')}</p>
                <p className="text-xs text-gray-500 dark:text-white/40">≥ 7:1</p>
              </div>

              {/* AAA Large */}
              <div className={`p-3 sm:p-4 rounded-lg border ${wcagResults.aaaLarge ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {wcagResults.aaaLarge ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                  <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">AAA</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-white/60">{t('largeTextLabel')}</p>
                <p className="text-xs text-gray-500 dark:text-white/40">≥ 4.5:1</p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <label className="text-sm font-medium text-gray-700 dark:text-white/80">
                  {t('suggestionsAAA')}
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setTextColor(suggestion.hex)}
                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group"
                  >
                    <div
                      className="w-full h-8 rounded mb-2 border border-gray-200 dark:border-white/10"
                      style={{ backgroundColor: suggestion.hex }}
                    />
                    <p className="text-xs font-mono text-gray-600 dark:text-white/60 group-hover:text-gray-800 dark:group-hover:text-white">
                      {suggestion.hex}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-white/40">
                      {suggestion.ratio}:1
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}