import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Gerar partículas de forma procedural
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    duration: 2 + Math.random() * 1,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const particleVariants = {
    initial: { x: 0, y: 0, opacity: 0, scale: 0 },
    animate: (custom) => ({
      x: custom.x,
      y: custom.y,
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        delay: custom.delay,
        duration: custom.duration,
        ease: 'easeInOut',
      },
    }),
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-gradient-noel flex items-center justify-center z-50"
    >
      {/* Partículas de luz */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            custom={particle}
            variants={particleVariants}
            initial="initial"
            animate="animate"
            className="absolute w-1 h-1 bg-noel-cyan rounded-full"
            style={{
              boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Logo e Texto */}
      <div className="relative z-10 text-center">
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-noel-cyan to-noel-gold bg-clip-text text-transparent mb-4">
            Noel.IA
          </h1>
          <p className="text-noel-gold text-lg font-light tracking-widest">
            Revision Aurora
          </p>
        </motion.div>
      </div>

      {/* Efeito de brilho ao fundo */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 60px rgba(0, 255, 255, 0.2)',
            '0 0 120px rgba(0, 255, 255, 0.5)',
            '0 0 60px rgba(0, 255, 255, 0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />
    </motion.div>
  );
}
