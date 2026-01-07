'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Upload, Palette as PaletteIcon, ArrowLeft, Heart, Type, Trash2 } from 'lucide-react';
import { getCurrentUser, updateUserProfile, uploadProfilePicture } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { getLikedPalettes, getLikedFonts, removeLike, LIKE_TYPES } from '@/lib/likes';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [likedPalettes, setLikedPalettes] = useState([]);
  const [likedFonts, setLikedFonts] = useState([]);
  const [activeTab, setActiveTab] = useState('palettes');
  const [loadingLikes, setLoadingLikes] = useState(true);

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
      
      // Carregar itens curtidos
      setLoadingLikes(true);
      const [palettes, fonts] = await Promise.all([
        getLikedPalettes(currentUser.id),
        getLikedFonts(currentUser.id),
      ]);
      setLikedPalettes(palettes);
      setLikedFonts(fonts);
      setLoadingLikes(false);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePaletteLike = async (paletteId) => {
    try {
      await removeLike(user.id, String(paletteId), LIKE_TYPES.PALETTE);
      setLikedPalettes(prev => prev.filter(p => p.id !== paletteId));
    } catch (error) {
      console.error('Erro ao remover like:', error);
    }
  };

  const handleRemoveFontLike = async (fontFamily) => {
    try {
      await removeLike(user.id, fontFamily, LIKE_TYPES.FONT);
      setLikedFonts(prev => prev.filter(f => f.family !== fontFamily));
    } catch (error) {
      console.error('Erro ao remover like:', error);
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
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-amber-500 flex items-center justify-center overflow-hidden">
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
              <label className="absolute bottom-0 right-0 p-2 bg-amber-500 rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
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

        {/* Seção de Itens Curtidos */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Favoritos</h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('palettes')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'palettes'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              <PaletteIcon className="w-4 h-4" />
              Paletas ({likedPalettes.length})
            </button>
            <button
              onClick={() => setActiveTab('fonts')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'fonts'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              Fontes ({likedFonts.length})
            </button>
          </div>

          {/* Conteúdo das Tabs */}
          {loadingLikes ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-white/60">Carregando favoritos...</p>
            </div>
          ) : (
            <>
              {/* Paletas Curtidas */}
              {activeTab === 'palettes' && (
                <div>
                  {likedPalettes.length === 0 ? (
                    <div className="text-center py-12">
                      <PaletteIcon className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-white/60 mb-4">Você ainda não curtiu nenhuma paleta</p>
                      <Link href="/palettes">
                        <Button className="bg-amber-500 hover:bg-amber-600">
                          Explorar Paletas
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {likedPalettes.map((palette) => (
                        <div
                          key={palette.id}
                          className="group relative rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/50 transition-all"
                        >
                          {/* Cores */}
                          <Link href={`/palettes/${palette.id}`}>
                            <div className="flex h-20">
                              {palette.colors?.map((color, i) => (
                                <div
                                  key={i}
                                  className="flex-1"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </Link>
                          
                          {/* Info */}
                          <div className="p-3 flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-white/60 truncate flex-1">
                              {palette.description || 'Paleta de cores'}
                            </p>
                            <button
                              onClick={() => handleRemovePaletteLike(palette.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              title="Remover dos favoritos"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fontes Curtidas */}
              {activeTab === 'fonts' && (
                <div>
                  {likedFonts.length === 0 ? (
                    <div className="text-center py-12">
                      <Type className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-white/60 mb-4">Você ainda não curtiu nenhuma fonte</p>
                      <Link href="/tools/fonts">
                        <Button className="bg-amber-500 hover:bg-amber-600">
                          Explorar Fontes
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {likedFonts.map((font) => (
                        <div
                          key={font.family}
                          className="group relative p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/50 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white">{font.family}</h3>
                              <p className="text-xs text-gray-500 dark:text-white/50 capitalize">{font.category}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveFontLike(font.family)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              title="Remover dos favoritos"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p
                            className="text-xl text-gray-700 dark:text-white/80"
                            style={{ fontFamily: `'${font.family}', ${font.category}` }}
                          >
                            Aa Bb Cc 123
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
