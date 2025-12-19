// API para visualizar leads salvos
import { readFile } from 'fs/promises';

export default async function handler(req, res) {
  // Apenas GET permitido
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const dataPath = '/tmp/leads.json';
    
    try {
      const data = await readFile(dataPath, 'utf-8');
      const leads = JSON.parse(data);
      
      return res.status(200).json({
        success: true,
        total: leads.length,
        leads: leads,
      });
    } catch (err) {
      // Arquivo não existe ou está vazio
      return res.status(200).json({
        success: true,
        total: 0,
        leads: [],
        message: 'Nenhum lead salvo ainda',
      });
    }
  } catch (error) {
    console.error('❌ Erro ao ler leads:', error);
    return res.status(500).json({
      error: 'Erro ao carregar leads',
      details: error.message,
    });
  }
}
