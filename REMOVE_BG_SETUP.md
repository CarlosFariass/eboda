# Configuração Remove.bg API

## Como obter sua API Key gratuita

1. Acesse: https://www.remove.bg/api
2. Clique em **"Get API Key"**
3. Crie uma conta (pode usar Google/Facebook)
4. Após login, vá em **"API"** no menu
5. Copie sua **API Key**

## Plano Gratuito
- **50 imagens/mês** grátis
- Sem necessidade de cartão de crédito
- Qualidade HD
- Sem marca d'água

## Configurar no projeto

1. Abra o arquivo `.env` na raiz do projeto
2. Localize a linha:
   ```
   REMOVE_BG_API_KEY=your_api_key_here
   ```
3. Substitua `your_api_key_here` pela sua API key
4. Salve o arquivo
5. Reinicie o servidor de desenvolvimento

## Exemplo
```env
REMOVE_BG_API_KEY=abc123def456ghi789jkl
```

## Verificar se está funcionando

1. Acesse: http://localhost:3000/pt/tools/remove-background
2. Faça upload de uma imagem
3. Se aparecer erro "Serviço temporariamente indisponível", verifique se:
   - A API key está correta no `.env`
   - Você reiniciou o servidor após adicionar a key
   - Você ainda tem créditos disponíveis (50/mês)

## Monitorar uso

Acesse: https://www.remove.bg/dashboard/api
- Veja quantas imagens você processou
- Quantos créditos restam
- Histórico de uso

## Produção (Vercel)

No Vercel, adicione a variável de ambiente:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - Name: `REMOVE_BG_API_KEY`
   - Value: sua API key
3. Clique em **Save**
4. Faça um novo deploy
