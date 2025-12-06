# EBODA - Configuração Supabase

## Schema do Banco de Dados

Execute os seguintes comandos SQL no Supabase SQL Editor para criar as tabelas necessárias:

```sql
-- Create palettes table
CREATE TABLE IF NOT EXISTS palettes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_palettes_user_id ON palettes(user_id);
CREATE INDEX IF NOT EXISTS idx_palettes_created_at ON palettes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (modify in production)
CREATE POLICY "Allow all operations for now" ON palettes
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Variáveis de Ambiente

As seguintes variáveis já estão configuradas no arquivo `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=https://jwpjueydurslhiiezzdx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cGp1ZXlkdXJzbGhpaWV6emR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjEwMDksImV4cCI6MjA3OTIzNzAwOX0.tS4D6cAmo47z2pfpeSPV_GszMET_A0w5vS9FglTjU_o
```

## Próximos Passos

1. Acesse [Supabase Dashboard](https://jwpjueydurslhiiezzdx.supabase.co)
2. Vá para SQL Editor
3. Execute o SQL acima
4. Teste a aplicação salvando uma paleta

## OAuth Configuration (Para Produção)

### Google OAuth
1. Vá para [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione existente
3. Ative Google+ API
4. Crie credenciais OAuth 2.0
5. Configure URLs autorizadas:
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
6. Copie Client ID e atualize em `.env`: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

### GitHub OAuth
1. Vá para [GitHub Settings > Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Configure:
   - Application name: EBODA
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/callback`
4. Copie Client ID e atualize em `.env`: `NEXT_PUBLIC_GITHUB_CLIENT_ID`
5. Gere e copie Client Secret

### Integrar com Supabase
1. No Supabase Dashboard, vá para Authentication > Providers
2. Ative Google e GitHub
3. Cole os Client IDs e Secrets
4. Salve as configurações
