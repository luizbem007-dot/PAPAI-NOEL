# 🎄 Noel.IA - Guia de Integração e Deployment

## 📋 Visão Geral do Projeto

**Noel.IA** é uma plataforma de duas fases para criar vídeos personalizados do Papai Noel. A experiência é dividida em:

### **Fase 1: O Palco da Magia** 
A Landing Page impactante que vende o produto através de:
- Vídeo hero do Papai Noel
- Benefícios e diferenciais
- Prova social (testemunhos)
- 3 passos simples para entender o processo
- CTA irresistível

### **Fase 2: A Oficina dos Elfos**
Formulário responsivo com:
- Coleta de dados em 3 etapas (Criança → Comportamentos → Dados Pais)
- Etapa de pagamento com Stripe
- Redirect automático ao checkout
- Webhook para processar vídeo após pagamento

---

## 🚀 Stack Tecnológico

### Frontend
- **React 19** - Framework UI
- **Framer Motion** - Animações fluidas
- **Tailwind CSS** - Estilização responsiva
- **Lucide React** - Ícones
- **Vite** - Build tool

### Backend (Requerido)
- **Node.js/Express** - Servidor
- **Stripe** - Processamento de pagamento
- **Twilio** (Opcional) - Envio via WhatsApp
- **API de IA** - Geração de vídeo (Claude, RunwayML, etc)

---

## 🔧 Configuração e Instalação

### 1. Clone e Instale Dependências

```bash
cd /Users/luiz/Documents/NATAL
npm install
```

### 2. Configure Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_seu_chave_publica

# Backend (para desenvolvimento)
VITE_API_URL=http://localhost:5000
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

---

## 💳 Integração com Stripe

### Passo 1: Criar Conta Stripe

1. Acesse [stripe.com](https://stripe.com)
2. Crie uma conta
3. Vá para **Dashboard > API Keys**
4. Copie sua **Publishable Key** (começa com `pk_test_`)

### Passo 2: Configurar Backend

Você precisa criar um servidor backend para:
1. Aceitar dados do formulário
2. Criar sessão de checkout Stripe
3. Receber webhooks de pagamento
4. Chamar API de geração de vídeo
5. Enviar vídeo via WhatsApp

**Exemplo de implementação rápida com Express:**

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Criar sessão de checkout
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { childName, parentEmail, parentWhatsapp, goodBehavior } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Vídeo Papai Noel - ${childName}`,
            },
            unit_amount: 1990, // R$ 19,90
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: parentEmail,
      metadata: {
        childName,
        parentEmail,
        parentWhatsapp,
        goodBehavior,
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook para processar pagamento
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
      const { childName, parentWhatsapp } = session.metadata;

      // 1. Chamar API de IA para gerar vídeo
      // const videoUrl = await generateVideoWithAI(formData);

      // 2. Enviar via WhatsApp
      // await sendVideoViaWhatsApp(parentWhatsapp, videoUrl);

      console.log(`✅ Vídeo processado para ${childName}`);
    }

    res.json({received: true});
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('🚀 Server running');
});
```

### Passo 3: Obtém Webhook Secret

1. No Dashboard Stripe, vá para **Developers > Webhooks**
2. Adicione novo endpoint: `http://seu-servidor.com/webhook`
3. Selecione o evento: `checkout.session.completed`
4. Copie o **Signing Secret** (começa com `whsec_`)

---

## 📱 Integração com WhatsApp

### Opção 1: Twilio (Recomendado)

```bash
npm install twilio
```

```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendVideoViaWhatsApp(phoneNumber, videoUrl) {
  await client.messages.create({
    from: 'whatsapp:+' + process.env.TWILIO_PHONE,
    to: 'whatsapp:+' + phoneNumber,
    mediaUrl: videoUrl,
    body: 'Aqui está o vídeo mágico do Papai Noel para seu filho! 🎅✨',
  });
}
```

### Opção 2: WhatsApp Business API

Integre diretamente com a WhatsApp Business Platform para envio de mídia.

---

## 🤖 Integração com IA para Geração de Vídeo

### Opção 1: RunwayML

```javascript
const Runway = require('@runway/sdk');

async function generateVideo(formData) {
  const runway = new Runway({
    apiKey: process.env.RUNWAY_API_KEY,
  });

  const task = await runway.createTask({
    taskName: 'text-to-video',
    model: 'gen-3-alpha',
    input: {
      prompt: `Um vídeo do Papai Noel falando com ${formData.childName}, 
               ${formData.childAge} anos, elogiando seu comportamento...`,
    },
  });

  return task.output.video_url;
}
```

### Opção 2: HeyGen

```javascript
async function generateVideoWithHeyGen(formData) {
  const response = await fetch('https://api.heygen.com/v1/video.generate', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.HEYGEN_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatarId: 'papai-noel-avatar-id',
      scriptText: generateScript(formData),
      voiceId: 'pt-BR-voice',
    }),
  });
  return response.json();
}
```

---

## 📊 Fluxo de Dados

```
User Landing Page
      ↓
   Click CTA
      ↓
Payment Form (3 steps)
      ↓
  Stripe Checkout
      ↓
Payment Success
      ↓
Webhook Triggered (Backend)
      ↓
Generate Video (IA API)
      ↓
Send via WhatsApp
      ↓
User Receives Video ✨
```

---

## 🎨 Customização

### Cores
Todas as cores estão em `tailwind.config.js`:
- `noel-dark`: #020010
- `noel-darker`: #11001F
- `noel-red`: #FF073A
- `noel-cyan`: #00FFFF
- `noel-gold`: #FFD700

### Preço
Para mudar o preço, edite em `components/PaymentForm.jsx`:
```javascript
unit_amount: 1990, // em centavos (R$ 19,90)
```

### Conteúdo
- Landing Page: [components/LandingPage.jsx](src/components/LandingPage.jsx)
- Formulário: [components/PaymentForm.jsx](src/components/PaymentForm.jsx)

---

## ✅ Checklist de Deployment

- [ ] Configurar variáveis de ambiente
- [ ] Criar conta Stripe e obter chaves
- [ ] Implementar backend com Express
- [ ] Configurar webhook Stripe
- [ ] Integrar API de IA (HeyGen, RunwayML, etc)
- [ ] Integrar Twilio para WhatsApp
- [ ] Testar fluxo completo em staging
- [ ] Deploy no Vercel, Netlify, AWS, etc
- [ ] Configurar SSL/HTTPS
- [ ] Monitorar logs e erros

---

## 🐛 Troubleshooting

### Problema: CORS Error
**Solução:** Configure CORS no backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### Problema: Webhook não dispara
**Solução:** Use Stripe CLI para testar:
```bash
stripe listen --forward-to localhost:5000/webhook
```

### Problema: Vídeo não chega no WhatsApp
**Solução:** Verifique se o número tem formato correto com código país (55 para Brasil)

---

## 📞 Suporte

Para dúvidas sobre integração:
- Stripe Docs: https://stripe.com/docs
- Twilio Docs: https://www.twilio.com/docs
- HeyGen Docs: https://docs.heygen.com
- RunwayML Docs: https://docs.runway.com

---

## 📄 Licença

Este projeto é confidencial e de uso exclusivo para **Noel.IA**.

**Desenvolvido com ✨ e magia de Natal**
