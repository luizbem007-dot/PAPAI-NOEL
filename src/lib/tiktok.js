// TikTok Events API - Server-side tracking
const TIKTOK_ACCESS_TOKEN = import.meta.env.VITE_TIKTOK_ACCESS_TOKEN;
const TIKTOK_PIXEL_ID = 'D5304N3C77UACHDFU990';

export async function trackTikTokPurchase(formData) {
  // Se não tiver token configurado, apenas loga e continua
  if (!TIKTOK_ACCESS_TOKEN) {
    console.warn('⚠️ TikTok Access Token não configurado - evento não enviado');
    return false;
  }

  try {
    const eventData = {
      event_source: 'web',
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: 'SubmitForm', // Evento de conversão
          event_time: Math.floor(Date.now() / 1000), // Unix timestamp
          user: {
            email: formData.parentEmail,
            phone: formData.parentWhatsapp?.replace(/\D/g, ''), // Remove formatação
          },
          properties: {
            content_type: 'product',
            content_name: 'Vídeo Papai Noel Personalizado',
            currency: 'BRL',
            value: 29.90, // Valor aproximado do produto
          },
        },
      ],
    };

    console.log('📤 Enviando evento para TikTok Events API...');

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (response.ok && result.code === 0) {
      console.log('✅ Evento TikTok enviado com sucesso!', result);
      return true;
    } else {
      console.error('❌ Erro ao enviar evento TikTok:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro na chamada TikTok Events API:', error);
    return false;
  }
}
