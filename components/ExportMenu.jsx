'use client';

import { useState } from 'react';
import { Download, Copy, Check, ChevronDown } from 'lucide-react';

export default function ExportMenu({ color, colors = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  // Se for uma cor única
  const singleColor = color || (colors.length === 1 ? colors[0] : null);
  
  // Se for múltiplas cores (paleta)
  const isMultiple = colors.length > 1;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Formatos de exportação para cor única
  const singleFormats = singleColor ? {
    hex: singleColor,
    css: `color: ${singleColor};`,
    cssBg: `background-color: ${singleColor};`,
    tailwindText: `text-[${singleColor}]`,
    tailwindBg: `bg-[${singleColor}]`,
    rgb: (() => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(singleColor);
      if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `rgb(${r}, ${g}, ${b})`;
      }
      return '';
    })(),
    figma: singleColor.replace('#', '').toUpperCase(),
  } : {};

  // Formatos de exportação para múltiplas cores
  const multipleFormats = isMultiple ? {
    cssVariables: `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`,
    tailwindConfig: `colors: {\n${colors.map((c, i) => `  'custom-${i + 1}': '${c}',`).join('\n')}\n}`,
    json: JSON.stringify(colors, null, 2),
    array: `[${colors.map(c => `'${c}'`).join(', ')}]`,
  } : {};

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        Exportar
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-72 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-xl z-50 space-y-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">
              {isMultiple ? 'Exportar Paleta' : 'Exportar Cor'}
            </p>

            {/* Single Color Formats */}
            {singleColor && !isMultiple && (
              <div className="space-y-2">
                {Object.entries(singleFormats).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => copyToClipboard(value, key)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group"
                  >
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">{key}</p>
                      <p className="text-sm text-gray-700 dark:text-white font-mono truncate max-w-[180px]">{value}</p>
                    </div>
                    {copied === key ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Multiple Colors Formats */}
            {isMultiple && (
              <div className="space-y-2">
                {Object.entries(multipleFormats).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => copyToClipboard(value, key)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group"
                  >
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">
                        {key === 'cssVariables' ? 'CSS Variables' : 
                         key === 'tailwindConfig' ? 'Tailwind Config' :
                         key === 'json' ? 'JSON' : 'Array'}
                      </p>
                    </div>
                    {copied === key ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}