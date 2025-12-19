const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Arquivo para armazenar leads
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Inicializar arquivo se não existir
async function initLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

// Salvar lead
app.post('/api/save-lead', async (req, res) => {
  try {
    const data = req.body;

    // Validação
    if (!data.parentEmail || !data.childName) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Adicionar metadados
    const lead = {
      ...data,
      saved_at: new Date().toISOString(),
      ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      user_agent: req.headers['user-agent'] || 'unknown',
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Ler leads existentes
    const leadsData = await fs.readFile(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(leadsData);

    // Adicionar novo lead
    leads.push(lead);

    // Salvar
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

    console.log('✅ Lead salvo:', lead.id);

    // Enviar para webhook FIQon em background (não bloqueia resposta)
    const webhookUrl = 'https://webhook.fiqon.app/webhook/019b328c-2f54-71dd-9f0c-9953ce65ce81/16e46e3a-a56e-4e05-b240-cf5fcb8c97f8';
    
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
      .then(response => {
        if (response.ok) {
          console.log('✅ Webhook FIQon enviado');
        }
      })
      .catch(err => {
        console.error('❌ Erro webhook FIQon:', err.message);
      });

    // Responder imediatamente
    res.json({
      success: true,
      lead_id: lead.id,
      message: 'Lead salvo com sucesso',
    });

  } catch (error) {
    console.error('❌ Erro:', error);
    res.status(500).json({
      error: 'Erro ao salvar lead',
      details: error.message,
    });
  }
});

// Listar leads
app.get('/api/get-leads', async (req, res) => {
  try {
    const leadsData = await fs.readFile(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(leadsData);

    res.json({
      success: true,
      total: leads.length,
      leads: leads,
    });
  } catch (error) {
    console.error('❌ Erro:', error);
    res.json({
      success: true,
      total: 0,
      leads: [],
      message: 'Nenhum lead salvo ainda',
    });
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
async function start() {
  await initLeadsFile();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Acesse: http://localhost:${PORT}/api/get-leads`);
  });
}

start();
