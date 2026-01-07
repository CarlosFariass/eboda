# EBODA Fonts - Arquitetura Técnica

## 📋 Visão Geral

Documento técnico para expansão do EBODA com funcionalidades de fontes, integrando 6 features principais ao ecossistema existente.

---

## 🏗️ Stack Atual (Base)

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TailwindCSS, Radix UI/shadcn |
| Backend | Next.js API Routes, Python scripts (AI) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email, Google, GitHub) |
| Storage | Supabase Storage |
| i18n | next-intl (pt/en) |

---

## 🎯 Features a Implementar

1. **Gerador de Pares de Fontes** - Sugerir combinações harmoniosas
2. **Pré-visualização em Contexto** - Ver fontes em templates reais
3. **Teste de Legibilidade** - Verificar contraste e acessibilidade
4. **Escala Tipográfica** - Gerar hierarquia de tamanhos
5. **Análise de Fontes** - Identificar fontes de imagens
6. **Paleta Tipográfica + Cromática** - Design systems completos

---

## 📊 Modelo de Dados (Supabase)

### Tabelas Novas

```sql
-- ============================================
-- TABELA: fonts (Catálogo de fontes)
-- ============================================
CREATE TABLE fonts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  family TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('serif', 'sans-serif', 'display', 'handwriting', 'monospace')),
  variants JSONB NOT NULL DEFAULT '[]',
  -- Ex: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "100italic", ...]
  subsets JSONB NOT NULL DEFAULT '["latin"]',
  -- Ex: ["latin", "latin-ext", "cyrillic"]
  source TEXT NOT NULL DEFAULT 'google',
  -- google, adobe, custom
  source_url TEXT,
  -- URL para carregar a fonte (Google Fonts API, etc)
  popularity INT DEFAULT 0,
  -- Ranking de popularidade
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fonts_category ON fonts(category);
CREATE INDEX idx_fonts_popularity ON fonts(popularity DESC);
CREATE INDEX idx_fonts_name ON fonts(name);

-- ============================================
-- TABELA: font_pairings (Pares de fontes)
-- ============================================
CREATE TABLE font_pairings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading_font_id UUID REFERENCES fonts(id) ON DELETE CASCADE,
  body_font_id UUID REFERENCES fonts(id) ON DELETE CASCADE,
  style TEXT CHECK (style IN ('modern', 'classic', 'minimal', 'bold', 'elegant', 'playful', 'professional')),
  compatibility_score FLOAT DEFAULT 0.0,
  -- Score de 0 a 1 indicando compatibilidade
  use_cases JSONB DEFAULT '[]',
  -- Ex: ["blog", "ecommerce", "portfolio", "landing"]
  ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(heading_font_id, body_font_id)
);

CREATE INDEX idx_font_pairings_style ON font_pairings(style);
CREATE INDEX idx_font_pairings_score ON font_pairings(compatibility_score DESC);

-- ============================================
-- TABELA: user_font_collections (Coleções do usuário)
-- ============================================
CREATE TABLE user_font_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  fonts JSONB NOT NULL DEFAULT '[]',
  -- Array de font_ids
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_font_collections_user ON user_font_collections(user_id);
CREATE INDEX idx_user_font_collections_public ON user_font_collections(is_public) WHERE is_public = TRUE;

-- ============================================
-- TABELA: type_scales (Escalas tipográficas salvas)
-- ============================================
CREATE TABLE type_scales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  base_size INT NOT NULL DEFAULT 16,
  -- Tamanho base em pixels
  scale_ratio FLOAT NOT NULL DEFAULT 1.25,
  -- Ex: 1.125 (Major Second), 1.25 (Major Third), 1.333 (Perfect Fourth)
  line_height_ratio FLOAT NOT NULL DEFAULT 1.5,
  font_id UUID REFERENCES fonts(id),
  generated_sizes JSONB NOT NULL,
  -- Ex: {"xs": 12, "sm": 14, "base": 16, "lg": 20, "xl": 25, "2xl": 31, "3xl": 39}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_type_scales_user ON type_scales(user_id);

-- ============================================
-- TABELA: design_kits (Paleta + Fontes combinadas)
-- ============================================
CREATE TABLE design_kits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  palette_id UUID REFERENCES palettes(id) ON DELETE SET NULL,
  heading_font_id UUID REFERENCES fonts(id),
  body_font_id UUID REFERENCES fonts(id),
  type_scale_id UUID REFERENCES type_scales(id),
  css_variables JSONB,
  -- Variáveis CSS prontas para exportar
  preview_config JSONB,
  -- Configurações de preview
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_design_kits_user ON design_kits(user_id);
CREATE INDEX idx_design_kits_public ON design_kits(is_public) WHERE is_public = TRUE;

-- ============================================
-- TABELA: font_analysis_cache (Cache de análise de fontes)
-- ============================================
CREATE TABLE font_analysis_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_hash TEXT NOT NULL UNIQUE,
  -- Hash da imagem para evitar reprocessamento
  detected_fonts JSONB NOT NULL,
  -- Ex: [{"name": "Roboto", "confidence": 0.95}, {"name": "Open Sans", "confidence": 0.78}]
  processing_time_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_font_analysis_cache_hash ON font_analysis_cache(image_hash);

-- ============================================
-- RLS Policies
-- ============================================
ALTER TABLE fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE font_pairings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_font_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE type_scales ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE font_analysis_cache ENABLE ROW LEVEL SECURITY;

-- Fonts: leitura pública
CREATE POLICY "Fonts are viewable by everyone" ON fonts FOR SELECT USING (true);

-- Font pairings: leitura pública
CREATE POLICY "Font pairings are viewable by everyone" ON font_pairings FOR SELECT USING (true);

-- User collections: usuário vê suas próprias + públicas
CREATE POLICY "Users can manage own collections" ON user_font_collections
  FOR ALL USING (user_id = auth.uid()::text OR is_public = true);

-- Type scales: usuário vê apenas suas próprias
CREATE POLICY "Users can manage own type scales" ON type_scales
  FOR ALL USING (user_id = auth.uid()::text);

-- Design kits: usuário vê suas próprias + públicas
CREATE POLICY "Users can manage own design kits" ON design_kits
  FOR ALL USING (user_id = auth.uid()::text OR is_public = true);

-- Cache: acesso total (otimização)
CREATE POLICY "Cache is accessible to all" ON font_analysis_cache FOR ALL USING (true);
```

