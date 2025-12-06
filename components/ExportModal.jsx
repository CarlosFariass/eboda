'use client';

import { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExportModal = ({ colors, paletteName, onClose }) => {
  const [format, setFormat] = useState('css');
  const [exportData, setExportData] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors, name: paletteName, format })
      });

      const data = await response.json();
      setExportData(data.exportData);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions = { css: 'css', scss: 'scss', js: 'js', json: 'json' };
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteName}.${extensions[format]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(6, 0, 16, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0015] rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Exportar Paleta</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-3 block">Formato</label>
            <div className="grid grid-cols-4 gap-3">
              {['css', 'scss', 'js', 'json'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-2 rounded-lg font-semibold uppercase transition-all ${
                    format === f
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/5 text-gray-600 dark:text-white/60 hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Gerando...' : 'Gerar Código'}
          </Button>

          {/* Export Preview */}
          {exportData && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-600 dark:text-white/60">Código Gerado</label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
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
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-green-400 font-mono">{exportData}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;