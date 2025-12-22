import React from 'react';
import GradientGenerator from '@/components/GradientGenerator';

export const metadata = {
  title: 'Gradient Generator - CSS Gradients | EBODA',
  description: 'Crie gradientes CSS personalizados com suporte a linear, radial e conic. Exporte para CSS e Tailwind.',
};

export default function GradientGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <GradientGenerator />
      </div>
    </main>
  );
}