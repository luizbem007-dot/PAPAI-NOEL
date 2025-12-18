import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JoyExplosion from './JoyExplosion';
import Confetti from './Confetti';

export default function SubmissionCelebration({ active = false, onComplete = () => {} }) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (active) {
      // Pequeno delay para criar suspense
      const timeout = setTimeout(() => setTrigger(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const handleButtonClick = () => {
    setTimeout(onComplete, 600);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="fixed inset-0 bg-gradient-noel flex items-center justify-center z-50 p-4"
    >
      <JoyExplosion trigger={trigger} onComplete={() => {}} />
      <Confetti active={trigger} intensity={100} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={
          active ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
        }
        transition={{ duration: 0.6, type: 'spring' }}
        className="max-w-2xl w-full"
      >
        {/* Card de confirmação com vidro fosco */}
        <div className="relative bg-noel-glass backdrop-blur-xl rounded-2xl p-12 border border-noel-cyan/30 text-center overflow-hidden">
          {/* Efeito de brilho ao fundo */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 60px rgba(0, 255, 255, 0.2)',
                '0 0 120px rgba(255, 215, 0, 0.3)',
                '0 0 60px rgba(0, 255, 255, 0.2)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative z-10 w-24 h-24 mx-auto mb-6"
          >
            <div className="w-full h-full bg-gradient-gold rounded-full flex items-center justify-center text-4xl animate-pulse-gentle">
              ✨
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-10 text-4xl font-bold bg-gradient-to-r from-noel-cyan to-noel-gold bg-clip-text text-transparent mb-4"
          >
            Sua Obra-Prima Está Pronta!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 text-noel-cyan/80 text-lg mb-8 leading-relaxed"
          >
            Estamos preparando sua criação com o máximo cuidado. 
            <br />
            <span className="text-noel-gold font-semibold">A magia está acontecendo agora...</span>
          </motion.p>

          {/* Progresso de "preparação" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
            className="relative z-10 mb-8"
          >
            <div className="h-2 bg-noel-glass rounded-full overflow-hidden border border-noel-cyan/30">
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: '100%' } : { width: 0 }}
                transition={{ delay: 1, duration: 2.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-gold"
              />
            </div>
          </motion.div>

          {/* Selo de criação completa */}
          <motion.div
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={
              active ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0 }
            }
            transition={{
              delay: 3.5,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative z-10 mb-8"
          >
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-noel-gold/50 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full flex items-center justify-center text-6xl">
                🏆
              </div>
            </div>
          </motion.div>

          {/* Botão de próximo passo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
            className="relative z-10"
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleButtonClick}
              className="px-8 py-3 bg-noel-cyan text-noel-dark font-bold rounded-lg hover:shadow-2xl transition"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              }}
            >
              Próximo Passo
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
