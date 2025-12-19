# ⚠️ IMPORTANTE: Adicionar Variáveis de Ambiente no Vercel

## O Erro Ocorreu Porque:

As variáveis de ambiente do Supabase não estão configuradas no Vercel.

Essas variáveis existem no arquivo `.env.local` (local), mas precisam ser adicionadas no **Dashboard do Vercel** para funcionar em produção.

## ✅ Como Adicionar (5 minutos)

### PASSO 1: Acesse o Vercel Dashboard

```
https://vercel.com/dashboard/papai-noel
```

Ou:
1. Acesse: https://vercel.com
2. Clique no seu projeto "papai-noel"
3. Vá em "Settings"

### PASSO 2: Acesse Variáveis de Ambiente

No menu superior, procure por:
- **Settings** → **Environment Variables**

### PASSO 3: Adicione as 2 Variáveis

Clique em "Add New" e adicione:

**Variável 1:**
```
Name:  VITE_SUPABASE_URL
Value: https://iocyclnhhnajwfggxtuq.supabase.co
```

**Variável 2:**
```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvY3ljbG5oaG5handmZ2d4dHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzI4NzYsImV4cCI6MjA4MTc0ODg3Nn0.eIW-ZbboaTgUSFCw-tn6gAAstEpws8Zjm4S9uWSt8Xw
```

### PASSO 4: Salve as Alterações

Clique em "Save" em cada variável.

### PASSO 5: Aguarde Redeploy Automático

O Vercel vai automaticamente:
1. Detectar que as env vars foram adicionadas
2. Fazer novo deploy
3. Status mudará para "Ready"

## 🚀 Depois de Adicionar

1. **Aguarde 2-3 minutos** para o deploy completar
2. **Acesse:** https://papai-noel.vercel.app/checkout
3. **Teste:** Preencha e clique "GERAR VÍDEO"
4. **Verifique DevTools (F12):**
   - Procure por: `✅ Dados salvos com sucesso!`
   - Ou: `✅ Supabase conectado com sucesso`

## ❌ Se Ainda der Erro

### Verificar Deploy Status
1. Acesse: https://vercel.com/dashboard/papai-noel
2. Vá em "Deployments"
3. Procure pelo commit mais recente (b3d9698)
4. Deve estar com status "Ready"

### Verificar Variáveis
1. Settings → Environment Variables
2. Confirme que as 2 variáveis estão lá
3. Os valores estão completos (sem cortes)

### Forçar Novo Deploy
1. Settings → General
2. Procure por "Deployments"
3. Clique em "Redeploy" no commit mais recente

## 📋 Checklist

- [ ] Acesso Vercel Dashboard
- [ ] Fui em Settings → Environment Variables
- [ ] Adicionei VITE_SUPABASE_URL
- [ ] Adicionei VITE_SUPABASE_ANON_KEY
- [ ] Salvei as variáveis
- [ ] Aguardei 2-3 min para deploy
- [ ] Testei o site
- [ ] Funcionou! ✅

## 🎯 Resultado Final

Depois de adicionar as variáveis:
- ✅ Código vai compilar sem erros
- ✅ Supabase vai conectar
- ✅ Dados vão ser salvos no banco
- ✅ Site vai estar 100% funcional

---

**Importante:** Essas variáveis são PÚBLICAS (chave ANON), é seguro colocá-las no Vercel.

A SECRET KEY nunca deve ser colocada no frontend ou Vercel!
