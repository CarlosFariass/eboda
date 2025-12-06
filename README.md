# EBODA - Paleta de Cores Inovadora para Desenvolvedores 🎨

Uma ferramenta inovadora e clean de paleta de cores, voltada especialmente para desenvolvedores e profissionais UX. Com design dark/light mode, interface 3D e recursos avançados de IA.

## ✨ Funcionalidades Principais

### 🎯 Core Features
- **Loading Screen com FuzzyText**: Animação de boas-vindas com efeito fuzzy
- **Paleta 3D Interativa**: Grid de cores com efeito 3D e hover
- **Splash de Combinações**: Ao clicar em uma cor, veja cores complementares, análogas e tríades
- **Dark/Light Mode**: Alternância suave entre temas
- **Header Especial**: Design único com logo centralizado e borda atravessada

### 🤖 Geração com IA
- Upload de imagem de marca
- Extração automática de paleta de cores usando GPT-4o
- Análise inteligente de cores dominantes

### 💾 Exportação Múltipla
- **CSS**: Variáveis CSS (`:root`)
- **SCSS**: Variáveis Sass
- **JavaScript**: Export ES6
- **JSON**: Formato estruturado
- **Figma**: Preparado para integração

### 🔐 Autenticação (Mock)
- Login com Google (preparado para OAuth)
- Login com GitHub (preparado para OAuth)
- Proteção de features premium (salvar/exportar)

### 📊 Armazenamento
- Salvar paletas no Supabase
- Histórico de paletas por usuário
- Compartilhamento futuro

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14**: Framework React
- **React 18**: Biblioteca UI
- **Tailwind CSS**: Estilização
- **Shadcn/ui**: Componentes
- **Lucide React**: Ícones
- **next-themes**: Gerenciamento de temas

### Backend
- **Next.js API Routes**: Backend serverless
- **Supabase**: Banco de dados PostgreSQL
- **Emergent LLM Key**: Integração com OpenAI GPT-4o

### IA & Integrações
- **emergentintegrations**: SDK Python para LLMs
- **OpenAI GPT-4o**: Análise de imagem e geração de paletas
- **Figma API**: Exportação de tokens (preparado)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Yarn
- Python 3.11+ (para emergentintegrations)

### Instalação

```bash
# Instalar dependências Node
yarn install

# Instalar emergentintegrations (Python)
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
```

### Configuração

1. Configure as variáveis de ambiente no `.env`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_supabase

# Emergent LLM Key
EMERGENT_LLM_KEY=sua_chave_emergent

# Figma (opcional)
NEXT_PUBLIC_FIGMA_TOKEN=seu_token_figma

# OAuth (para produção)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=seu_github_client_id
```

2. Configure o banco de dados Supabase executando o SQL em `SUPABASE_SETUP.md`

### Executar

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
/app
├── app/
│   ├── api/[[...path]]/route.js  # API Backend
│   ├── page.js                    # Página principal
│   ├── layout.js                  # Layout raiz
│   └── globals.css                # Estilos globais
├── components/
│   ├── FuzzyText.jsx             # Componente de texto fuzzy
│   ├── LoadingScreen.jsx         # Tela de loading
│   ├── Header.jsx                # Header especial
│   ├── Footer.jsx                # Footer clean
│   ├── ColorCard.jsx             # Card de cor 3D
│   ├── ColorSplash.jsx           # Modal de combinações
│   ├── AuthModal.jsx             # Modal de autenticação
│   ├── ExportModal.jsx           # Modal de exportação
│   ├── AIGenerator.jsx           # Gerador com IA
│   └── ui/                       # Componentes Shadcn
├── lib/
│   ├── colors.js                 # Utilitários de cor
│   └── supabase.js               # Cliente Supabase
└── .env                          # Variáveis de ambiente
```

## 🎨 Funcionalidades Detalhadas

### Paleta de Cores
- **Grid 3D**: 8 cores em layout 2x4 (mobile) ou 4x2 (desktop)
- **Hover Effect**: Mostra código hex e RGB
- **Click Action**: Abre splash com combinações
- **Animações**: Transições suaves e efeitos 3D

### Combinações Automáticas
- **Cor Base**: A cor selecionada
- **Complementar**: Cor oposta no círculo cromático
- **Análogas**: 3 cores adjacentes
- **Tríade**: 3 cores equidistantes
- **Variações**: 5 tons da cor base
- **Exemplo de Uso**: Preview de landing page

### Geração com IA
1. Usuário faz upload de imagem
2. Imagem é convertida para base64
3. Enviada para GPT-4o via emergentintegrations
4. IA analisa e retorna 6-8 cores dominantes
5. Paleta é atualizada automaticamente

### Exportação
- **Formatos**: CSS, SCSS, JS, JSON
- **Nomenclatura**: Baseada no nome da paleta
- **Copy/Download**: Copiar para clipboard ou baixar arquivo
- **Apenas para usuários logados**

## 🔮 Próximos Passos (Roadmap)

- [ ] Implementar OAuth real (Google/GitHub)
- [ ] Integração completa com Figma API
- [ ] Sistema de favoritos
- [ ] Compartilhamento de paletas
- [ ] Biblioteca de paletas públicas
- [ ] Geração de gradientes
- [ ] Modo de acessibilidade (contraste)
- [ ] PWA (Progressive Web App)
- [ ] API pública para desenvolvedores

## 📝 Notas de Desenvolvimento

### Autenticação Mock
A autenticação atual é um mock. Para produção:
1. Configure OAuth no Google/GitHub
2. Integre com Supabase Auth
3. Implemente callbacks de autenticação
4. Atualize verificações de usuário

### Emergent LLM Key
A chave universal permite acesso a:
- OpenAI GPT-4o (texto e imagem)
- Anthropic Claude (texto)
- Google Gemini (texto)

### Supabase
O banco está configurado mas a tabela precisa ser criada manualmente. Ver `SUPABASE_SETUP.md`.

## 🙏 Créditos

Desenvolvido por [@CarlosFariass](https://github.com/CarlosFariass)

## 📄 Licença

MIT License - Todos os direitos reservados © 2025 EBODA
