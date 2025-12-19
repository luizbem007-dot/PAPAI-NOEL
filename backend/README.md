# Backend - API para Salvar Leads

## Como Hospedar na Hostinger

### 1. Acesse sua Hostinger
- Entre no painel: https://hpanel.hostinger.com
- Vá em "Node.js App"

### 2. Configure Node.js App
```
Node Version: 18.x ou superior
Application Root: /backend
Application URL: api.papainoeloficial.shop (ou subdomínio)
Application Startup File: server.js
```

### 3. Upload dos Arquivos
Envie via FTP/SFTP:
```
/backend/
  server.js
  package.json
  leads.json (será criado automaticamente)
```

### 4. Instalar Dependências
No terminal da Hostinger:
```bash
cd backend
npm install
```

### 5. Iniciar Aplicação
```bash
npm start
```

### 6. Atualizar Frontend
Mude a URL no PaymentForm.jsx:
```javascript
// De:
const response = await fetch('/api/save-lead', {

// Para:
const response = await fetch('https://api.papainoeloficial.shop/api/save-lead', {
```

## Endpoints Disponíveis

- POST /api/save-lead - Salva novo lead
- GET /api/get-leads - Lista todos os leads
- GET /health - Verifica se API está online

## Acesso aos Dados

Depois de hospedado:
```
https://api.papainoeloficial.shop/api/get-leads
```

## Alternativa Mais Simples

Se não quiser hospedar backend, use apenas o webhook FIQon:
- Dashboard: https://fiqon.app
- Os dados já estão chegando lá
