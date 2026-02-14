'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const RemoveBackground = dynamic(() => import('@/components/RemoveBackground'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-white/60">Carregando...</p>
      </div>
    </div>
  ),
});

export default function RemoveBackgroundPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <RemoveBackground />
      </div>
    </main>
  );
}
