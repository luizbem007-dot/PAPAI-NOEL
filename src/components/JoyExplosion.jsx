import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from './Confetti';

export default function JoyExplosion({ trigger = false, onComplete = () => {} }) {
  const [showConfetti, setShowConfetti] = useState(false);

  React.useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timeout = setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete]);

  return (
    <>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center"
          >
            {/* Onda de expansão */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-64 h-64 rounded-full border-2 border-noel-cyan"
            />

            {/* Pulso de luz */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-32 h-32 rounded-full bg-noel-cyan/30"
            />

            {/* Partículas radiais */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: Math.cos((i * Math.PI) / 3) * 200,
                  y: Math.sin((i * Math.PI) / 3) * 200,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                }}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ['#FF073A', '#00FFFF', '#FFD700'][i % 3],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti active={showConfetti} intensity={80} />
    </>
  );
}