---

## 🔌 API Endpoints

### Estrutura de Rotas

```
/api/fonts/
├── GET    /                     # Listar fontes (com filtros)
├── GET    /:id                  # Detalhes de uma fonte
├── GET    /search               # Busca por nome/categoria
├── GET    /popular              # Fontes mais populares
│
├── /pairings/
│   ├── GET    /                 # Listar pares
│   ├── GET    /suggest          # Sugerir pares para uma fonte
│   ├── POST   /generate         # Gerar par com IA
│   └── GET    /:style           # Pares por estilo
│
├── /analyze/
│   ├── POST   /image            # Identificar fonte de imagem
│   └── GET    /cache/:hash      # Buscar no cache
│
├── /scale/
│   ├── POST   /generate         # Gerar escala tipográfica
│   ├── GET    /presets          # Escalas pré-definidas
│   └── POST   /save             # Salvar escala do usuário
│
├── /collections/
│   ├── GET    /                 # Coleções do usuário
│   ├── POST   /                 # Criar coleção
│   ├── PUT    /:id              # Atualizar coleção
│   └── DELETE /:id              # Deletar coleção
│
├── /accessibility/
│   ├── POST   /check            # Verificar legibilidade
│   └── POST   /contrast         # Calcular contraste fonte/fundo
│
└── /design-kits/
    ├── GET    /                 # Listar design kits
    ├── POST   /                 # Criar design kit
    ├── POST   /generate         # Gerar kit completo com IA
    ├── GET    /:id              # Detalhes do kit
    ├── GET    /:id/export       # Exportar (CSS, JSON, Figma)
    └── DELETE /:id              # Deletar kit
```

