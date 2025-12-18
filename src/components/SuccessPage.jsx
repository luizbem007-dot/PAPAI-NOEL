import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Gift, ArrowRight } from 'lucide-react';
import Confetti from './Confetti';

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-noel flex items-center justify-center px-4 py-12"
    >
      <Confetti active={showConfetti} intensity={100} />

      <div className="max-w-2xl w-full">
        {/* Ícone de sucesso */}
        <motion.div
          variants={itemVariants}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: 3 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                  '0 0 60px rgba(0, 255, 255, 0.6)',
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-gradient-gold flex items-center justify-center"
            >
              <CheckCircle className="w-20 h-20 text-noel-dark" />
            </motion.div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-noel-cyan to-noel-gold bg-clip-text text-transparent">
            Pagamento Confirmado! 🎉
          </span>
        </motion.h1>

        {/* Descrição */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="text-xl text-noel-cyan/90 mb-4">
            Obrigado por criar magia de Natal com a gente!
          </p>
          <p className="text-noel-cyan/70">
            Estamos gerando o vídeo personalizado do Papai Noel... ✨
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="space-y-4 mb-12">
          <div className="flex items-center gap-4 text-noel-cyan">
            <div className="w-10 h-10 rounded-full bg-noel-gold/30 flex items-center justify-center text-lg">
              ✅
            </div>
            <div>
              <p className="font-semibold text-white">Pagamento Processado</p>
              <p className="text-sm text-noel-cyan/60">Transação concluída com sucesso</p>
            </div>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4 text-noel-cyan"
          >
            <div className="w-10 h-10 rounded-full bg-noel-cyan/20 flex items-center justify-center text-lg">
              ⚙️
            </div>
            <div>
              <p className="font-semibold text-white">Gerando Vídeo</p>
              <p className="text-sm text-noel-cyan/60">Isso pode levar alguns minutos...</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 text-noel-cyan/40">
            <div className="w-10 h-10 rounded-full bg-noel-darker/50 flex items-center justify-center text-lg">
              📱
            </div>
            <div>
              <p className="font-semibold text-white/60">Enviando no WhatsApp</p>
              <p className="text-sm text-noel-cyan/40">Você receberá em poucos minutos</p>
            </div>
          </div>
        </motion.div>

        {/* Informações */}
        <motion.div
          variants={itemVariants}
          className="bg-noel-glass backdrop-blur-xl rounded-2xl p-8 border border-noel-cyan/20 mb-8"
        >
          <h3 className="text-lg font-bold text-noel-gold mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            O Que Esperar
          </h3>

          <div className="space-y-4 text-noel-cyan/80">
            <div className="flex gap-4">
              <span className="text-noel-gold font-bold min-w-12">1️⃣</span>
              <div>
                <p className="font-semibold text-white">Preparação (2-3 min)</p>
                <p className="text-sm">Nossa IA está criando o vídeo exclusivo</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-noel-gold font-bold min-w-12">2️⃣</span>
              <div>
                <p className="font-semibold text-white">Processamento (2-3 min)</p>
                <p className="text-sm">Sincronizando voz e animação</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-noel-gold font-bold min-w-12">3️⃣</span>
              <div>
                <p className="font-semibold text-white">Entrega (Instantânea)</p>
                <p className="text-sm">Vídeo chega no seu WhatsApp</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dica */}
        <motion.div
          variants={itemVariants}
          className="bg-noel-darker/50 rounded-xl p-6 border border-noel-gold/20 mb-8"
        >
          <p className="text-noel-cyan/80 text-center">
            💡 <span className="text-noel-gold font-semibold">Dica:</span> Mantenha o WhatsApp aberto para receber o vídeo em primeira mão!
          </p>
        </motion.div>

        {/* Botões de ação */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row justify-center"
        >
          <motion.a
            href="https://wa.me/+5511999999999"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-noel-cyan text-noel-dark rounded-lg font-bold hover:shadow-lg transition inline-flex items-center justify-center gap-2"
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)',
            }}
          >
            💬 Abrir WhatsApp
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-noel-gold text-noel-gold rounded-lg font-bold hover:bg-noel-gold/10 transition inline-flex items-center justify-center gap-2"
          >
            🏠 Voltar ao Início
          </motion.a>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={itemVariants}
          className="text-center text-noel-cyan/60 text-sm mt-10"
        >
          Obrigado por escolher Noel.IA! 
          <br />
          <span className="text-noel-gold font-semibold">Que a magia do Natal seja real para seu filho ✨</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
