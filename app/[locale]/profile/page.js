'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Upload, Palette as PaletteIcon, ArrowLeft } from 'lucide-react';
import { getCurrentUser, updateUserProfile, uploadProfilePicture } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const photoUrl = await uploadProfilePicture(file, user.id);
      await updateUserProfile({ avatar_url: photoUrl });
      setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: photoUrl } });
      alert('Foto atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao fazer upload da foto: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010] flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#060010]">
      <main className="container mx-auto px-4 py-12">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {/* Profile Section */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meu Perfil</h1>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full cursor-pointer hover:bg-purple-600 transition-colors">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadPhoto}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.user_metadata?.full_name || 'Usuário'}
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-4">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