### Exemplo de Implementação

```javascript
// app/api/fonts/[[...path]]/route.js

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  const path = pathname.replace('/api/fonts/', '');
  
  // GET /api/fonts - Listar fontes
  if (!path || path === '') {
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = supabase
      .from('fonts')
      .select('*')
      .order('popularity', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ fonts: data });
  }
  
  // GET /api/fonts/pairings/suggest?font_id=xxx
  if (path === 'pairings/suggest') {
    const fontId = searchParams.get('font_id');
    
    const { data, error } = await supabase
      .from('font_pairings')
      .select(`
        *,
        heading_font:fonts!heading_font_id(*),
        body_font:fonts!body_font_id(*)
      `)
      .or(`heading_font_id.eq.${fontId},body_font_id.eq.${fontId}`)
      .order('compatibility_score', { ascending: false })
      .limit(10);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ pairings: data });
  }
  
  // ... outros endpoints
}

export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/fonts/', '');
  const body = await request.json();
  
  // POST /api/fonts/analyze/image - Identificar fonte
  if (path === 'analyze/image') {
    const { image_base64 } = body;
    
    // Gerar hash da imagem para cache
    const imageHash = await generateImageHash(image_base64);
    
    // Verificar cache
    const { data: cached } = await supabase
      .from('font_analysis_cache')
      .select('detected_fonts')
      .eq('image_hash', imageHash)
      .single();
    
    if (cached) {
      return NextResponse.json({ 
        fonts: cached.detected_fonts,
        cached: true 
      });
    }
    
    // Chamar IA para análise
    const result = await callPythonAI('font_analysis', { image_base64 });
    const detectedFonts = JSON.parse(result);
    
    // Salvar no cache
    await supabase
      .from('font_analysis_cache')
      .insert({ image_hash: imageHash, detected_fonts: detectedFonts.fonts });
    
    return NextResponse.json({ fonts: detectedFonts.fonts, cached: false });
  }
  
  // POST /api/fonts/scale/generate - Gerar escala tipográfica
  if (path === 'scale/generate') {
    const { baseSize = 16, ratio = 1.25, steps = 7 } = body;
    
    const sizes = generateTypeScale(baseSize, ratio, steps);
    
    return NextResponse.json({ 
      scale: sizes,
      config: { baseSize, ratio, steps }
    });
  }
  
  // ... outros endpoints
}

// Utilitário: Gerar escala tipográfica
function generateTypeScale(base, ratio, steps) {
  const scale = {};
  const names = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
  const baseIndex = 2; // 'base' está no índice 2
  
  for (let i = 0; i < steps && i < names.length; i++) {
    const power = i - baseIndex;
    scale[names[i]] = Math.round(base * Math.pow(ratio, power));
  }
  
  return scale;
}
```

---

## 🎨 Arquitetura Frontend

### Estrutura de Páginas

```
app/[locale]/
├── fonts/
│   ├── page.js                    # Landing/Explorer de fontes
│   ├── [slug]/
│   │   └── page.js                # Detalhes da fonte
│   └── layout.js
│
├── tools/
│   ├── font-pairing/
│   │   └── page.js                # Gerador de pares
│   ├── type-scale/
│   │   └── page.js                # Escala tipográfica
│   ├── font-identifier/
│   │   └── page.js                # Identificador de fontes
│   ├── readability-checker/
│   │   └── page.js                # Teste de legibilidade
│   └── design-kit/
│       └── page.js                # Gerador de design kit
│
└── collections/
    ├── page.js                    # Minhas coleções
    └── [id]/
        └── page.js                # Detalhes da coleção
```

