'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PaletteViewer = ({ colors, onColorClick }) => {
  const t = useTranslations('palette');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (e, color, index) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getRgbString = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            style={{
              height: '180px',
              perspective: '1000px'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onColorClick(color)}
          >
            {/* Color Card */}
            <div 
              className="w-full h-full rounded-xl shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: color,
                transform: hoveredIndex === index 
                  ? 'scale(1.05) rotateY(5deg) rotateX(5deg)' 
                  : 'scale(1)',
                boxShadow: hoveredIndex === index
                  ? `0 25px 70px ${color}60, 0 0 0 2px ${color}`
                  : `0 20px 60px ${color}40, 0 0 0 1px ${color}20`,
                filter: hoveredIndex !== null && hoveredIndex !== index 
                  ? 'brightness(0.7) blur(2px)' 
                  : 'brightness(1) blur(0px)',
                zIndex: hoveredIndex === index ? 10 : 1
              }}
            >
              {/* Hover Info Overlay */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 rounded-xl backdrop-blur-sm p-4 animate-in fade-in duration-200">
                  <div className="text-white text-center space-y-3">
                    <div className="space-y-1">
                      <p className="font-mono text-2xl font-bold">{color}</p>
                      <p className="font-mono text-sm opacity-80">{getRgbString(color)}</p>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, color, index)}
                      className="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-white text-sm font-semibold mx-auto"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4" />
                          {t('copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          {t('copyCode')}
                        </>
                      )}
                    </button>
                    <p className="text-xs text-white/50 mt-2">{t('clickToCombinations')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteViewer;