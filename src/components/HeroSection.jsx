import React from 'react';
import { motion } from 'framer-motion';
import Orb from './Orb';
import ParallaxBackground from './ParallaxBackground';

export default function HeroSection({ onCTAClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const orbVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
    breathe: {
      boxShadow: [
        '0 0 10px rgba(0, 255, 255, 0.4)',
        '0 0 25px rgba(0, 255, 255, 0.8)',
        '0 0 10px rgba(0, 255, 255, 0.4)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <ParallaxBackground intensity={0.3}>
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full flex flex-col items-center justify-center gap-12"
        >
          {/* Orbe do Potencial */}
          <motion.div variants={orbVariants}>
            <Orb />
          </motion.div>

          {/* Headline - Proposta de Valor */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-noel-cyan to-noel-gold bg-clip-text text-transparent leading-tight">
              Crie Memórias Mágicas e Personalizadas
            </h2>
            <p className="text-xl text-noel-cyan/80 font-light">
              Uma experiência de criação que celebra sua criatividade com cada passo
            </p>
          </motion.div>

          {/* CTA Principal */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate="breathe"
            onClick={onCTAClick}
            className="relative px-10 py-4 text-lg font-bold text-white bg-noel-cyan rounded-lg overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-noel-cyan/0 via-white/20 to-noel-cyan/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">INICIAR CRIAÇÃO</span>
          </motion.button>

          {/* Elemento decorativo flutuante */}
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-noel-cyan/10 blur-2xl"
          />

          <motion.div
            animate={{
              y: [0, 30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-noel-gold/5 blur-3xl"
          />
        </motion.div>
      </section>
    </ParallaxBackground>
  );
}
