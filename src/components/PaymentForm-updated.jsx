import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Sparkles, Gift } from 'lucide-react';
import JoyExplosion from './JoyExplosion';

export default function PaymentForm({ onBackToLanding, stripePublicKey }) {
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

  const steps = [
    {
      title: 'Dados da Criança',
      fields: ['childName', 'childAge', 'goodBehavior'],
      icon: '👧',
    },
    {
      title: 'Mais Sobre Seu Filho',
      fields: ['improveBehavior', 'wish'],
      icon: '🎁',
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

  const allFields = [
    {
      id: 'childName',
      label: 'Nome da Criança',
      type: 'text',
      placeholder: 'Ex: Ana Clara',
      required: true,
      step: 0,
    },
    {
      id: 'childAge',
      label: 'Idade',
      type: 'number',
      placeholder: 'Ex: 7',
      required: true,
      step: 0,
      min: 3,
      max: 18,
    },
    {
      id: 'goodBehavior',
      label: 'Comportamentos para Elogiar',
      type: 'textarea',
      placeholder: 'Ex: Ajuda em casa, obediente, criativa',
      required: true,
      step: 0,
    },
    {
      id: 'improveBehavior',
      label: 'Comportamentos para Melhorar (Opcional)',
      type: 'textarea',
      placeholder: 'Ex: Comer vegetais, guardar brinquedos',
      required: false,
      step: 1,
    },
    {
      id: 'wish',
      label: 'Presente Desejado',
      type: 'text',
      placeholder: 'Ex: Bicicleta, Videogame, Boneca',
      required: true,
      step: 1,
    },
    {
      id: 'parentName',
      label: 'Seu Nome',
      type: 'text',
      placeholder: 'Ex: João Silva',
      required: true,
      step: 2,
    },
    {
      id: 'parentEmail',
      label: 'Email',
      type: 'email',
      placeholder: 'seu@email.com',
      required: true,
      step: 2,
    },
    {
      id: 'parentWhatsapp',
      label: 'WhatsApp (com DDD)',
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
      setCompletedFields(prev => ({ ...prev, [fieldId]: true }));
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
    if (validateCurrentStep()) {
      setShowJoy(true);
      setTimeout(() => {
        setShowJoy(false);
        setCurrentStep(prev => prev + 1);
      }, 800);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBackClick = () => {
    onBackToLanding();
    setTimeout(() => navigate('/'), 600);
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      // Redirecionar para Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Simular sucesso em desenvolvimento
        navigate('/success');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      // Em desenvolvimento, simular sucesso
      navigate('/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsFieldsCount = steps[currentStep].fields.length;
  const stepsFieldsCompleted = steps[currentStep].fields.filter(
    f => completedFields[f]
  ).length;
  const stepProgress = (stepsFieldsCompleted / stepsFieldsCount) * 100 || 0;

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
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-noel py-12 px-4 sm:px-6 lg:px-8"
    >
      <JoyExplosion trigger={showJoy} onComplete={() => {}} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎄
            </motion.div>
            <span className="bg-gradient-to-r from-noel-gold to-noel-cyan bg-clip-text text-transparent">
              A Oficina dos Elfos
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎄
            </motion.div>
          </h2>
          <p className="text-noel-cyan/80 text-lg">
            Prepare a magia personalizada para seu filho
          </p>
        </motion.div>

        {/* Progress Bar Global */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-2">
            <span className="text-noel-gold font-semibold text-sm">Progresso: Etapa {currentStep + 1} de {steps.length}</span>
            <span className="text-noel-cyan/60 text-sm">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-noel-glass rounded-full overflow-hidden border border-noel-cyan/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-gold"
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-6 gap-2">
            {steps.map((step, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => i < currentStep && setCurrentStep(i)}
                disabled={i > currentStep}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  i === currentStep
                    ? 'bg-noel-red text-white'
                    : i < currentStep
                    ? 'bg-noel-glass text-noel-gold border border-noel-gold/50 cursor-pointer'
                    : 'bg-noel-glass/50 text-noel-cyan/50 cursor-not-allowed'
                }`}
              >
                <span className="text-sm md:text-base flex items-center justify-center gap-2">
                  {step.icon} {step.title}
                </span>
              </motion.button>
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
            className="bg-noel-glass backdrop-blur-xl rounded-2xl p-8 border border-noel-cyan/20"
          >
            {/* Campos do Step Atual */}
            {currentStep < 3 && (
              <div className="space-y-6">
                {allFields
                  .filter(field => field.step === currentStep)
                  .map((field, idx) => (
                    <motion.div key={field.id} variants={fieldVariants}>
                      <label className="block text-noel-cyan font-semibold mb-3 flex items-center justify-between">
                        <span>{field.label}{!field.required && ' (Opcional)'}</span>
                        {completedFields[field.id] && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <CheckCircle className="text-noel-gold w-5 h-5" />
                          </motion.div>
                        )}
                      </label>

                      {field.type === 'textarea' ? (
                        <motion.textarea
                          whileFocus={{ scale: 1.01 }}
                          value={formData[field.id]}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className={`w-full px-4 py-3 bg-noel-dark/50 border rounded-lg focus:outline-none focus:ring-2 transition text-white placeholder-noel-cyan/40 resize-none ${
                            errors[field.id]
                              ? 'border-noel-red/50 focus:ring-noel-red/50'
                              : 'border-noel-cyan/20 focus:border-noel-cyan/80 focus:ring-noel-cyan/20'
                          }`}
                        />
                      ) : (
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          className={`w-full px-4 py-3 bg-noel-dark/50 border rounded-lg focus:outline-none focus:ring-2 transition text-white placeholder-noel-cyan/40 ${
                            errors[field.id]
                              ? 'border-noel-red/50 focus:ring-noel-red/50'
                              : 'border-noel-cyan/20 focus:border-noel-cyan/80 focus:ring-noel-cyan/20'
                          }`}
                        />
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
              <motion.div variants={fieldVariants} className="space-y-6">
                <div className="bg-noel-darker/50 rounded-lg p-6 border border-noel-gold/30">
                  <h3 className="text-lg font-bold text-noel-gold mb-4">Resumo do Pedido</h3>
                  <div className="space-y-3 text-noel-cyan/80 text-sm mb-6">
                    <div className="flex justify-between">
                      <span>Nome da criança:</span>
                      <span className="font-semibold text-noel-cyan">{formData.childName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Idade:</span>
                      <span className="font-semibold text-noel-cyan">{formData.childAge} anos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Presente desejado:</span>
                      <span className="font-semibold text-noel-cyan">{formData.wish}</span>
                    </div>
                  </div>

                  <div className="border-t border-noel-cyan/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-noel-gold to-noel-cyan bg-clip-text text-transparent">
                        R$ 19,90
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 7, 58, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-noel-red text-white font-bold text-lg rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⚙️
                      </motion.div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5" />
                      Receber Vídeo por R$ 19,90
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-noel-cyan/60">
                  🔒 Pagamento seguro via Stripe • Entrega em 5 minutos por WhatsApp
                </p>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={currentStep === 0 ? handleBackClick : handlePrevStep}
                className="flex-1 py-3 border-2 border-noel-cyan/50 text-noel-cyan rounded-lg font-semibold hover:border-noel-cyan transition"
              >
                {currentStep === 0 ? '← Voltar' : '← Anterior'}
              </motion.button>

              {currentStep < 3 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextStep}
                  disabled={stepProgress < 100}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    stepProgress === 100
                      ? 'bg-noel-cyan text-noel-dark hover:shadow-lg'
                      : 'bg-noel-glass text-noel-cyan/50 cursor-not-allowed'
                  }`}
                >
                  Próximo → ({Math.round(stepProgress)}%)
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
