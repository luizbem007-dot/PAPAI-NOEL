import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VideoHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-play com controle
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay não permitido:', err);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const glowVariants = {
    initial: { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
    animate: {
      boxShadow: [
        '0 0 20px rgba(255, 215, 0, 0.3)',
        '0 0 60px rgba(255, 215, 0, 0.6)',
        '0 0 20px rgba(255, 215, 0, 0.3)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto"
    >
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="relative rounded-2xl overflow-hidden bg-noel-dark shadow-2xl"
      >
        {/* Placeholder do Vídeo do Papai Noel */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-noel-dark via-noel-darker to-noel-dark flex items-center justify-center group cursor-pointer">
          {/* Video actual (quando disponível) */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          >
            <source src="https://example.com/papai-noel-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay com gradient e play button */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-noel-dark/80 via-transparent to-transparent flex items-center justify-center"
            whileHover={{ opacity: 0.3 }}
          >
            {/* Play Button */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-noel-red/80 backdrop-blur-md flex items-center justify-center hover:bg-noel-red transition-colors"
              style={{
                boxShadow: '0 0 40px rgba(255, 7, 58, 0.6)',
              }}
            >
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Placeholder text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎅</div>
              <p className="text-white text-xl font-semibold">
                Papai Noel Convida Você
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decoração de brilho ao redor */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(255, 215, 0, 0)',
              '0 0 30px rgba(255, 215, 0, 0.4)',
              '0 0 0px rgba(255, 215, 0, 0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-4 rounded-2xl pointer-events-none"
        />
      </motion.div>

      {/* Texto descritivo abaixo do vídeo */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-6 text-noel-cyan/80 text-sm italic"
      >
        ✨ Um vídeo personalizado onde o Papai Noel fala especialmente com seu filho ✨
      </motion.p>
    </motion.div>
  );
}
