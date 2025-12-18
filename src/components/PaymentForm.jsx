import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Sparkles, Gift } from 'lucide-react';
import JoyExplosion from './JoyExplosion';
import GoldenParticles from './GoldenParticles';

export default function PaymentForm({ onBackToLanding }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    goodBehavior: '',
    improveBehavior: '',
    wish: '',
    parentName: '',
    parentEmail: '',
    parentWhatsapp: '',
  });

  const [errors, setErrors] = useState({});
  const [completedFields, setCompletedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJoy, setShowJoy] = useState(false);
  const [showParticles, setShowParticles] = useState({});
  const [ageTooltip, setAgeTooltip] = useState('');
  const [ctaBoost, setCtaBoost] = useState(false);

  const steps = [
    {
      title: 'Dados da Criança',
      fields: ['childName', 'childAge', 'goodBehavior'],
      icon: '🎅',
    },
    {
      title: 'Mais Sobre Seu Filho',
      fields: ['improveBehavior', 'wish'],
      icon: '⭐',
    },
    {
      title: 'Seus Dados',
      fields: ['parentName', 'parentEmail', 'parentWhatsapp'],
      icon: '👨',
    },
    {
      title: 'Pagamento',
      fields: [],
      icon: '💳',
    },
  ];

  const visibleSteps = steps.slice(0, 3);

  const allFields = [
    {
      id: 'childName',
      label: '✨ Quem é a Estrela do Natal este ano?',
      type: 'text',
      placeholder: 'Ex: O pequeno Arthur',
      required: true,
      step: 0,
    },
    {
      id: 'childAge',
      label: '🎂 Qual a idade do nosso protagonista?',
      type: 'number',
      placeholder: 'Ex: 7',
      required: true,
      step: 0,
      min: 3,
      max: 18,
    },
    {
      id: 'goodBehavior',
      label: '📜 Qual foi a Grande Conquista dele(a) em 2025?',
      type: 'textarea',
      placeholder: 'Ex: Aprendeu a ler, foi melhor amigo da turma...',
      required: true,
      step: 0,
    },
    {
      id: 'improveBehavior',
      label: '🌱 O que podemos mencionar para melhorar? (Opcional)',
      type: 'textarea',
      placeholder: 'Ex: Comer mais vegetais, guardar os brinquedos...',
      required: false,
      step: 1,
    },
    {
      id: 'wish',
      label: '⭐ Do que ele(a) mais gosta de brincar ou fazer?',
      type: 'text',
      placeholder: 'Ex: Dinossauros, Futebol, Dançar, Jogar Roblox...',
      required: true,
      step: 1,
    },
    {
      id: 'parentName',
      label: '👤 Como devemos chamá-lo(a)?',
      type: 'text',
      placeholder: 'Ex: João Silva',
      required: true,
      step: 2,
    },
    {
      id: 'parentEmail',
      label: '📧 Onde enviamos a confirmação?',
      type: 'email',
      placeholder: 'seu@email.com',
      required: true,
      step: 2,
    },
    {
      id: 'parentWhatsapp',
      label: '📱 WhatsApp para receber a magia',
      type: 'tel',
      placeholder: '(11) 99999-9999',
      required: true,
      step: 2,
    },
  ];

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    setErrors(prev => ({ ...prev, [fieldId]: '' }));

    if (value && value.toString().trim()) {
      const wasEmpty = !completedFields[fieldId];
      setCompletedFields(prev => ({ ...prev, [fieldId]: true }));
      
      if (wasEmpty) {
        setShowParticles(prev => ({ ...prev, [fieldId]: true }));
        setTimeout(() => setShowParticles(prev => ({ ...prev, [fieldId]: false })), 1000);
      }
    }

    if (fieldId === 'childAge' && value) {
      setAgeTooltip(`${value} anos? Que idade fantástica! 🌟`);
      setTimeout(() => setAgeTooltip(''), 3000);
    }
  };

  const validateCurrentStep = () => {
    const fieldsInStep = allFields.filter(f => f.step === currentStep && f.required);
    const newErrors = {};

    fieldsInStep.forEach(field => {
      if (!formData[field.id] || !formData[field.id].toString().trim()) {
        newErrors[field.id] = `${field.label} é obrigatório`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    setShowJoy(true);
    setTimeout(() => {
      setShowJoy(false);
      // Se estiver na última etapa visível (Seus Dados), vá direto para pagamento
      setCurrentStep(prev => (prev === 2 ? 3 : prev + 1));
    }, 800);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBackClick = () => {
    if (onBackToLanding) {
      onBackToLanding();
    }
    setTimeout(() => navigate('/'), 600);
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      // TODO: Integrar link de pagamento do Checkout Guru
      // Por enquanto, salvar dados e redirecionar
      const PAYMENT_LINK = 'https://checkout.guru/link-aqui'; // SUBSTITUIR com link real
      
      // Salvar dados no localStorage para recuperar após pagamento
      localStorage.setItem('natal_order', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));

      // Redirecionar para o link de pagamento
      window.location.href = PAYMENT_LINK;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      // Em desenvolvimento, segue para fluxo de sucesso para não travar UX
      navigate('/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepSafeIndex = Math.min(currentStep, visibleSteps.length - 1);
  const stepsFieldsCount = steps[currentStep].fields.length;
  const stepsFieldsCompleted = steps[currentStep].fields.filter(f => completedFields[f]).length;
  const baseProgress = 90;
  const stepProgress = stepsFieldsCount ? baseProgress + ((stepsFieldsCompleted / stepsFieldsCount) * (100 - baseProgress)) : baseProgress;
  const maxInteractiveProgress = 95;
  const visualProgress = Math.min(stepProgress, maxInteractiveProgress);
  const progressPercentage = ctaBoost ? 100 : visualProgress;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const triggerCtaBoost = () => {
    setCtaBoost(true);
    setTimeout(() => setCtaBoost(false), 1200);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#1a0a0a] via-[#2a0a0a] to-[#0a0a0a]"
    >

      <JoyExplosion trigger={showJoy} onComplete={() => {}} />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Compact Magical Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between px-4 py-3 bg-[#2a0a0a] rounded-full border border-yellow-400/40 shadow-lg"
          style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              🎅
            </motion.span>
            <span className="text-sm font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">Fábrica de Sonhos</span>
          </div>
          <span className="text-xs text-yellow-200/70">Etapa {currentStepSafeIndex + 1}/3</span>
        </motion.div>

        {/* Elegant Integrated Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-yellow-200 font-semibold text-sm">Status: 90% Completo! Falta pouco. 🔒</span>
            <span className="text-yellow-100/80 text-sm font-semibold">{Math.round(progressPercentage)}%</span>
          </div>
          
          {/* Progress bar with pulsing golden glow */}
          <div className="relative h-3 bg-black/30 rounded-full overflow-hidden border border-yellow-500/60">
            <motion.div
              initial={{ width: `${baseProgress}%` }}
              animate={{ 
                width: `${progressPercentage}%`,
                boxShadow: [
                  '0 0 12px rgba(255, 215, 0, 0.6)',
                  '0 0 28px rgba(255, 165, 0, 0.85)',
                  '0 0 12px rgba(255, 215, 0, 0.6)',
                ],
              }}
              transition={{ 
                width: { duration: 0.5 },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
              className="h-full bg-gradient-to-r from-[#ffd700] via-[#ffb347] to-[#ff8c00] relative"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>
          </div>

          {/* Elegant integrated step dots */}
          <div className="flex justify-center gap-3 mt-4">
            {visibleSteps.map((step, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === currentStepSafeIndex ? [1, 1.2, 1] : 1,
                  opacity: i <= currentStepSafeIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.5, scale: { duration: 1, repeat: Infinity } }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  i === currentStepSafeIndex
                    ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                    : i < currentStepSafeIndex
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                <span className="text-base leading-none">{step.icon}</span>
                {i === currentStepSafeIndex && <span className="hidden sm:inline">{step.title}</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2a0a0a] rounded-3xl p-8 border border-[#FFD700]/20 shadow-md"
            style={{ boxShadow: 'none' }}
          >
            {/* Campos do Step Atual */}
            {currentStep < 3 && (
              <div className="space-y-6">
                {allFields
                  .filter(field => field.step === currentStep)
                  .map((field, idx) => (
                    <motion.div key={field.id} variants={fieldVariants} className="relative">
                      <label className="block text-[#FFEDA6] font-semibold mb-3 flex items-center justify-between">
                        <span className="text-lg">{field.label}</span>
                        {completedFields[field.id] && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                              ⭐
                            </motion.div>
                          </motion.div>
                        )}
                      </label>

                      {field.type === 'textarea' ? (
                        <motion.textarea
                          whileFocus={{ 
                            scale: 1.01
                          }}
                          value={formData[field.id]}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className={`w-full px-5 py-4 bg-[#3D1F1F] border rounded-2xl focus:outline-none transition-all duration-300 text-white text-base placeholder-white/40 resize-none font-medium ${
                            errors[field.id]
                              ? 'border-red-500 bg-red-950/30'
                              : completedFields[field.id]
                              ? 'border-[#FFD700] bg-[#3D1F1F]'
                              : 'border-[#555] focus:border-[#FFD700] focus:shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                          }`}
                          style={{ 
                            boxShadow: errors[field.id] 
                              ? '0 0 10px rgba(255, 107, 107, 0.3)'
                              : completedFields[field.id]
                              ? '0 0 15px rgba(255, 215, 0, 0.3)'
                              : 'none',
                          }}
                        />
                      ) : (
                        <div className="relative">
                          <motion.input
                            whileFocus={{ 
                              scale: 1.02,
                              boxShadow: '0 0 0px rgba(255, 215, 0, 0), 0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.1)'
                            }}
                            type={field.type}
                            value={formData[field.id]}
                            onChange={e => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            min={field.min}
                            max={field.max}
                            className={`w-full px-5 py-4 bg-[#3D1F1F] border rounded-2xl focus:outline-none transition-all duration-300 text-white text-base placeholder-white/40 font-medium ${
                              errors[field.id]
                                ? 'border-red-500 bg-red-950/30'
                                : completedFields[field.id]
                                ? 'border-[#FFD700] bg-[#3D1F1F]'
                                : 'border-[#555] focus:border-[#FFD700] focus:shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                            }`}
                            style={{ 
                              boxShadow: errors[field.id] 
                                ? '0 0 20px rgba(255, 107, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : completedFields[field.id]
                                ? '0 0 30px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            }}
                          />
                          {field.id === 'childAge' && ageTooltip && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-14 left-0 bg-[#FFD700] text-black px-5 py-3 rounded-2xl text-sm font-bold shadow-sm border border-yellow-300/50"
                              style={{ boxShadow: 'none' }}
                            >
                              {ageTooltip}
                              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-yellow-400 transform rotate-45" />
                            </motion.div>
                          )}
                        </div>
                      )}

                      {errors[field.id] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-noel-red text-sm mt-2 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors[field.id]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 3 && (
              <motion.div variants={fieldVariants} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2a0a0a] rounded-3xl p-8 border border-[#FFD700]/20 shadow-md"
                  style={{ boxShadow: 'none' }}
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent mb-6">✨ Resumo Mágico do Pedido</h3>
                  <div className="space-y-4 text-white/90 text-base mb-8">
                    <motion.div 
                      className="flex justify-between items-center pb-3 border-b border-yellow-400/30"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-yellow-200">🎅 Nome da criança:</span>
                      <span className="font-bold text-lg text-yellow-100">{formData.childName}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center pb-3 border-b border-yellow-400/30"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-yellow-200">🎂 Idade:</span>
                      <span className="font-bold text-lg text-yellow-100">{formData.childAge} anos</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center pb-3 border-b border-yellow-400/30"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-yellow-200">⭐ Paixões e hobbies:</span>
                      <span className="font-bold text-lg text-yellow-100 text-right max-w-xs">{formData.wish}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center pb-3 border-b border-yellow-400/30"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-yellow-200">📧 Seu e-mail:</span>
                      <span className="font-bold text-lg text-yellow-100 text-right max-w-xs">{formData.parentEmail}</span>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="border-t-2 border-yellow-400/40 pt-6 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Investimento em Magia:</span>
                      <motion.span 
                        className="text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        R$ 29,90
                      </motion.span>
                    </div>
                    <p className="text-sm text-yellow-200/60 mt-2">Vídeo personalizado entregue em 5 minutos por WhatsApp</p>
                  </motion.div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { triggerCtaBoost(); handleSubmit(); }}
                  disabled={isSubmitting}
                  className="w-full py-6 bg-gradient-to-r from-[#ffd700] via-[#ffb347] to-[#ff8c00] text-black font-black text-lg rounded-2xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-yellow-300/40 shadow-md"
                  style={{ boxShadow: 'none' }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⚙️
                      </motion.div>
                      Criando Magia...
                    </>
                  ) : (
                    <>
                      <Gift className="w-6 h-6" />
                      Criar Vídeo do Papai Noel
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-yellow-200/60">
                  🔒 Pagamento 100% seguro | Entrega instantânea por WhatsApp
                </p>
              </motion.div>
            )}

            {/* Single Irresistible Magic Button */}
            <div className="mt-10">
              {currentStep < 3 && (
                <motion.button
                  whileHover={stepProgress === 100 ? { scale: 1.08, y: -4 } : {}}
                  whileTap={stepProgress === 100 ? { scale: 0.95 } : {}}

                  onClick={() => { triggerCtaBoost(); handleNextStep(); }}
                  disabled={stepProgress < 100}
                  className={`w-full py-7 px-6 rounded-3xl font-black text-lg sm:text-xl transition relative overflow-hidden border-3 ${
                    stepProgress === 100
                      ? 'bg-gradient-to-r from-[#ffd700] via-[#ffb347] to-[#ff8c00] text-black cursor-pointer shadow-md border-yellow-200/40'
                      : 'bg-[#2a0a0a] text-white/40 cursor-not-allowed border-[#333]'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-center leading-tight">
                    {formData.childName?.trim()
                      ? `✨ GERAR O VÍDEO EMOCIONANTE PARA ${formData.childName.trim().toUpperCase()}`
                      : '✨ GERAR O VÍDEO EMOCIONANTE PARA MEU FILHO'}
                  </span>
                </motion.button>
              )}
              
              {/* Small back link only if not first step */}
              {currentStep > 0 && currentStep < 3 && (
                <motion.button
                  whileHover={{ opacity: 1, x: -2 }}
                  onClick={handlePrevStep}
                  className="w-full mt-4 py-3 text-sm font-bold text-yellow-300/70 hover:text-yellow-200 transition flex items-center justify-center gap-2"
                >
                  ← Voltar à Etapa Anterior
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
