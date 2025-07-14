# Guia de Instalação e Execução - Dungeon Finder Frontend

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend do Dungeon Finder rodando (porta 5000)

## Instalação

1. **Clone ou extraia o projeto:**
   ```bash
   cd dungeon-finder-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Edite o arquivo `.env` na raiz do projeto:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Dungeon Finder
   VITE_APP_VERSION=1.0.0
   ```

## Execução

### Modo Desenvolvimento

Para executar em modo de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### Modo Produção

Para compilar e executar em modo de produção:

```bash
# Compilar para produção
npm run build

# Servir arquivos estáticos (opcional)
npm run preview
```

Os arquivos compilados estarão na pasta `dist/`.

## Estrutura do Projeto

```
dungeon-finder-frontend/
├── public/                 # Arquivos públicos estáticos
├── src/
│   ├── assets/            # Imagens, estilos, etc.
│   ├── components/        # Componentes reutilizáveis
│   ├── layouts/           # Layouts da aplicação
│   ├── router/            # Configuração de rotas
│   ├── stores/            # Gerenciamento de estado (Pinia)
│   ├── utils/             # Utilitários e configurações da API
│   ├── views/             # Páginas da aplicação
│   │   ├── auth/          # Páginas de autenticação
│   │   └── admin/         # Páginas do painel administrativo
│   ├── App.vue            # Componente raiz
│   └── main.ts            # Ponto de entrada
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── tailwind.config.js     # Configuração do Tailwind CSS
├── vite.config.ts         # Configuração do Vite
└── README.md              # Documentação do projeto
```

## Funcionalidades

### Landing Page
- Página inicial responsiva
- Seções: Hero, Recursos, Como Funciona, Sobre
- Design moderno com animações
- Integração com Tailwind CSS e Vuetify

### Sistema de Autenticação
- Login e registro de usuários
- Validação de formulários
- Gerenciamento de estado com Pinia
- Rotas protegidas

### Painel Administrativo
- Dashboard com estatísticas
- Gerenciamento de usuários
- Gerenciamento de mesas de jogo
- Interface responsiva e intuitiva

## Tecnologias Utilizadas

- **Vue.js 3** - Framework progressivo
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Vue Router** - Roteamento
- **Pinia** - Gerenciamento de estado
- **Vuetify** - Componentes UI Material Design
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Compilação para produção
npm run build

# Compilação sem verificação de tipos
npm run build-only

# Preview da versão de produção
npm run preview

# Verificação de tipos
npm run type-check

# Linting
npm run lint

# Formatação de código
npm run format
```

## Integração com Backend

O frontend está configurado para se comunicar com o backend através da API REST. As principais integrações incluem:

- **Autenticação:** Login, registro e gerenciamento de sessão
- **Usuários:** CRUD completo de usuários
- **Mesas de Jogo:** Gerenciamento de mesas de RPG
- **WebSocket:** Comunicação em tempo real (configurado)

## Configuração da API

O arquivo `src/utils/api.ts` contém toda a configuração da API, incluindo:

- Interceptors para autenticação automática
- Tratamento de erros
- Tipagem TypeScript para respostas
- Serviços organizados por funcionalidade

## Deployment

Para fazer deploy da aplicação:

1. **Compile o projeto:**
   ```bash
   npm run build
   ```

2. **Sirva os arquivos da pasta `dist/`** usando qualquer servidor web estático (Nginx, Apache, Vercel, Netlify, etc.)

3. **Configure as variáveis de ambiente** para apontar para o backend de produção.

## Suporte

Para dúvidas ou problemas:

1. Verifique se o backend está rodando na porta correta
2. Confirme se as variáveis de ambiente estão configuradas
3. Verifique o console do navegador para erros
4. Consulte a documentação das tecnologias utilizadas

## Próximos Passos

- Implementar testes unitários e de integração
- Adicionar mais funcionalidades ao painel administrativo
- Implementar notificações em tempo real
- Adicionar suporte a PWA (Progressive Web App)
- Implementar sistema de temas (modo escuro/claro)

