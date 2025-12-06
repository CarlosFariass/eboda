import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: A linha abaixo estava causando o erro de "definido múltiplas vezes"
// pois a função callPythonAI estava definida logo abaixo.
// Mantenho o import comentado como lembrete, mas o código final deve usar a função
// que já existe no seu projeto (provavelmente em '../../scripts/ai_helper_caller').
// import { callPythonAI } from '../../scripts/ai_helper_caller'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// A função callPythonAI DEVE ser importada do seu arquivo de helper original.
// Como não tenho acesso ao seu arquivo de helper, vou usar uma função placeholder
// que simula o comportamento esperado, mas você DEVE garantir que a função
// callPythonAI do seu projeto esteja disponível e funcionando.
// Para o propósito de compilação, vou assumir que a função existe no escopo global
// ou que o import correto está sendo usado no seu ambiente.
// Vou re-incluir a definição da função aqui, mas sem o import, para que o arquivo compile.
// Se o seu projeto já tem o import, você deve APAGAR esta definição.
// Vou usar a definição que você tinha no seu arquivo original (pasted_content_2.txt)
// para garantir que o código seja o mais próximo possível do seu ambiente.

async function callPythonAI(type, data) {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  
  // Create a temporary JSON file with the data
  const dataPath = path.join('/tmp', `eboda_data_${Date.now()}.json`);
  fs.writeFileSync(dataPath, JSON.stringify(data));
  
  // O caminho do script deve ser ajustado para onde o ai_helper.py está no seu projeto
  const scriptPathCorrected = path.join(process.cwd(), 'scripts', 'ai_helper.py');
  
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [scriptPathCorrected, type, dataPath]);
    
    let output = '';
    let errorOutput = '';
    
    python.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    python.on('close', (code) => {
      // Clean up temporary file
      try {
        fs.unlinkSync(dataPath);
      } catch (e) {
        console.error('Failed to delete temp file:', e);
      }
      
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject(new Error(errorOutput || 'Python script failed'));
      }
    });
    
    python.on('error', (error) => {
      reject(error);
    });
  });
}