### Componentes Principais

```
components/
├── Fonts/
│   ├── FontCard.jsx               # Card de preview de fonte
│   ├── FontPairPreview.jsx        # Preview de par de fontes
│   ├── FontSelector.jsx           # Dropdown/modal de seleção
│   ├── FontSpecimen.jsx           # Specimen completo da fonte
│   ├── TypeScalePreview.jsx       # Visualização de escala
│   ├── ReadabilityMeter.jsx       # Indicador de legibilidade
│   ├── FontUploader.jsx           # Upload para identificação
│   └── DesignKitBuilder.jsx       # Builder de design kit
│
├── Preview/
│   ├── TemplatePreview.jsx        # Preview em templates
│   ├── LiveTextEditor.jsx         # Editor de texto ao vivo
│   └── ContrastChecker.jsx        # Verificador de contraste
│
└── Export/
    ├── CSSExporter.jsx            # Exportar variáveis CSS
    ├── FigmaExporter.jsx          # Exportar para Figma
    └── TokenExporter.jsx          # Exportar design tokens
```

### Exemplo de Componente

```jsx
// components/Fonts/FontPairPreview.jsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Download, RefreshCw } from 'lucide-react';

export default function FontPairPreview({ 
  headingFont, 
  bodyFont, 
  onSave,
  onRegenerate 
}) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Carregar fontes dinamicamente
    const loadFonts = async () => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${headingFont.family}:wght@700&family=${bodyFont.family}:wght@400&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      await document.fonts.ready;
      setLoaded(true);
    };
    
    loadFonts();
  }, [headingFont, bodyFont]);
  
  if (!loaded) {
    return <div className="animate-pulse h-64 bg-white/5 rounded-xl" />;
  }
  
  return (
    <div className="bg-white/5 rounded-xl p-8 border border-white/10">
      {/* Preview */}
      <div className="space-y-4 mb-6">
        <h2 
          style={{ fontFamily: headingFont.family }}
          className="text-4xl font-bold text-white"
        >
          The quick brown fox
        </h2>
        <p 
          style={{ fontFamily: bodyFont.family }}
          className="text-lg text-white/80 leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      
      {/* Info */}
      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <div>
          <span className="text-white">{headingFont.name}</span> + {bodyFont.name}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-white/10 rounded text-xs">
            {headingFont.category}
          </span>
          <span className="px-2 py-1 bg-white/10 rounded text-xs">
            {bodyFont.category}
          </span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Novo par
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          <Heart className="w-4 h-4 mr-2" />
          Salvar
        </Button>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
}
```

---

## 🤖 Integração com IA

### Scripts Python

```
scripts/
├── ai_helper.py                   # Existente (paletas)
├── font_analyzer.py               # Novo: Identificação de fontes
├── font_pairing_ai.py             # Novo: Geração de pares
└── design_kit_generator.py        # Novo: Geração de kits completos
```

### Exemplo: Identificação de Fontes

