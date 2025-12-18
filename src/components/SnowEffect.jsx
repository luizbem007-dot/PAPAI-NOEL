import React from 'react';
import { motion } from 'framer-motion';

export default function SnowEffect({ intensity = 0.3 }) {
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 5,
    opacity: Math.random() * intensity + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ 
            top: -20,
            left: `${flake.left}%`,
            opacity: 0,
          }}
          animate={{
            top: '100vh',
            left: `${flake.left + (Math.random() - 0.5) * 20}%`,
            opacity: [0, flake.opacity, 0],
            rotate: 360,
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="absolute text-white text-2xl"
        >
          ❄️
        </motion.div>
      ))}
    </div>
  );
}
