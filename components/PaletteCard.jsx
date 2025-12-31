'use client';

import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';

export default function PaletteCard({ palette }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/palettes/${palette.id}`}>
      <div className="group cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        {/* Cores da Paleta */}
        <div className="flex h-32 w-full">
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 transition-all duration-300 hover:flex-grow"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Informações da Paleta */}
        <div className="p-4 bg-gray-900">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {palette.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-amber-600 text-white rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Descrição */}
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">
            {palette.description || 'Paleta de cores interessante'}
          </p>

          {/* Estatísticas e Ações */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{palette.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{palette.likes || 0}</span>
              </div>
            </div>

            {/* Botão Like */}
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all ${
                isLiked
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-amber-600 hover:text-white'
              }`}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}