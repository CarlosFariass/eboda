'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Trash2, ImageIcon, Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import GoogleAd from '@/components/GoogleAd';

export default function RemoveBackground() {
  const t = useTranslations('removeBackground');
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const processImage = async (file) => {
    if (!file) return;

    // Validar tipo de arquivo
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError(t('invalidFormat'));
      return;
    }

    // Validar tamanho (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(t('fileTooLarge'));
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProgress(10);

    // Criar preview da imagem original
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };
    reader.readAsDataURL(file);

    try {
      setProgress(20);

      // Importar dinamicamente a biblioteca de remoção de background
      const { removeBackground } = await import('@imgly/background-removal');
      
      setProgress(40);

      // Processar a imagem
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          const progressPercent = Math.round((current / total) * 50) + 40;
          setProgress(Math.min(progressPercent, 90));
        },
      });

      setProgress(95);

      // Converter blob para URL
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setProgress(100);

    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      setError(t('processingError'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'image-no-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {t('badge')}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Upload Area */}
      {!originalImage && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-gray-300 dark:border-white/20 hover:border-purple-400 dark:hover:border-purple-500/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('dropImage')}
              </p>
              <p className="text-gray-500 dark:text-white/50">
                {t('orClick')}
              </p>
            </div>
            <p className="text-sm text-gray-400 dark:text-white/40">
              {t('supportedFormats')}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-500/10 rounded-full mb-4">
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {t('processing')}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-white/50 mt-2">
              {progress}%
            </p>
          </div>
        </div>
      )}

      {/* Image Comparison */}
      {originalImage && !isProcessing && (
        <div className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Original Image */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('original')}
                </h3>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Processed Image */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('result')}
                </h3>
              </div>
              <div 
                className="relative aspect-square rounded-xl overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                {processedImage ? (
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">{t('processingWait')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {processedImage && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
              >
                <Download className="w-5 h-5" />
                {t('download')}
              </button>
            )}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              {t('newImage')}
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('feature1Title')}
          </h3>
          <p className="text-gray-600 dark:text-white/60">
            {t('feature1Desc')}
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-pink-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('feature2Title')}
          </h3>
          <p className="text-gray-600 dark:text-white/60">
            {t('feature2Desc')}
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('feature3Title')}
          </h3>
          <p className="text-gray-600 dark:text-white/60">
            {t('feature3Desc')}
          </p>
        </div>
      </div>

      {/* Google Ad */}
      <div className="mt-12">
        <GoogleAd adSlot="5443365802" />
      </div>
    </div>
  );
}
