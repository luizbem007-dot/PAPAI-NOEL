import { createClient } from '@supabase/supabase-js';

// Usar apenas variáveis públicas (ANON KEY)
// A SECRET KEY nunca deve estar no frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials missing! Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Salvar dados do formulário no Supabase
 * @param {Object} formData - Dados do formulário
 * @returns {Promise<boolean>} - true se salvou com sucesso
 */
export async function saveLeadToSupabase(formData) {
  try {
    console.log('💾 Salvando dados no Supabase...');

    // Validar dados antes de enviar
    if (!formData.childName || !formData.parentEmail) {
      throw new Error('Campos obrigatórios faltando');
    }

    // Sanitizar dados
    const sanitizedData = {
      child_name: formData.childName.trim().substring(0, 100),
      child_age: parseInt(formData.childAge),
      good_behavior: formData.goodBehavior.trim().substring(0, 500),
      wish: formData.wish.trim().substring(0, 200),
      parent_name: formData.parentName.trim().substring(0, 100),
      parent_email: formData.parentEmail.trim().toLowerCase(),
      parent_whatsapp: formData.parentWhatsapp.trim().substring(0, 20),
      status: 'pending',
      ip_address: null, // Será preenchido pelo Supabase via RLS
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Inserir na tabela 'leads'
    const { data, error } = await supabase
      .from('leads')
      .insert([sanitizedData])
      .select();

    if (error) {
      console.error('❌ Erro ao salvar no Supabase:', error);
      return false;
    }

    console.log('✅ Dados salvos com sucesso!', data);
    return true;

  } catch (err) {
    console.error('❌ Erro ao processar dados:', err.message);
    return false;
  }
}

/**
 * Obter leads (apenas administrador via RLS)
 */
export async function getLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Erro ao buscar leads:', err);
    return null;
  }
}

/**
 * Deletar um lead (apenas admin)
 */
export async function deleteLead(leadId) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);

    if (error) throw error;
    console.log('✅ Lead deletado');
    return true;
  } catch (err) {
    console.error('❌ Erro ao deletar lead:', err);
    return false;
  }
}
