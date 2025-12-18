// Configuração de exemplo para Stripe Integration
// Este arquivo deve ser usado no seu servidor backend (Express, Node.js, etc)

/*
INSTALAÇÃO:
npm install stripe express cors dotenv

ARQUIVO: server.js (seu backend)

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para criar sessão de checkout
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { childName, childAge, wish, parentName, parentEmail, parentWhatsapp, goodBehavior } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Vídeo Personalizado do Papai Noel - ${childName}`,
              description: `Vídeo exclusivo para ${childName}, ${childAge} anos`,
              images: ['https://example.com/noel-preview.jpg'],
            },
            unit_amount: 1990, // R$ 19,90 em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      
      // Metadata para o webhook
      metadata: {
        childName,
        childAge,
        wish,
        parentName,
        parentEmail,
        parentWhatsapp,
        goodBehavior,
      },
      
      // Informações de contato pré-preenchidas
      customer_email: parentEmail,
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook para processar pagamento bem-sucedido
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { childName, parentWhatsapp, parentName } = session.metadata;

      // Aqui você deve integrar com a API de vídeo da IA
      // e depois enviar para WhatsApp via Twilio ou similar
      
      console.log(`Pagamento recebido para ${childName}`);
      console.log(`Enviando vídeo para ${parentWhatsapp}`);
      
      // Exemplo de envio via Twilio:
      // await sendVideoViaWhatsApp(parentWhatsapp, videoUrl);
    }

    res.json({received: true});
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

// VARIÁVEIS DE AMBIENTE (.env):
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
*/

export const STRIPE_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  // Endpoints da API
  CREATE_CHECKOUT: '/api/create-checkout-session',
  WEBHOOK: '/webhook',
};

// URLs de sucesso/cancelamento
export const PAYMENT_URLS = {
  SUCCESS: '/success',
  CANCEL: '/cancel',
};
