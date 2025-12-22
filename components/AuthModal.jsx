'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGitHub } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const AuthModal = ({ onClose }) => {
  const t = useTranslations('auth');
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        if (!formData.name || !formData.email || !formData.password) {
          setError(t('fillAllFields'));
          setLoading(false);
          return;
        }
        await signUpWithEmail(formData.email, formData.password, formData.name);
        alert(t('accountCreated'));
        onClose();
      } else {
        if (!formData.email || !formData.password) {
          setError(t('fillEmailPassword'));
          setLoading(false);
          return;
        }
        await signInWithEmail(formData.email, formData.password);
        onClose();
      }
    } catch (err) {
      setError(err.message || t('authError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(t('oauthNotConfigured'));
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGitHub();
    } catch (err) {
      setError(t('oauthNotConfigured'));
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(6, 0, 16, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0015] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{t('loginToEboda')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-white/60 text-sm mb-6">
            {mode === 'signup' ? t('createAccount') : t('loginToSave')}
          </p>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-white/80 mb-2">{t('name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder={t('yourName')}
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-white/80 mb-2">{t('email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="email@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">{t('password')}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? t('loading') : (mode === 'signup' ? t('create') : t('login'))}
            </Button>
          </form>

          {/* Toggle Mode */}
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="w-full text-center text-sm text-white/60 hover:text-white transition-colors"
          >
            {mode === 'signin' ? t('noAccount') : t('hasAccount')}
          </button>

          <p className="text-xs text-white/40 text-center mt-4">
            {t('useEmailPassword')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;