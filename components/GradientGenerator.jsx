'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Check, RotateCw } from 'lucide-react';

export default function GradientGenerator() {
  const [colors, setColors] = useState([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
  ]);
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(null);

  const addColor = () => {
    if (colors.length >= 10) return;
    const lastPosition = colors[colors.length - 1]?.position || 0;
    const newPosition = Math.min(lastPosition + 20, 100);
    setColors([...colors, { color: '#ffffff', position: newPosition }]);
  };

  const removeColor = (index) => {
    if (colors.length <= 2) return;
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = field === 'position' ? parseInt(value) : value;
    setColors(newColors);
  };

  const randomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const numColors = Math.floor(Math.random() * 3) + 2;
    const newColors = [];
    for (let i = 0; i < numColors; i++) {
      newColors.push({
        color: randomColor(),
        position: Math.round((i / (numColors - 1)) * 100)
      });
    }
    setColors(newColors);
    setAngle(Math.floor(Math.random() * 360));
  };

  const sortedColors = [...colors].sort((a, b) => a.position - b.position);
  const colorStops = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');

  const getGradientCSS = () => {
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${colorStops})`;
      case 'radial':
        return `radial-gradient(circle, ${colorStops})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${colorStops})`;
      default:
        return `linear-gradient(${angle}deg, ${colorStops})`;
    }
  };

  const gradientCSS = getGradientCSS();

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportFormats = {
    css: `background: ${gradientCSS};`,
    tailwind: `bg-[${gradientCSS.replace(/\s/g, '_')}]`,
    cssVariable: `:root {\n  --gradient: ${gradientCSS};\n}\n\n.element {\n  background: var(--gradient);\n}`,
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            🌈 Gradient Generator
          </h2>
          <p className="text-gray-600 dark:text-white/60">
            Crie gradientes personalizados para seus projetos
          </p>
        </div>
        <button
          onClick={randomGradient}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white"
        >
          <RotateCw className="w-4 h-4" />
          Random
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Gradient Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/80">
              Tipo de Gradiente
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['linear', 'radial', 'conic'].map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all capitalize ${
                    gradientType === type
                      ? 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-500 dark:to-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Angle (for linear and conic) */}
          {(gradientType === 'linear' || gradientType === 'conic') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-white/80">
                  Ângulo
                </label>
                <span className="text-sm text-gray-500 dark:text-white/60 font-mono">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="grid grid-cols-4 gap-2">
                {[0, 45, 90, 180].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`py-2 px-3 rounded-lg text-sm transition-all ${
                      angle === a
                        ? 'bg-gray-200 dark:bg-white/20 text-gray-800 dark:text-white'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-white/80">
                Cores ({colors.length}/10)
              </label>
              <button
                onClick={addColor}
                disabled={colors.length >= 10}
                className="flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {colors.map((colorStop, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <input
                    type="color"
                    value={colorStop.color}
                    onChange={(e) => updateColor(index, 'color', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-white/20"
                  />
                  <input
                    type="text"
                    value={colorStop.color}
                    onChange={(e) => updateColor(index, 'color', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-mono text-sm uppercase"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={colorStop.position}
                      onChange={(e) => updateColor(index, 'position', e.target.value)}
                      className="w-16 px-2 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-mono text-sm text-center"
                    />
                    <span className="text-gray-500 dark:text-white/40 text-sm">%</span>
                  </div>
                  <button
                    onClick={() => removeColor(index)}
                    disabled={colors.length <= 2}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          {/* Main Preview */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-white/80">
              Preview
            </label>
            <div
              className="w-full h-48 rounded-xl border-2 border-gray-200 dark:border-white/20 shadow-lg"
              style={{ background: gradientCSS }}
            />
          </div>

          {/* Preview Variants */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-white/80">
              Exemplos de Uso
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Button */}
              <div className="text-center">
                <button
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: gradientCSS }}
                >
                  Botão
                </button>
                <p className="text-xs text-gray-500 dark:text-white/40 mt-2">Botão</p>
              </div>
              
              {/* Card */}
              <div className="text-center">
                <div
                  className="w-full h-20 rounded-lg shadow-lg"
                  style={{ background: gradientCSS }}
                />
                <p className="text-xs text-gray-500 dark:text-white/40 mt-2">Card</p>
              </div>
              
              {/* Circle */}
              <div className="text-center flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full shadow-lg"
                  style={{ background: gradientCSS }}
                />
                <p className="text-xs text-gray-500 dark:text-white/40 mt-2">Avatar</p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-white/80">
              Exportar
            </label>
            
            {/* CSS */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">CSS</span>
                <button
                  onClick={() => copyToClipboard(exportFormats.css, 'css')}
                  className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  {copied === 'css' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm text-gray-700 dark:text-green-400 font-mono break-all">
                {exportFormats.css}
              </code>
            </div>

            {/* Tailwind */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">Tailwind (Arbitrary)</span>
                <button
                  onClick={() => copyToClipboard(`style={{ background: '${gradientCSS}' }}`, 'tailwind')}
                  className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  {copied === 'tailwind' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm text-gray-700 dark:text-blue-400 font-mono break-all">
                {`style={{ background: '${gradientCSS}' }}`}
              </code>
            </div>

            {/* CSS Variable */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-white/60 uppercase">CSS Variable</span>
                <button
                  onClick={() => copyToClipboard(exportFormats.cssVariable, 'cssVar')}
                  className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  {copied === 'cssVar' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="text-sm text-gray-700 dark:text-purple-400 font-mono overflow-x-auto">
                {exportFormats.cssVariable}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}