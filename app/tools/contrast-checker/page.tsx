import React from 'react';
import ContrastChecker from '@/components/ContrastChecker';

export const metadata = {
  title: 'Contrast Checker - WCAG Accessibility | EBODA',
  description: 'Verifique o contraste entre cores e garanta acessibilidade WCAG AA e AAA para seu projeto.',
};

export default function ContrastCheckerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#060010] py-12 px-4">
      <div className="container mx-auto">
        <ContrastChecker />
      </div>
    </main>
  );
}