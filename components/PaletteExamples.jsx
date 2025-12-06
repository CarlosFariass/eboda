'use client';

import { Smartphone, Monitor, FileText, Package } from 'lucide-react';

const PaletteExamples = ({ colors, selectedColor }) => {
  if (!colors || colors.length < 5) return null;

  // Use selected color as primary if available, otherwise use first color
  const primary = selectedColor || colors[0];
  const [, secondary, accent, light, dark, ...rest] = colors;

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Exemplos de Uso da Paleta
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Website Example */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Website</h3>
          </div>
          <div 
            className="rounded-lg overflow-hidden shadow-xl"
            style={{ backgroundColor: light || colors[3] }}
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: primary }}
            >
              <div className="font-bold text-white text-sm">LOGO</div>
              <div className="flex gap-3">
                <div className="w-12 h-2 bg-white/30 rounded"></div>
                <div className="w-12 h-2 bg-white/30 rounded"></div>
                <div className="w-12 h-2 bg-white/30 rounded"></div>
              </div>
            </div>

            {/* Hero */}
            <div className="p-6 text-center">
              <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <button
                className="px-6 py-2 rounded-lg text-white font-semibold text-xs"
                style={{ backgroundColor: accent || secondary }}
              >
                Call to Action
              </button>
            </div>

            {/* Content */}
            <div className="p-4 grid grid-cols-3 gap-2">
              {[primary, secondary, accent || colors[2]].map((color, i) => (
                <div key={i} className="rounded p-3" style={{ backgroundColor: color }}>
                  <div className="h-2 bg-white/30 rounded mb-1"></div>
                  <div className="h-1 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile App Example */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">App Mobile</h3>
          </div>
          <div className="mx-auto" style={{ maxWidth: '200px' }}>
            <div 
              className="rounded-3xl overflow-hidden shadow-xl border-4 border-gray-800"
              style={{ backgroundColor: light || colors[3] }}
            >
              {/* Status Bar */}
              <div className="bg-black/20 px-4 py-2 flex justify-between text-xs text-gray-600">
                <span>9:41</span>
                <span>100%</span>
              </div>

              {/* App Header */}
              <div 
                className="p-4"
                style={{ backgroundColor: primary }}
              >
                <div className="h-2 bg-white/30 rounded w-20 mb-2"></div>
                <div className="h-4 bg-white rounded w-full"></div>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-2">
                {[secondary, accent || colors[2], primary].map((color, i) => (
                  <div 
                    key={i}
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: color }}
                  >
                    <div className="h-2 bg-white/30 rounded mb-1"></div>
                    <div className="h-1 bg-white/20 rounded w-2/3"></div>
                  </div>
                ))}
              </div>

              {/* Bottom Nav */}
              <div 
                className="p-3 flex justify-around border-t border-gray-200"
                style={{ backgroundColor: primary }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-white/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document Example */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Documento</h3>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            {/* Header with primary color */}
            <div 
              className="h-16 rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: primary }}
            >
              <div className="h-4 w-32 bg-white/30 rounded"></div>
            </div>

            {/* Content sections */}
            <div className="space-y-3">
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              
              <div 
                className="h-12 rounded p-3 flex items-center gap-2"
                style={{ backgroundColor: secondary + '20' }}
              >
                <div className="w-6 h-6 rounded" style={{ backgroundColor: secondary }}></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>

              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Branding Example */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Branding</h3>
          </div>
          <div className="space-y-4">
            {/* Business Card */}
            <div 
              className="rounded-lg p-4 shadow-xl relative overflow-hidden"
              style={{ backgroundColor: primary }}
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-20"
                style={{ backgroundColor: secondary }}
              ></div>
              <div className="relative z-10">
                <div className="h-3 w-20 bg-white/30 rounded mb-2"></div>
                <div className="h-2 w-32 bg-white/20 rounded mb-1"></div>
                <div className="h-1 w-24 bg-white/20 rounded"></div>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="flex gap-2">
              {colors.slice(0, 5).map((color, i) => (
                <div 
                  key={i}
                  className="flex-1 h-12 rounded-lg shadow-md"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteExamples;
