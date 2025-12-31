'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';

/**
 * ColorPageClient Component
 * 
 * Este é o componente Client-side que renderiza a página de cor com:
 * - Informações detalhadas (HEX, RGB, HSL)
 * - Harmonias de cores (Complementar, Triada, Análoga)
 * - Informações de acessibilidade (Contraste WCAG)
 */
export default function ColorPageClient({
  colorName,
  colorHex,
  colorDescription,
  colorUses = [],
}) {
  const [copied, setCopied] = useState(null);
  const [colorData, setColorData] = useState(null);

  // Converter HEX para RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Converter RGB para HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Gerar cores harmônicas
  const generateHarmonies = (hex) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Complementar (180 graus)
    const complementary = {
      h: (hsl.h + 180) % 360,
      s: hsl.s,
      l: hsl.l,
    };

    // Triada (120 graus)
    const triad1 = {
      h: (hsl.h + 120) % 360,
      s: hsl.s,
      l: hsl.l,
    };
    const triad2 = {
      h: (hsl.h + 240) % 360,
      s: hsl.s,
      l: hsl.l,
    };

    // Análoga (30 graus)
    const analogous1 = {
      h: (hsl.h + 30) % 360,
      s: hsl.s,
      l: hsl.l,
    };
    const analogous2 = {
      h: (hsl.h - 30 + 360) % 360,
      s: hsl.s,
      l: hsl.l,
    };

    return {
      primary: hsl,
      complementary,
      triad: [triad1, triad2],
      analogous: [analogous1, analogous2],
    };
  };

  // Converter HSL para HEX
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return (
      '#' +
      [f(0), f(8), f(4)]
        .map((x) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()
    );
  };

  // Calcular contraste WCAG
  const getContrastRatio = (hex1, hex2) => {
    const getLuminance = (hex) => {
      const rgb = hexToRgb(hex);
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  useEffect(() => {
    const rgb = hexToRgb(colorHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const harmonies = generateHarmonies(colorHex);
    const contrastWhite = getContrastRatio(colorHex, '#FFFFFF');
    const contrastBlack = getContrastRatio(colorHex, '#000000');

    setColorData({
      rgb,
      hsl,
      harmonies,
      contrastWhite,
      contrastBlack,
    });
  }, [colorHex]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!colorData) return <div className="text-gray-900 dark:text-white">Carregando...</div>;

  const ColorBox = ({ hex, label }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-lg shadow-lg border-2 border-gray-200 dark:border-white/20 mb-3 cursor-pointer hover:shadow-xl transition-shadow"
        style={{ backgroundColor: hex }}
        onClick={() => copyToClipboard(hex, label)}
        title={`Clique para copiar ${hex}`}
      />
      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{hex}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      {/* Título da Página */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{colorName}</h1>
        <p className="text-gray-600 dark:text-gray-400">{colorDescription}</p>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-122">
        {/* Seção Principal de Cor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Visualização da Cor */}
          <div className="lg:col-span-1">
            <div
              className="w-full h-64 rounded-lg shadow-2xl border-4 border-gray-200 dark:border-white/20 mb-6"
              style={{ backgroundColor: colorHex }}
            />
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Códigos de Cor</h3>
              <div className="space-y-3">
                {/* HEX */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">HEX</p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-white/10 rounded p-3">
                    <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{colorHex}</code>
                    <button
                      onClick={() => copyToClipboard(colorHex, 'hex')}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      {copied === 'hex' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* RGB */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">RGB</p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-white/10 rounded p-3">
                    <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                      rgb({colorData.rgb.r}, {colorData.rgb.g}, {colorData.rgb.b})
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`,
                          'rgb'
                        )
                      }
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      {copied === 'rgb' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* HSL */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">HSL</p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-white/10 rounded p-3">
                    <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                      hsl({colorData.hsl.h}, {colorData.hsl.s}%, {colorData.hsl.l}%)
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)`,
                          'hsl'
                        )
                      }
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      {copied === 'hsl' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Acessibilidade */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acessibilidade</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Contraste com Branco</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded bg-white border border-gray-200 dark:border-white/20 mr-3" />
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{colorData.contrastWhite}:1</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {colorData.contrastWhite >= 4.5 ? '✓ AA' : '✗ Falha'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Contraste com Preto</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded bg-black mr-3" />
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{colorData.contrastBlack}:1</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {colorData.contrastBlack >= 4.5 ? '✓ AA' : '✗ Falha'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Casos de Uso */}
            {colorUses.length > 0 && (
              <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Casos de Uso</h3>
                <ul className="space-y-2">
                  {colorUses.map((use, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 dark:text-amber-400 mr-3 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Harmonias de Cores */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Harmonias de Cores</h2>

          {/* Complementar */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Complementar</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A cor complementar cria o maior contraste e é ideal para destaque.
            </p>
            <div className="flex gap-4 flex-wrap">
              <ColorBox hex={colorHex} label="Primária" />
              <ColorBox
                hex={hslToHex(
                  colorData.harmonies.complementary.h,
                  colorData.harmonies.complementary.s,
                  colorData.harmonies.complementary.l
                )}
                label="Complementar"
              />
            </div>
          </div>

          {/* Triada */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Triada</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Três cores igualmente espaçadas no círculo cromático para harmonia vibrante.
            </p>
            <div className="flex gap-4 flex-wrap">
              <ColorBox hex={colorHex} label="Primária" />
              {colorData.harmonies.triad.map((color, index) => (
                <ColorBox
                  key={index}
                  hex={hslToHex(color.h, color.s, color.l)}
                  label={`Triada ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Análoga */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Análoga</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cores próximas no círculo cromático para uma harmonia suave e coesa.
            </p>
            <div className="flex gap-4 flex-wrap">
              {colorData.harmonies.analogous.map((color, index) => (
                <ColorBox
                  key={index}
                  hex={hslToHex(color.h, color.s, color.l)}
                  label={`Análoga ${index + 1}`}
                />
              ))}
              <ColorBox hex={colorHex} label="Primária" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-600/10 to-amber-600/10 dark:from-amber-600/20 dark:to-amber-600/20 border border-amber-300 dark:border-amber-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Gostou desta Cor?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use nossas ferramentas para criar paletas completas e harmônicas.
          </p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
          >
            Explorar Ferramentas
          </Link>
        </div>
      </div>
    </div>
  );
}