```python
# scripts/font_analyzer.py
import sys
import json
import base64
from io import BytesIO
from PIL import Image
import openai

def analyze_font_from_image(image_base64: str) -> dict:
    """
    Analisa uma imagem e tenta identificar as fontes presentes.
    Usa GPT-4 Vision para análise visual.
    """
    client = openai.OpenAI()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": """You are a typography expert. Analyze the image and identify fonts.
                Return a JSON with:
                {
                    "fonts": [
                        {"name": "Font Name", "confidence": 0.95, "category": "sans-serif", "similar": ["Alternative 1", "Alternative 2"]},
                        ...
                    ],
                    "characteristics": {
                        "style": "modern|classic|minimal|bold",
                        "weight": "light|regular|medium|bold|black",
                        "width": "condensed|normal|expanded"
                    }
                }"""
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Identify the fonts in this image:"},
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
                ]
            }
        ],
        max_tokens=500
    )
    
    return json.loads(response.choices[0].message.content)


def generate_font_pairing(base_font: str, style: str, use_case: str) -> dict:
    """
    Gera sugestões de pares de fontes usando IA.
    """
    client = openai.OpenAI()
    
    prompt = f"""
    Base font: {base_font}
    Desired style: {style}
    Use case: {use_case}
    
    Suggest 3 font pairings (heading + body combinations) that work well with the base font.
    Return JSON:
    {{
        "pairings": [
            {{
                "heading": "Font Name",
                "body": "Font Name",
                "reasoning": "Why this pairing works",
                "compatibility_score": 0.95
            }}
        ]
    }}
    """
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a typography expert specializing in font pairings."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500
    )
    
    return json.loads(response.choices[0].message.content)


if __name__ == "__main__":
    action = sys.argv[1]
    data_path = sys.argv[2]
    
    with open(data_path, 'r') as f:
        data = json.load(f)
    
    if action == "font_analysis":
        result = analyze_font_from_image(data['image_base64'])
    elif action == "font_pairing":
        result = generate_font_pairing(
            data['base_font'],
            data.get('style', 'modern'),
            data.get('use_case', 'website')
        )
    else:
        result = {"error": f"Unknown action: {action}"}
    
    print(json.dumps(result))
```

---

## 📦 Armazenamento e CDN

### Estratégia de Fontes

| Fonte | Estratégia |
|-------|-----------|
| Google Fonts | CDN do Google (gratuito, rápido) |
| Adobe Fonts | API Adobe (requer conta) |
| Custom Fonts | Supabase Storage + CDN |

### Supabase Storage Buckets

```sql
-- Criar bucket para fontes customizadas
INSERT INTO storage.buckets (id, name, public)
VALUES ('custom-fonts', 'custom-fonts', true);

-- Policy: upload apenas autenticado
CREATE POLICY "Users can upload custom fonts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'custom-fonts');

-- Policy: leitura pública
CREATE POLICY "Custom fonts are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'custom-fonts');
```

### Cache Strategy

```javascript
// lib/fontCache.js

const FONT_CACHE_TTL = 60 * 60 * 24 * 7; // 7 dias

export async function getCachedFontList() {
  // Tentar cache local (localStorage no browser)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('eboda_fonts_cache');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < FONT_CACHE_TTL * 1000) {
        return data;
      }
    }
  }
  
  // Buscar do servidor
  const response = await fetch('/api/fonts?limit=500');
  const { fonts } = await response.json();
  
  // Salvar no cache
  if (typeof window !== 'undefined') {
    localStorage.setItem('eboda_fonts_cache', JSON.stringify({
      data: fonts,
      timestamp: Date.now()
    }));
  }
  
  return fonts;
}
```

---

## ⚡ Performance e Escalabilidade

### 1. Lazy Loading de Fontes

```javascript
// hooks/useFontLoader.js
import { useState, useEffect } from 'react';

export function useFontLoader(fontFamily) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!fontFamily) return;
    
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}&display=swap`;
    link.rel = 'stylesheet';
    
    link.onload = () => setLoaded(true);
    link.onerror = () => setError(new Error(`Failed to load font: ${fontFamily}`));
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [fontFamily]);
  
  return { loaded, error };
}
```

### 2. Virtualização para Lista de Fontes

```jsx
// Usar react-window para listas grandes
import { FixedSizeList } from 'react-window';

