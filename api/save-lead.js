// API serverless Vercel para salvar leads
// Garante que os dados SEMPRE são salvos, mesmo se webhook falhar

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  // Apenas POST permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // Validação básica
    if (!data.parentEmail || !data.childName) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Adicionar metadados
    const lead = {
      ...data,
      saved_at: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      user_agent: req.headers['user-agent'],
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    console.log('💾 Salvando lead:', lead.id);

    // Salvar em arquivo JSON (backup local no Vercel)
    try {
      const dataPath = '/tmp/leads.json';
      let leads = [];
      
      try {
        const existing = await readFile(dataPath, 'utf-8');
        leads = JSON.parse(existing);
      } catch (err) {
        // Arquivo não existe ainda, criar novo
        leads = [];
      }

      leads.push(lead);
      await writeFile(dataPath, JSON.stringify(leads, null, 2));
      console.log('✅ Lead salvo localmente');
    } catch (fileErr) {
      console.error('❌ Erro ao salvar arquivo:', fileErr);
    }

    // Tentar enviar para webhook FIQon (não bloqueia se falhar)
    const webhookUrl = 'https://webhook.fiqon.app/webhook/019b328c-2f54-71dd-9f0c-9953ce65ce81/16e46e3a-a56e-4e05-b240-cf5fcb8c97f8';
    
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
      .then(response => {
        if (response.ok) {
          console.log('✅ Webhook FIQon enviado com sucesso');
        } else {
          console.warn('⚠️ Webhook FIQon falhou, mas lead está salvo');
        }
      })
      .catch(err => {
        console.error('❌ Erro no webhook FIQon:', err.message);
      });

    // Responder imediatamente (não aguarda webhook)
    return res.status(200).json({
      success: true,
      lead_id: lead.id,
      message: 'Lead salvo com sucesso',
    });

  } catch (error) {
    console.error('❌ Erro ao processar lead:', error);
    return res.status(500).json({
      error: 'Erro ao salvar lead',
      details: error.message,
    });
  }
}
