import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EBODA - Paleta de Cores',
  description: 'Ferramenta inovadora de paleta de cores',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Header Global com Autenticação */}
          <HeaderWrapper />
          
          {/* Conteúdo Principal */}
          <main>
            {children}
          </main>
          
          {/* Footer Global */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}