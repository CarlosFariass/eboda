'use client';

import { useState, useRef } from 'react';
import { Upload, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIGenerator = ({ onGenerate, onClose }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Convert to base64
    const base64Reader = new FileReader();
    base64Reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1];
      setImage(base64);
    };
    base64Reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image })
      });

      const data = await response.json();
      
      if (data.colors) {
        onGenerate(data.colors);
        onClose();
      } else {
        alert('Erro ao gerar paleta: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao gerar paleta');
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Gerar Paleta com IA</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-white/60 text-sm">
            Faça upload de uma imagem de marca e nossa IA extrairá uma paleta de cores perfeita.
          </p>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl p-12 cursor-pointer hover:border-amber-500 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-64 rounded-lg shadow-lg"
                />
                <p className="text-white/60 text-sm">Clique para escolher outra imagem</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Upload className="w-16 h-16 text-white/40" />
                <div className="text-center">
                  <p className="text-white font-semibold mb-1">Clique para fazer upload</p>
                  <p className="text-white/60 text-sm">JPEG, PNG ou WEBP</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;