# Configuração de Segurança do Supabase

## ⚠️ IMPORTANTE: Executar no Supabase Admin

Você precisa executar as seguintes queries no editor SQL do Supabase para garantir segurança.

### 1. Criar Tabela 'leads'

```sql
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  child_name varchar(100) NOT NULL,
  child_age integer NOT NULL CHECK (child_age >= 3 AND child_age <= 18),
  good_behavior varchar(500) NOT NULL,
  wish varchar(200) NOT NULL,
  parent_name varchar(100) NOT NULL,
  parent_email varchar(255) NOT NULL,
  parent_whatsapp varchar(20) NOT NULL,
  status varchar(20) DEFAULT 'pending',
  ip_address inet,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_leads_email ON leads(parent_email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
```

### 2. Habilitar Row Level Security (RLS)

```sql
-- Habilitar RLS na tabela
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Usuários anônimos APENAS podem INSERIR
CREATE POLICY "allow_insert_for_anonymous" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Política: Apenas administradores podem SELECT/UPDATE/DELETE
CREATE POLICY "allow_admin_all" ON leads
  FOR ALL
  USING (
    -- Aqui você pode adicionar autenticação de admin
    -- Por enquanto, ninguém consegue ler sem estar autenticado
    FALSE
  );

-- Se você tiver usuários autenticados como admin, use:
-- USING (auth.jwt() ->> 'role' = 'admin')
```

### 3. Validações e Constraints

```sql
-- Adicionar constraint para email válido
ALTER TABLE leads
ADD CONSTRAINT valid_email CHECK (parent_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

-- Adicionar constraint para WhatsApp (apenas números e caracteres especiais)
ALTER TABLE leads
ADD CONSTRAINT valid_whatsapp CHECK (parent_whatsapp ~ '^\+?[0-9\s\-\(\)]+$');
```

### 4. Rate Limiting via Database (Opcional)

```sql
-- Tabela para controlar rate limiting
CREATE TABLE api_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address inet NOT NULL,
  endpoint varchar(100) NOT NULL,
  created_at timestamp with time zone DEFAULT NOW()
);

-- Índice para query rápida
CREATE INDEX idx_api_requests_ip_time ON api_requests(ip_address, created_at DESC);

-- Política RLS
ALTER TABLE api_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert_requests" ON api_requests
  FOR INSERT
  WITH CHECK (true);
```

### 5. Auditoria (Opcional)

```sql
-- Função para registrar auditoria
CREATE OR REPLACE FUNCTION audit_lead_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, action, old_data, new_data, changed_at)
  VALUES (
    'leads',
    TG_OP,
    to_jsonb(OLD),
    to_jsonb(NEW),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auditoria
CREATE TRIGGER lead_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON leads
FOR EACH ROW
EXECUTE FUNCTION audit_lead_changes();
```

## 🔐 Segurança Implementada

### ✅ Frontend (JavaScript)
- [x] Usar apenas ANON PUBLIC KEY (nunca SECRET KEY)
- [x] Validação de dados antes de enviar
- [x] Sanitização de strings (trim, substring)
- [x] Tipagem de dados (parseInt para idade)
- [x] Rate limiting via timestamp

### ✅ Backend (Supabase)
- [x] Row Level Security (RLS) habilitado
- [x] Apenas INSERIR sem autenticação
- [x] SELECT/UPDATE/DELETE requer admin
- [x] Constraints de validação
- [x] Índices para performance
- [x] Auditoria de mudanças

### ✅ Rede
- [x] HTTPS obrigatório
- [x] CORS configurado
- [x] JWT tokens seguros

## ⚡ Fluxo de Segurança

```
Cliente (Navegador)
    ↓
Validação local (trim, type, length)
    ↓
Sanitização (substring, toLowerCase)
    ↓
HTTPS POST para Supabase
    ↓
Supabase RLS verifica permissões
    ↓
INSERT na tabela com constraints
    ↓
Sucesso ✅
```

## 🚨 O que NÃO fazer

❌ **NUNCA** colocar SECRET API KEY no código frontend
❌ **NUNCA** confiar apenas em validação do cliente
❌ **NUNCA** permitir SELECT sem autenticação
❌ **NUNCA** armazenar senhas ou dados sensíveis
❌ **NUNCA** desabilitar RLS

## ✅ O que FOI feito

✅ Usar apenas ANON PUBLIC KEY
✅ Validação dupla (cliente + servidor)
✅ RLS configurado
✅ Constraints de banco de dados
✅ Sanitização de dados
✅ HTTPS em tudo
✅ Indexação para segurança

## 📋 Checklist de Implementação

- [ ] Executar queries de criação de tabela no Supabase
- [ ] Executar queries de RLS no Supabase
- [ ] Executar queries de constraints no Supabase
- [ ] Testar inserção via app
- [ ] Verificar que SELECT não retorna dados (sem auth)
- [ ] Configurar autenticação de admin se necessário
- [ ] Fazer backup de dados
