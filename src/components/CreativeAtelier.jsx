import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import JoyExplosion from './JoyExplosion';

export default function CreativeAtelier({ onSubmit }) {
  const [formData, setFormData] = useState({
    recipientName: '',
    senderName: '',
    theme: 'winter',
    message: '',
  });

  const [completedFields, setCompletedFields] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedSection, setSelectedSection] = useState(0);

  const fields = [
    {
      id: 'recipientName',
      label: 'Nome de quem receberá a magia',
      placeholder: 'Ex: Ana',
      type: 'text',
    },
    {
      id: 'senderName',
      label: 'Seu nome',
      placeholder: 'Ex: João',
      type: 'text',
    },
    {
      id: 'theme',
      label: 'Tema da Memória',
      type: 'select',
      options: [
        { value: 'winter', label: '❄️ Inverno Mágico' },
        { value: 'wonder', label: '✨ Maravilha' },
        { value: 'joy', label: '🎄 Alegria Festiva' },
        { value: 'dreams', label: '💫 Sonhos' },
      ],
    },
    {
      id: 'message',
      label: 'Sua Mensagem Especial',
      placeholder: 'Compartilhe um pensamento, desejo ou memória...',
      type: 'textarea',
    },
  ];

  const progress = (Object.keys(completedFields).length / fields.length) * 100;

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    if (value && value.toString().trim()) {
      setCompletedFields((prev) => ({ ...prev, [fieldId]: true }));

      // Trigger celebração para seções importantes
      if (
        (fieldId === 'recipientName' && Object.keys(completedFields).length === 0) ||
        (fieldId === 'message' && Object.keys(completedFields).length === 3)
      ) {
        setShowCelebration(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-noel py-20 px-4"
    >
      <JoyExplosion trigger={showCelebration} onComplete={() => setShowCelebration(false)} />

      <div className="max-w-2xl mx-auto">
        {/* Cabeçalho */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-noel-gold" size={40} />
            Ateliê Criativo
            <Sparkles className="text-noel-gold" size={40} />
          </h2>
          <p className="text-noel-cyan/80 text-lg">
            Construa sua obra-prima passo a passo
          </p>
        </motion.div>

        {/* Barra de Progresso - Caminho da Criação */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-noel-gold font-semibold">O Caminho da Criação</span>
            <span className="text-noel-cyan text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-3 bg-noel-glass rounded-full overflow-hidden backdrop-blur-xl">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-gold shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
              }}
            />
          </div>
        </motion.div>

        {/* Formulário em seções */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              variants={itemVariants}
              onHoverStart={() => setSelectedSection(index)}
              className="relative group"
            >
              {/* Card de vidro */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-noel-cyan/20 to-noel-gold/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative bg-noel-glass backdrop-blur-xl rounded-lg p-6 border border-noel-cyan/30 hover:border-noel-cyan/60 transition">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <label className="block text-noel-cyan font-semibold mb-3 flex items-center gap-2">
                      {field.label}
                      {completedFields[field.id] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle size={20} className="text-noel-gold" />
                        </motion.div>
                      )}
                    </label>

                    {field.type === 'text' && (
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        value={formData[field.id]}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-noel-dark/50 border border-noel-cyan/20 rounded-lg px-4 py-3 text-white placeholder-noel-cyan/40 focus:outline-none focus:border-noel-cyan/80 focus:ring-2 focus:ring-noel-cyan/20 transition"
                      />
                    )}

                    {field.type === 'select' && (
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={formData[field.id]}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value)
                        }
                        className="w-full bg-noel-dark/50 border border-noel-cyan/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-noel-cyan/80 focus:ring-2 focus:ring-noel-cyan/20 transition"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </motion.select>
                    )}

                    {field.type === 'textarea' && (
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        value={formData[field.id]}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full bg-noel-dark/50 border border-noel-cyan/20 rounded-lg px-4 py-3 text-white placeholder-noel-cyan/40 focus:outline-none focus:border-noel-cyan/80 focus:ring-2 focus:ring-noel-cyan/20 transition resize-none"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Botão de submissão */}
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <motion.button
              type="submit"
              disabled={progress < 100}
              whileHover={progress === 100 ? { scale: 1.05 } : {}}
              whileTap={progress === 100 ? { scale: 0.95 } : {}}
              className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                progress === 100
                  ? 'bg-noel-red text-white shadow-lg hover:shadow-2xl cursor-pointer'
                  : 'bg-noel-glass text-noel-cyan/50 cursor-not-allowed'
              }`}
              style={
                progress === 100
                  ? {
                      boxShadow: '0 0 30px rgba(255, 7, 58, 0.5)',
                    }
                  : {}
              }
            >
              {progress === 100
                ? 'FINALIZAR E CRIAR MAGIA ✨'
                : `Complete os campos (${Math.round(progress)}%)`}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
