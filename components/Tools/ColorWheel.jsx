'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb } from '@/lib/colors';
import ExportMenu from '../ExportMenu';


export default function ColorWheel() {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  // Draw the color wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 90) * (Math.PI / 180);
      const endAngle = (angle + 1 - 90) * (Math.PI / 180);

      const gradient = ctx.createLinearGradient(
        centerX + radius * Math.cos(startAngle),
        centerY + radius * Math.sin(startAngle),
        centerX,
        centerY
      );

      gradient.addColorStop(0, `hsl(${angle}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${angle}, 100%, 100%)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
    }

    // Draw white circle in center
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Draw selector circle
    const rgb = hexToRgb(selectedColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const angle = (hsl.h - 90) * (Math.PI / 180);
    const distance = (radius * hsl.s) / 100;

    const selectorX = centerX + distance * Math.cos(angle);
    const selectorY = centerY + distance * Math.sin(angle);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(selectorX, selectorY, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(selectorX, selectorY, 8, 0, Math.PI * 2);
    ctx.stroke();
  }, [selectedColor]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.min(centerX, centerY) - 10;

    if (distance > radius) return;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const saturation = Math.min(100, (distance / radius) * 100);
    const rgb = hslToRgb(angle, saturation, 50);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    setSelectedColor(hex);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleCanvasClick(e);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🎨 Color Wheel</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Canvas */}
        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            className="cursor-crosshair rounded-lg border-2 border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-colors shadow-md"
          />
          <p className="text-gray-600 dark:text-white/60 text-sm text-center">
            Clique ou arraste para selecionar uma cor
          </p>
        </div>

        {/* Color Info */}
        <div className="flex flex-col gap-4">
          {/* Color Preview */}
          <div className="flex flex-col gap-3">
            <div
              className="w-full h-32 rounded-lg border-2 border-gray-200 dark:border-white/20 shadow-lg transition-all"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-white/60 text-xs mb-1">HEX</p>
                <p className="text-gray-800 dark:text-white font-mono font-bold">{selectedColor}</p>
              </div>
              <ExportMenu color={selectedColor} />
              <button
                onClick={() => copyToClipboard(selectedColor)}
                className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500 dark:text-white/60" />
                )}
              </button>
            </div>
          </div>

          {/* RGB Values */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-white/60 text-sm mb-3 font-medium">RGB</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">R:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{rgb.r}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">G:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{rgb.g}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">B:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{rgb.b}</span>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="w-full mt-3 py-2 px-4 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-white text-sm font-medium transition-colors"
            >
              Copiar RGB
            </button>
          </div>

          {/* HSL Values */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-white/60 text-sm mb-3 font-medium">HSL</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">H:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{Math.round(hsl.h)}°</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">S:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{Math.round(hsl.s)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-white/60">L:</span>
                <span className="text-gray-800 dark:text-white font-mono font-semibold">{Math.round(hsl.l)}%</span>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)}
              className="w-full mt-3 py-2 px-4 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-white text-sm font-medium transition-colors"
            >
              Copiar HSL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}