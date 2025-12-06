'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ColorCard = ({ color, onClick }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRgbString = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setShowCode(true)}
      onMouseLeave={() => setShowCode(false)}
      onClick={onClick}
      style={{
        width: '180px',
        height: '180px',
        perspective: '1000px'
      }}
    >
      <div 
        className="w-full h-full rounded-xl shadow-2xl transition-transform duration-300 group-hover:rotate-y-6"
        style={{
          backgroundColor: color,
          transform: showCode ? 'rotateY(5deg) rotateX(5deg)' : 'none',
          boxShadow: `0 20px 60px ${color}40, 0 0 0 1px ${color}20`,
        }}
      >
        {showCode && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-xl backdrop-blur-sm p-4">
            <div className="text-white text-center space-y-2">
              <p className="font-mono text-lg font-bold">{color}</p>
              <p className="font-mono text-xs opacity-80">{getRgbString(color)}</p>
            </div>
            <button
              onClick={handleCopy}
              className="mt-3 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors flex items-center gap-1 text-white text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorCard;