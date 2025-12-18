import React from 'react';
import { motion } from 'framer-motion';

export default function PhaseTransition({ active = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Efeito de warp/zoom */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          active
            ? {
                scale: [0, 1.3, 1.5],
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

      {/* Cortinas que cobrem a transição */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-1/2 origin-top bg-gradient-to-b from-noel-dark via-noel-cyan/20 to-transparent"
      />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom bg-gradient-to-t from-noel-dark via-noel-gold/20 to-transparent"
      />

      {/* Partículas de transição */}
      {active &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos((i * Math.PI) / 6) * 300,
              y: Math.sin((i * Math.PI) / 6) * 300,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: i % 3 === 0 ? '#FF073A' : i % 3 === 1 ? '#00FFFF' : '#FFD700',
            }}
          />
        ))}
    </motion.div>
  );
}
