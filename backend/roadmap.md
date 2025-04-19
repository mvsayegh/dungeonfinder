# 🧭 Roadmap Backend - Sistema de RPG

## 📦 Etapa 1 – Fortalecer a Base

- [ ] Implementar validação com **Zod** ou **Joi** para entradas (cadastro, update, etc.)
- [ ] Middleware de validação separado por recurso (User, GameMaster, GameTable)
- [ ] Habilitar segurança com `helmet`, `cors`, `express-rate-limit`
- [ ] Forçar senha forte e validar antes de salvar usuário
- [ ] Middleware de logs (requisições, erros, tempo de resposta)

---

## 🔔 Etapa 2 – Sistema de Notificações

- [ ] Criar model `Notification`
- [ ] Endpoint para listar, marcar como lida, deletar notificações
- [ ] Integrar com **Socket.io** para notificações em tempo real
- [ ] Middleware de envio automático de notificação em eventos-chave

---

## ⭐ Etapa 3 – Avaliação de GMs

- [ ] Criar model `Review`
- [ ] Endpoint para adicionar/consultar reviews
- [ ] Cálculo da média e exibição no perfil do Game Master

---

## 🛡️ Etapa 4 – Painel e Controles de Admin

- [ ] Criar rotas protegidas `/admin` (listar usuários, GMs, mesas)
- [ ] Permitir ações de **banir**, **editar**, **apagar** usuários ou mesas
- [ ] Campos no User:
  - `isBanned`
  - `isSuspended`
  - `adminNote`

---

## 🔐 Etapa 5 – Controle de Acesso e Permissões

- [ ] Criar middlewares por papel:
  - `isAdmin`
  - `isGameMaster`
  - `isOwnerOfGameTable`
- [ ] Proteger rotas sensíveis:
  - Apenas o criador da mesa pode editar/deletar
  - Apenas admins podem acessar `/admin`

---

## 🌍 Etapa 6 – Internacionalização e Produção

- [ ] Padrão de mensagens de erro com `error_code` e `message`
- [ ] Adicionar `.env` com variáveis para:
  - JWT_SECRET
  - MONGO_URI
  - SMTP config
- [ ] Criar Dockerfile e docker-compose
- [ ] Habilitar Sentry, Loggly ou outra ferramenta de monitoramento
- [ ] Testar e documentar API com Swagger ou Postman