// GET /api/palettes - Get all palettes
export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    // Get user palettes
    if (path === '[[...path]]' || path === 'palettes' || path === 'palettes/') {
      const userId = searchParams.get('userId');
      
      let query = supabase.from('palettes').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false }).limit(100);
      
      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ palettes: [] });
      }
      
      return NextResponse.json({ palettes: data || [] });
    }
    
    // Get health check
    if (path === 'health' || path === 'health/') {
      return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Função auxiliar para gerar uma chave de cache única a partir dos dados do quiz
function getCacheKey(quizData) {
  // Cria uma string determinística a partir dos dados do quiz
  const quizString = JSON.stringify({
    businessType: quizData.businessType,
    style: quizData.style,
    mood: quizData.mood,
    colors: quizData.colors,
    // companyName é ignorado, pois não afeta a paleta, apenas o prompt
  });
  // Usa uma função hash simples (ou criptográfica, se necessário)
  // Para simplicidade e evitar dependências, usaremos uma string simples.
  // Em produção, considere usar um hash como SHA-256.
  return Buffer.from(quizString).toString('base64');
}

// POST requests
export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json().catch(() => ({}));

    // Save palette
    if (path === '[[...path]]' || path === 'palettes' || path === 'palettes/') {
      const { name, colors, userId } = body;
      
      if (!name || !colors || !userId) {
        return NextResponse.json({ error: 'Name, colors and userId are required' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from('palettes')
        .insert([{
          name,
          colors,
          user_id: userId,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ palette: data[0] });
    }

    // Generate palette from quiz
    if (path === 'generate-quiz-palette' || path === 'generate-quiz-palette/') {
      const { quizData } = body;
      
      if (!quizData) {
        return NextResponse.json({ error: 'Quiz data is required' }, { status: 400 });
      }

      const cacheKey = getCacheKey(quizData);
      
      // 1. TENTAR LER DO CACHE
      try {
        const { data: cacheData, error: cacheError } = await supabase
          .from('quiz_cache')
          .select('colors')
          .eq('cache_key', cacheKey)
          .single();

        if (cacheData && cacheData.colors) {
          console.log('✅ Paleta encontrada no cache para:', cacheKey);
          return NextResponse.json({
            colors: cacheData.colors,
            message: `Paleta gerada para ${quizData.companyName || 'sua empresa'}! (Cache)`
          });
        }
        
        if (cacheError && cacheError.code !== 'PGRST116') { // PGRST116 = No rows found
          console.error('⚠️ Erro ao ler cache do Supabase:', cacheError);
        }
      } catch (e) {
        console.error('💥 Erro inesperado ao ler cache:', e);
      }

      // 2. SE NÃO ESTIVER NO CACHE, CHAMAR A IA
      try {
        // Generate palette based on quiz answers using AI
        const response = await callPythonAI('quiz_palette', quizData);
        
        // LOG CRÍTICO: Veja o que a IA está retornando antes do parse
        console.log('🤖 RESPOSTA BRUTA DA IA:', response); 
        
        let colors;
        let message = `Paleta gerada para ${quizData.companyName || 'sua empresa'}!`;
        let isFallback = false;
        
        try {
          const jsonResponse = JSON.parse(response);
          
          if (jsonResponse.error) {
            // Se o erro for de quota, o fallback será usado
            if (jsonResponse.error.includes('insufficient_quota')) {
              console.warn('⚠️ AI Quota exceeded. Using fallback colors.');
              colors = ['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];
              message = `Paleta padrão (AI Quota Excedida) para ${quizData.companyName || 'sua empresa'}!`;
              isFallback = true;
            } else {
              throw new Error(jsonResponse.error);
            }
          } else {
            colors = jsonResponse.palette;
            
            if (!colors || !Array.isArray(colors) || colors.length === 0) {
              throw new Error('Invalid palette format');
            }
          }
          
        } catch (e) {
          console.error('❌ JSON Parse Error for Quiz Palette:', e);
          // Fallback colors in case of parsing error
          colors = ['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];
          message = `Paleta padrão (Erro de Processamento) para ${quizData.companyName || 'sua empresa'}!`;
          isFallback = true;
        }

        // 3. ESCREVER NO CACHE (SOMENTE SE NÃO FOR FALLBACK)
        if (!isFallback) {
          try {
            const { error: insertError } = await supabase
              .from('quiz_cache')
              .upsert({ cache_key: cacheKey, colors: colors })
              .select();
              
            if (insertError) {
              console.error('⚠️ Erro ao escrever no cache do Supabase:', insertError);
            } else {
              console.log('💾 Paleta salva no cache com sucesso.');
            }
          } catch (e) {
            console.error('💥 Erro inesperado ao escrever cache:', e);
          }
        }

        const responseData = {
          colors,
          message
        };
        
        return NextResponse.json(responseData);
      } catch (error) {
        console.error('💥 AI Quiz Error:', error);
        return NextResponse.json({ 
          error: 'Failed to generate quiz palette: ' + error.message 
        }, { status: 500 });
      }
    }

    // Generate palette from image
    if (path === 'generate-palette' || path === 'generate-palette/') {
      const { image_base64 } = body;
      
      if (!image_base64) {
        return NextResponse.json({ error: 'Image base64 is required' }, { status: 400 });
      }

      try {
        // Generate palette from image using AI
        const response = await callPythonAI('image_palette', { image_base64 });
        
        let colors;
        let message = 'Paleta gerada a partir da imagem!';
        
        try {
          const jsonResponse = JSON.parse(response);
          
          if (jsonResponse.error) {
            // Se o erro for de quota, o fallback será usado
            if (jsonResponse.error.includes('insufficient_quota')) {
              console.warn('⚠️ AI Quota exceeded. Using fallback colors.');
              colors = ['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];
              message = 'Paleta padrão (AI Quota Excedida) para a imagem!';
            } else {
              throw new Error(jsonResponse.error);
            }
          } else {
            colors = jsonResponse.palette;
            
            if (!colors || !Array.isArray(colors) || colors.length === 0) {
              throw new Error('Invalid palette format');
            }
          }
          
        } catch (e) {
          console.error('❌ JSON Parse Error for Image Palette:', e);
          // Fallback colors in case of parsing error
          colors = ['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];
          message = 'Paleta padrão (Erro de Processamento) para a imagem!';
        }

        const responseData = {
          colors,
          message
        };
        
        return NextResponse.json(responseData);
      } catch (error) {
        console.error('💥 AI Image Error:', error);
        return NextResponse.json({ 
          error: 'Failed to generate image palette: ' + error.message 
        }, { status: 500 });
      }
    }

    // Export palette to Figma
    if (path === 'export-figma' || path === 'export-figma/') {
      const { colors, name } = body;
      
      if (!colors || !name) {
        return NextResponse.json({ error: 'Colors and name are required' }, { status: 400 });
      }

      // Format colors for Figma
      const figmaColors = colors.map((color, index) => ({
        name: `${name}/${index + 1}`,
        color: color,
        description: `Color ${index + 1} from ${name} palette`
      }));

      return NextResponse.json({ 
        success: true, 
        message: 'Palette formatted for Figma',
        figmaColors 
      });
    }

    // Export palette to various formats
    if (path === '[[...path]]' || path === 'export' || path === 'export/') {
      const { colors, name, format } = body;
      
      if (!colors || !name || !format) {
        return NextResponse.json({ error: 'Colors, name and format are required' }, { status: 400 });
      }

      let exportData;

      switch (format) {
        case 'css':
          exportData = `:root {\n${colors.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}\n}`;
          break;
        
        case 'scss':
          exportData = colors.map((color, i) => `$color-${i + 1}: ${color};`).join('\n');
          break;
        
        case 'js':
          exportData = `export const ${name.replace(/\s+/g, '')}Palette = ${JSON.stringify(colors, null, 2)};`;
          break;
        
        case 'json':
          exportData = JSON.stringify({ name, colors }, null, 2);
          break;
        
        default:
          return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
      }

      return NextResponse.json({ exportData, format });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE requests
export async function DELETE(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json().catch(() => ({}));

    // Delete palette
    if (path.startsWith('palettes')) {
      const { id } = body;
      
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }

      const { error } = await supabase
        .from('palettes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}