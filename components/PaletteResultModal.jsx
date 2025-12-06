'use client';

import { useState } from 'react';
import { X, Download, Share2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaletteResultModal = ({ colors, companyName, message, onClose, onApplyPalette }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyColors = () => {
    const colorText = colors.join(', ');
    navigator.clipboard.writeText(colorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `# Paleta de Cores - ${companyName}\n\n${colors.map((c, i) => `Cor ${i + 1}: ${c}`).join('\n')}\n\nGerado por EBODA com IA`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paleta-${companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Paleta ${companyName}`,
          text: `Confira esta paleta de cores gerada com IA para ${companyName}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyColors();
      alert('Link copiado! Cole em qualquer lugar para compartilhar.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(6, 0, 16, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0015] rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-white/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                🎨 Paleta Gerada com Sucesso!
              </h2>
              <p className="text-white/60">
                Para <span className="text-purple-400 font-semibold">{companyName}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* AI Message */}
          {message && (
            <div className="mb-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
              <p className="text-white text-center italic">"{message}"</p>
            </div>
          )}

          {/* Color Palette Display */}
          <div className="mb-6">
            <div className="flex rounded-xl overflow-hidden shadow-2xl" style={{ height: '200px' }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 relative group cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <span className="text-white font-mono font-bold text-lg">{color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color List */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div
                  className="w-10 h-10 rounded-lg shadow-md"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="text-xs text-white/60">Cor {index + 1}</div>
                  <div className="font-mono text-sm text-white">{color}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => {
                onApplyPalette(colors);
                onClose();
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Check className="w-4 h-4 mr-2" />
              Aplicar esta Paleta
            </Button>

            <Button
              onClick={handleCopyColors}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Cores
                </>
              )}
            </Button>

            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Info */}
          <p className="text-center text-white/40 text-sm mt-6">
            Paleta gerada por IA com base nas características da sua marca
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaletteResultModal;