function FontList({ fonts }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <FontCard font={fonts[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={fonts.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 3. Edge Caching com Vercel

```javascript
// next.config.js - Headers para cache
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};
```

### 4. Background Jobs (opcional)

Para tarefas pesadas como sincronização de fontes ou análise em batch:

```javascript
// Usar Vercel Cron ou Supabase Edge Functions
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/sync-fonts",
      "schedule": "0 0 * * 0"  // Semanalmente
    }
  ]
}
```

---

## 🔐 Segurança

### Rate Limiting

```javascript
// middleware.js (adicionar)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/fonts/analyze')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
  }
}
```

### Validação de Uploads

```javascript
const ALLOWED_FONT_TYPES = ['font/ttf', 'font/otf', 'font/woff', 'font/woff2'];
const MAX_FONT_SIZE = 5 * 1024 * 1024; // 5MB

function validateFontUpload(file) {
  if (!ALLOWED_FONT_TYPES.includes(file.type)) {
    throw new Error('Invalid font type');
  }
  if (file.size > MAX_FONT_SIZE) {
    throw new Error('Font file too large');
  }
}
```

---

## 📱 UX/UI Guidelines

### Princípios

1. **Preview First** - Sempre mostrar como a fonte ficará antes de qualquer ação
2. **Comparação Fácil** - Permitir comparar múltiplas fontes lado a lado
3. **Contexto Real** - Mostrar fontes em templates realistas, não só "ABC abc 123"
4. **Feedback Imediato** - Mudanças refletidas instantaneamente
5. **Integração com Cores** - Sempre oferecer opção de combinar com paletas

### Estados da UI

```
Loading: Skeleton + texto "Carregando fontes..."
Empty: Ilustração + CTA para explorar
Error: Mensagem clara + botão retry
Success: Animação sutil + próximos passos
```

---

## 🚀 Roadmap de Implementação

### Fase 1 - Foundation (2-3 semanas)
- [ ] Setup banco de dados (tabelas + RLS)
- [ ] Popular tabela `fonts` com Google Fonts
- [ ] API básica de listagem e busca
- [ ] Página de exploração de fontes
- [ ] Componente FontCard

### Fase 2 - Core Features (3-4 semanas)
- [ ] Gerador de pares de fontes
- [ ] Escala tipográfica
- [ ] Teste de legibilidade
- [ ] Preview em contexto

### Fase 3 - AI Features (2-3 semanas)
- [ ] Identificador de fontes (upload de imagem)
- [ ] Geração inteligente de pares
- [ ] Sugestões baseadas em estilo

### Fase 4 - Integration (2 semanas)
- [ ] Design Kits (cores + fontes)
- [ ] Exportação (CSS, Figma, JSON)
- [ ] Coleções de usuário
- [ ] Compartilhamento público

### Fase 5 - Polish (1-2 semanas)
- [ ] Performance optimization
- [ ] i18n completo
- [ ] Analytics
- [ ] Documentação

---

## 📊 Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Tempo de carregamento de fonte | < 500ms |
| Precisão do identificador | > 80% |
| Uso do gerador de pares | 30% dos usuários |
| Design kits criados/mês | 100+ |
| NPS da feature | > 40 |

---

## 🔗 Integrações Externas

### Google Fonts API

```javascript
// lib/googleFonts.js
const GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';

export async function fetchGoogleFonts() {
  const response = await fetch(
    `${GOOGLE_FONTS_API}?key=${process.env.GOOGLE_FONTS_API_KEY}&sort=popularity`
  );
  const { items } = await response.json();
  
  return items.map(font => ({
    name: font.family,
    family: font.family,
    category: font.category,
    variants: font.variants,
    subsets: font.subsets,
    source: 'google',
    source_url: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}`
  }));
}
```

### Adobe Fonts (futuro)

```javascript
// Requer Adobe API key e conta
// Implementar quando houver demanda
```

---

## ✅ Checklist Pré-Launch

- [ ] Testes de carga em API de fontes
- [ ] Verificar licenças de fontes
- [ ] GDPR compliance para dados de usuário
- [ ] Backup strategy para design kits
- [ ] Monitoring com Vercel Analytics
- [ ] Error tracking com Sentry
- [ ] Documentação de API
- [ ] Onboarding flow para nova feature

---

*Documento criado em: Janeiro 2026*
*Última atualização: Janeiro 2026*
