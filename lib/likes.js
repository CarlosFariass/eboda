import { supabase } from './supabase';

// Tipos de itens que podem ser curtidos
export const LIKE_TYPES = {
  PALETTE: 'palette',
  FONT: 'font',
};

// Verificar se o usuário curtiu um item
export async function checkIfLiked(userId, itemId, itemType) {
  if (!userId) return false;
  
  const { data, error } = await supabase
    .from('user_likes')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', String(itemId))
    .eq('item_type', itemType)
    .maybeSingle();
  
  if (error) {
    console.error('Erro ao verificar like:', error);
    return false;
  }
  
  return !!data;
}

// Buscar todos os likes do usuário
export async function getUserLikes(userId, itemType = null) {
  if (!userId) return [];
  
  let query = supabase
    .from('user_likes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (itemType) {
    query = query.eq('item_type', itemType);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Erro ao buscar likes:', error);
    return [];
  }
  
  return data || [];
}

// Buscar IDs dos itens curtidos (para verificação rápida)
export async function getUserLikedIds(userId, itemType) {
  if (!userId) return new Set();
  
  const { data, error } = await supabase
    .from('user_likes')
    .select('item_id')
    .eq('user_id', userId)
    .eq('item_type', itemType);
  
  if (error) {
    console.error('Erro ao buscar IDs curtidos:', error);
    return new Set();
  }
  
  return new Set((data || []).map(item => item.item_id));
}

// Adicionar like
export async function addLike(userId, itemId, itemType, itemData = {}) {
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }
  
  // Inserir o like
  const { data, error } = await supabase
    .from('user_likes')
    .insert({
      user_id: userId,
      item_id: String(itemId),
      item_type: itemType,
      item_data: itemData, // Dados extras (nome da fonte, cores da paleta, etc.)
    })
    .select();
  
  if (error) {
    // Se já existe, não é erro
    if (error.code === '23505') {
      return { alreadyLiked: true };
    }
    console.error('Erro ao adicionar like:', error);
    throw error;
  }
  
  // Incrementar contador na tabela original (palettes)
  if (itemType === LIKE_TYPES.PALETTE) {
    try {
      await supabase.rpc('increment_palette_likes', { palette_id: itemId });
    } catch (e) {
      console.log('increment_palette_likes não disponível');
    }
  }
  
  return data;
}

// Remover like
export async function removeLike(userId, itemId, itemType) {
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }
  
  const { error } = await supabase
    .from('user_likes')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', String(itemId))
    .eq('item_type', itemType);
  
  if (error) {
    console.error('Erro ao remover like:', error);
    throw error;
  }
  
  // Decrementar contador na tabela original (palettes)
  if (itemType === LIKE_TYPES.PALETTE) {
    try {
      await supabase.rpc('decrement_palette_likes', { palette_id: itemId });
    } catch (e) {
      console.log('decrement_palette_likes não disponível');
    }
  }
  
  return true;
}

// Toggle like (adicionar ou remover)
export async function toggleLike(userId, itemId, itemType, itemData = {}) {
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }
  
  const isLiked = await checkIfLiked(userId, itemId, itemType);
  
  if (isLiked) {
    await removeLike(userId, itemId, itemType);
    return { liked: false };
  } else {
    await addLike(userId, itemId, itemType, itemData);
    return { liked: true };
  }
}

// Buscar paletas curtidas com detalhes
export async function getLikedPalettes(userId) {
  if (!userId) return [];
  
  // Primeiro buscar os likes
  const { data: likes, error: likesError } = await supabase
    .from('user_likes')
    .select('item_id, item_data, created_at')
    .eq('user_id', userId)
    .eq('item_type', LIKE_TYPES.PALETTE)
    .order('created_at', { ascending: false });
  
  if (likesError) {
    console.error('Erro ao buscar likes:', likesError);
    return [];
  }
  
  if (!likes || likes.length === 0) return [];
  
  // Buscar as paletas pelos IDs
  const paletteIds = likes.map(like => like.item_id);
  const { data: palettes, error: palettesError } = await supabase
    .from('palettes')
    .select('id, colors, tags, description, likes, views')
    .in('id', paletteIds);
  
  if (palettesError) {
    console.error('Erro ao buscar paletas:', palettesError);
    // Retornar dados do item_data como fallback
    return likes.map(like => ({
      id: like.item_id,
      colors: like.item_data?.colors || [],
      description: like.item_data?.description || 'Paleta de cores',
      tags: [],
      likes: 0,
      views: 0,
      likedAt: like.created_at,
    }));
  }
  
  // Combinar likes com paletas
  const palettesMap = new Map(palettes.map(p => [p.id, p]));
  return likes.map(like => {
    const palette = palettesMap.get(like.item_id);
    if (palette) {
      return { ...palette, likedAt: like.created_at };
    }
    // Fallback para item_data
    return {
      id: like.item_id,
      colors: like.item_data?.colors || [],
      description: like.item_data?.description || 'Paleta de cores',
      tags: [],
      likes: 0,
      views: 0,
      likedAt: like.created_at,
    };
  });
}

// Buscar fontes curtidas
export async function getLikedFonts(userId) {
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('user_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('item_type', LIKE_TYPES.FONT)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar fontes curtidas:', error);
    return [];
  }
  
  // Retornar os dados salvos no item_data
  return (data || []).map(item => ({
    family: item.item_id,
    ...item.item_data,
    likedAt: item.created_at,
  }));
}
