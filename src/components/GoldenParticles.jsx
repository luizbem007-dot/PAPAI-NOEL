import React from 'react';
import { motion } from 'framer-motion';

export default function GoldenParticles({ trigger }) {
  if (!trigger) return null;

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * -60 - 20,
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1.5, 0],
            x: p.x,
            y: p.y,
          }}
          transition={{ duration: 0.8, delay: p.delay }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-noel-gold rounded-full"
          style={{ boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)' }}
        />
      ))}
    </div>
  );
}
