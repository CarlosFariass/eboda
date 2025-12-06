'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { onAuthStateChange, signOut } from '@/lib/auth';

/**
 * HeaderWrapper Component
 * 
 * Wrapper que gerencia o estado de autenticação e renderiza o Header com as props necessárias.
 * Este componente é usado no layout.js global para garantir que a funcionalidade de login/logout funcione em todas as páginas.
 */
export default function HeaderWrapper() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to auth changes
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  if (loading) {
    // Renderiza um header vazio enquanto carrega
    return <div className="h-20" />;
  }

  return (
    <>
      <Header 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      {showAuthModal && (
        <AuthModal
          onClose={handleAuthModalClose}
        />
      )}
    </>
  );
}