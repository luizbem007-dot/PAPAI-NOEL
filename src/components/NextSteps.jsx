import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';

export default function NextSteps({ onNewCreation, onHome }) {
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <ParallaxBackground intensity={0.2}>
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl w-full text-center"
        >
          {/* Decoração inicial */}
          <motion.div
            variants={itemVariants}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-8 text-6xl"
          >
            ✨
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-noel-cyan to-noel-gold bg-clip-text text-transparent"
          >
            Novo Horizonte
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-noel-cyan/80 mb-12 max-w-lg mx-auto leading-relaxed font-light"
          >
            Sua criação foi completada com sucesso. Agora você tem a liberdade de 
            explorar novos horizontes ou retornar ao começo.
          </motion.p>

          {/* Opções de ação */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            {/* Botão Criar Outra Memória */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={onNewCreation}
              className="px-8 py-4 bg-noel-cyan text-noel-dark font-bold rounded-lg hover:shadow-2xl transition relative group overflow-hidden text-lg"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">Criar Outra Memória ✨</span>
            </motion.button>

            {/* Botão Voltar ao Início */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={onHome}
              className="px-8 py-4 border-2 border-noel-gold text-noel-gold font-bold rounded-lg hover:bg-noel-gold/10 transition relative overflow-hidden text-lg"
              style={{
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-noel-gold/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="relative z-10">Voltar ao Início 🏠</span>
            </motion.button>
          </motion.div>

          {/* Mensagem de encerramento */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-12 border-t border-noel-cyan/20"
          >
            <p className="text-noel-cyan/60 text-sm font-light">
              Obrigado por criar magia conosco. 
              <br />
              <span className="text-noel-gold">Sua jornada nunca termina...</span>
            </p>
          </motion.div>

          {/* Elementos decorativos flutuantes */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 w-24 h-24 rounded-full bg-noel-cyan/10 blur-2xl pointer-events-none"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-32 right-10 w-32 h-32 rounded-full bg-noel-gold/5 blur-3xl pointer-events-none"
          />
        </motion.div>
      </section>
    </ParallaxBackground>
  );
}
