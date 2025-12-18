import React from 'react';
import { motion } from 'framer-motion';

export default function CinematicTransition({ active = false, onComplete = () => {} }) {
  React.useEffect(() => {
    if (active) {
      const timeout = setTimeout(onComplete, 1200);
      return () => clearTimeout(timeout);
    }
  }, [active, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 pointer-events-none"
    >
      {/* Efeito de warp central */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          active
            ? {
                scale: [0, 1.2, 1.5],
                opacity: [1, 0.8, 0],
                rotate: 360,
              }
            : { scale: 0, opacity: 0 }
        }
        transition={{
          duration: 1.2,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-noel-cyan to-noel-gold blur-3xl" />
      </motion.div>

      {/* Cortinas horizontais */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-1/2 origin-top bg-gradient-to-b from-noel-dark via-noel-cyan/20 to-transparent"
        style={{ transformOrigin: 'center top' }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom bg-gradient-to-t from-noel-dark via-noel-gold/20 to-transparent"
        style={{ transformOrigin: 'center bottom' }}
      />
    </motion.div>
  );
}
