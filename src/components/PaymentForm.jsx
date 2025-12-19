import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Sparkles, CheckCircle } from 'lucide-react';
import JoyExplosion from './JoyExplosion';

export default function PaymentForm({ onBackToLanding }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    goodBehavior: '',
    wish: '',
    parentName: '',
    parentEmail: '',
    parentWhatsapp: '',
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJoy, setShowJoy] = useState(false);

  // Only two steps: child data and parent data
  const steps = [
    {
      title: 'Dados da Criança',
      fields: ['childName', 'childAge', 'goodBehavior', 'wish'],
      icon: '🎅',
    },
    {
      title: 'Seus Dados',
      fields: ['parentName', 'parentEmail', 'parentWhatsapp'],
      icon: '👨',
    },
  ];

  const allFields = [
    { id: 'childName', label: '✨ Quem é a Estrela do Natal este ano?', type: 'text', placeholder: 'Ex: O pequeno Arthur', required: true, step: 0 },
    { id: 'childAge', label: '🎂 Qual a idade do nosso protagonista?', type: 'number', placeholder: 'Ex: 7', min: 3, max: 18, required: true, step: 0 },
    { id: 'goodBehavior', label: '📜 Qual foi a Grande Conquista dele(a) em 2025?', type: 'textarea', placeholder: 'Ex: Aprendeu a ler, foi melhor amigo da turma...', required: true, step: 0 },
    { id: 'wish', label: '⭐ Do que ele(a) mais gosta de brincar ou fazer?', type: 'text', placeholder: 'Ex: Dinossauros, Futebol, Dançar, Jogar Roblox...', required: true, step: 0 },
    { id: 'parentName', label: '👤 Como devemos chamá-lo(a)?', type: 'text', placeholder: 'Ex: João Silva', required: true, step: 1 },
    { id: 'parentEmail', label: '📧 Onde enviamos a confirmação?', type: 'email', placeholder: 'seu@email.com', required: true, step: 1 },
    { id: 'parentWhatsapp', label: '📱 WhatsApp para receber a magia', type: 'tel', placeholder: '(11) 99999-9999', required: true, step: 1 },
  ];

  const handleFieldChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validateCurrentStep = () => {
    const needed = steps[currentStep].fields;
    const newErrors = {};
    needed.forEach(field => {
      if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = 'Campo obrigatório';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setShowJoy(true);
    setTimeout(() => setShowJoy(false), 800);
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleBackClick = () => {
    if (onBackToLanding) onBackToLanding();
    setTimeout(() => navigate('/'), 600);
  };

  const handleFinalSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);

    const checkoutUrl = 'https://go.papainoeloficial.shop/pay/mensagem-do-papai-noel';
    const emailParam = formData.parentEmail ? `?email=${encodeURIComponent(formData.parentEmail)}` : '';

    // Preparar dados para enviar
    const payloadData = {
      childName: formData.childName.trim(),
      childAge: String(formData.childAge).trim(),
      goodBehavior: formData.goodBehavior.trim(),
      wish: formData.wish.trim(),
      parentName: formData.parentName.trim(),
      parentEmail: formData.parentEmail.trim(),
      parentWhatsapp: formData.parentWhatsapp.trim(),
      data_pedido: new Date().toISOString(),
      status: 'Aguardando Pagamento',
      timestamp: new Date().getTime(),
    };

    console.log('✅ Iniciando envio para API própria (mais seguro)');
    console.log('📋 Dados a enviar:', JSON.stringify(payloadData, null, 2));

    let dataSaved = false;

    try {
      // Enviar para API própria no Vercel (muito mais confiável)
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadData),
      });

      const result = await response.json();
      
      if (response.ok) {
        dataSaved = true;
        console.log('✅ Dados salvos com sucesso!');
        console.log('📊 Lead ID:', result.lead_id);
      } else {
        console.error('❌ Erro ao salvar:', result.error);
      }
    } catch (err) {
      console.error('❌ Erro na API:', err.message);
      
      // Fallback 1: Tentar webhook FIQon direto
      console.warn('⚠️ Tentando webhook FIQon como fallback...');
      try {
        const webhookUrl = 'https://webhook.fiqon.app/webhook/019b328c-2f54-71dd-9f0c-9953ce65ce81/16e46e3a-a56e-4e05-b240-cf5fcb8c97f8';
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadData),
          mode: 'cors',
        });

        if (webhookResponse.ok) {
          dataSaved = true;
          console.log('✅ Webhook FIQon enviado com sucesso (fallback)');
        }
      } catch (webhookErr) {
        console.error('❌ Webhook FIQon também falhou');
        
        // Fallback 2: sendBeacon como último recurso
        if (navigator.sendBeacon) {
          const webhookUrl = 'https://webhook.fiqon.app/webhook/019b328c-2f54-71dd-9f0c-9953ce65ce81/16e46e3a-a56e-4e05-b240-cf5fcb8c97f8';
          const blob = new Blob([JSON.stringify(payloadData)], { type: 'application/json' });
          const beaconSent = navigator.sendBeacon(webhookUrl, blob);
          
          if (beaconSent) {
            console.log('✅ sendBeacon enviado (último fallback)');
            dataSaved = true;
          }
        }
      }
    }

    // Redirect para checkout
    console.log('🔄 Redirecionando para checkout...');
    console.log('📊 Status final:', dataSaved ? '✅ Dados salvos' : '⚠️ ATENÇÃO: Dados podem não ter sido salvos');
    window.location.href = `${checkoutUrl}${emailParam}`;
  };

  const currentFields = allFields.filter(f => f.step === currentStep);
  const allRequired = steps[currentStep].fields;
  const completedCount = allRequired.filter(f => formData[f]?.toString().trim()).length;
  const progress = Math.round((completedCount / allRequired.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a0a0a] via-[#2a0a0a] to-[#0a0a0a] text-white"
    >
      <JoyExplosion trigger={showJoy} onComplete={() => {}} />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-[#2a0a0a] border border-yellow-500/30 rounded-full px-5 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-yellow-200">Fábrica de Sonhos</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-yellow-200/80">
            <span>Etapa {currentStep + 1}/{steps.length}</span>
            <span className="w-32 h-2 bg-black/40 rounded-full overflow-hidden block">
              <span className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 block" style={{ width: `${progress}%` }} />
            </span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="bg-[#2a0a0a] border border-yellow-500/20 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden>{steps[currentStep].icon}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-300/70">Passo {currentStep + 1}</p>
              <h2 className="text-2xl font-black text-yellow-100">{steps[currentStep].title}</h2>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {currentFields.map(field => (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm font-semibold text-yellow-100 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-300" />
                    {field.label}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={formData[field.id]}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 rounded-2xl bg-[#3d1f1f] border text-white placeholder-white/40 focus:outline-none transition ${
                        errors[field.id]
                          ? 'border-red-500 shadow-[0_0_12px_rgba(248,113,113,0.45)]'
                          : 'border-[#555] focus:border-[#FFD700] focus:shadow-[0_0_14px_rgba(255,215,0,0.4)]'
                      }`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id]}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      className={`w-full px-4 py-3 rounded-2xl bg-[#3d1f1f] border text-white placeholder-white/40 focus:outline-none transition ${
                        errors[field.id]
                          ? 'border-red-500 shadow-[0_0_12px_rgba(248,113,113,0.45)]'
                          : 'border-[#555] focus:border-[#FFD700] focus:shadow-[0_0_14px_rgba(255,215,0,0.4)]'
                      }`}
                    />
                  )}

                  {errors[field.id] && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-4">
            {currentStep === steps.length - 1 ? (
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-[#ffd700] via-[#ffb347] to-[#ff8c00] text-black shadow-[0_0_30px_rgba(255,215,0,0.35)] border border-yellow-300/50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processando...' : '✨ GERAR O VÍDEO EMOCIONANTE'}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full py-5 rounded-2xl font-black text-lg bg-[#2a0a0a] text-yellow-100 border border-yellow-500/40 hover:border-yellow-300 hover:text-white"
              >
                Continuar
              </motion.button>
            )}

            <div className="flex justify-between text-sm text-yellow-200/80">
              <button onClick={handleBackClick} className="hover:text-yellow-100">← Voltar</button>
              {currentStep > 0 && (
                <button onClick={handlePrev} className="hover:text-yellow-100">Voltar etapa</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
