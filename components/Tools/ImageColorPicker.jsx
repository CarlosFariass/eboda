import { useState, useRef, useEffect } from 'react';
import { Upload, Copy, Check, Trash2 } from 'lucide-react';
import ExportMenu from '../ExportMenu';

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

export default function ImageColorPicker() {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  const extractColorsFromImage = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) { setIsLoading(false); return; }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const maxWidth = 800;
    const maxHeight = 600;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
    } else {
      if (height > maxHeight) { width = Math.round((width * maxHeight) / height); height = maxHeight; }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const colorMap = {};
      const step = 8;

      for (let i = 0; i < data.length; i += step * 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 128) continue;
        const hex = rgbToHex(r, g, b);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }

      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([hex]) => hex);

      setColors(sortedColors);
      setSelectedColor(sortedColors[0] || '#000000');
    } catch (error) {
      setColors([]);
      setSelectedColor('#000000');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageLoaded && canvasRef.current && imageRef.current) {
      extractColorsFromImage();
    }
  }, [imageLoaded]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setImageLoaded(false);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => { imageRef.current = img; setImageLoaded(true); };
      img.onerror = () => { setIsLoading(false); alert('Erro ao carregar a imagem.'); };
      img.src = event.target.result;
    };
    reader.onerror = () => { setIsLoading(false); alert('Erro ao ler o arquivo.'); };
    reader.readAsDataURL(file);
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    try {
      const imageData = ctx.getImageData(x, y, 1, 1);
      setSelectedColor(rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]));
    } catch (error) {}
  };

  const handleCanvasMouseLeave = () => setCursorPosition(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearImage = () => {
    imageRef.current = null;
    setImageLoaded(false);
    setColors([]);
    setSelectedColor(null);
    setCursorPosition(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  const selectedColorData = selectedColor ? {
    hex: selectedColor,
    rgb: hexToRgb(selectedColor),
    hsl: rgbToHsl(hexToRgb(selectedColor).r, hexToRgb(selectedColor).g, hexToRgb(selectedColor).b),
  } : null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        🖼️ Insira uma imagem
      </h2>

      {!imageLoaded ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-white font-semibold mb-2">
            {isLoading ? 'Carregando imagem...' : 'Clique para fazer upload de uma imagem'}
          </p>
          {!isLoading && <p className="text-gray-500 dark:text-gray-400 text-sm">ou arraste uma imagem aqui</p>}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Canvas Preview */}
          <div className="relative bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <canvas
              ref={canvasRef}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              className="w-full rounded-lg cursor-crosshair bg-white dark:bg-gray-900"
              style={{ maxHeight: '500px', display: 'block', margin: '0 auto' }}
            />
            {cursorPosition && (
              <div className="absolute pointer-events-none" style={{ left: `${cursorPosition.x + 16}px`, top: `${cursorPosition.y + 16}px` }}>
                <div className="w-10 h-10 border-4 border-white rounded-full shadow-lg" style={{ backgroundColor: selectedColor }} />
              </div>
            )}
          </div>

          {/* Color Info */}
          {selectedColorData && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Preview */}
              <div className="space-y-4">
                <div className="w-full h-40 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-lg" style={{ backgroundColor: selectedColorData.hex }} />
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase tracking-wide">HEX</p>
                    <p className="text-gray-800 dark:text-white font-mono font-bold text-lg">{selectedColorData.hex}</p>
                  </div>
                  <button onClick={() => copyToClipboard(selectedColorData.hex)} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center">
                    {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* RGB and HSL */}
              <div className="space-y-4">
                <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 uppercase tracking-wide font-medium">RGB</p>
                  <div className="space-y-3 mb-4">
                    {['r', 'g', 'b'].map((key) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400 font-semibold">{key.toUpperCase()}:</span>
                        <span className="text-gray-800 dark:text-white font-mono text-lg">{selectedColorData.rgb[key]}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => copyToClipboard(`rgb(${selectedColorData.rgb.r}, ${selectedColorData.rgb.g}, ${selectedColorData.rgb.b})`)} className="w-full py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-sm font-semibold transition-all">
                    Copiar RGB
                  </button>
                </div>

                <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 uppercase tracking-wide font-medium">HSL</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-semibold">H:</span>
                      <span className="text-gray-800 dark:text-white font-mono text-lg">{Math.round(selectedColorData.hsl.h)}°</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-semibold">S:</span>
                      <span className="text-gray-800 dark:text-white font-mono text-lg">{Math.round(selectedColorData.hsl.s)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-semibold">L:</span>
                      <span className="text-gray-800 dark:text-white font-mono text-lg">{Math.round(selectedColorData.hsl.l)}%</span>
                    </div>
                  </div>
                  <button onClick={() => copyToClipboard(`hsl(${Math.round(selectedColorData.hsl.h)}, ${Math.round(selectedColorData.hsl.s)}%, ${Math.round(selectedColorData.hsl.l)}%)`)} className="w-full py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-sm font-semibold transition-all">
                    Copiar HSL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Extracted Colors */}
          {colors.length > 0 && (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-white font-semibold uppercase tracking-wide text-sm">Paleta extraída:</p>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedColor === color
                        ? 'border-gray-800 dark:border-white ring-2 ring-gray-400 dark:ring-gray-500 scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 hover:from-gray-800 hover:to-black dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold transition-all flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Trocar Imagem
            </button>
            <button onClick={clearImage} className="flex-1 py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition-all flex items-center justify-center gap-2">
              <Trash2 className="w-5 h-5" />
              Limpar
            </button>
            <ExportMenu color={selectedColor} />
            <ExportMenu colors={colors} />
          </div>
        </div>
      )}
    </div>
  );
}