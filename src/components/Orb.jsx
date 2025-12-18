import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Orb() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev + 0.01) % Math.PI * 2);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Gerar camadas do orbe com efeito de profundidade
  const layers = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    radius: 200 - i * 20,
    opacity: 1 - i * 0.12,
    duration: 6 + i * 0.5,
  }));

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Orbe principal com gradiente */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(255, 215, 0, 0.1)',
            '0 0 60px rgba(0, 255, 255, 0.6), 0 0 120px rgba(255, 215, 0, 0.2)',
            '0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(255, 215, 0, 0.1)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-noel-cyan/40 to-noel-gold/20 backdrop-blur-xl border border-noel-cyan/30"
      />

      {/* Camadas rotativas internas */}
      {layers.map((layer) => (
        <motion.div
          key={layer.id}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 rounded-full border border-noel-cyan/20"
          style={{
            width: `${layer.radius}px`,
            height: `${layer.radius}px`,
            left: `50%`,
            top: `50%`,
            transform: 'translate(-50%, -50%)',
            opacity: layer.opacity,
          }}
        />
      ))}

      {/* Pontos de luz flutuantes */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`light-${i}`}
          animate={{
            x: Math.cos(time + i * Math.PI / 2) * 120,
            y: Math.sin(time + i * Math.PI / 2) * 120,
          }}
          transition={{ type: 'tween', duration: 0 }}
          className="absolute w-3 h-3 bg-noel-cyan rounded-full"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Centro luminoso */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute w-16 h-16 bg-gradient-gold rounded-full"
        style={{
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
        }}
      />
    </div>
  );
}
