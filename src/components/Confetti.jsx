import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Confetti({ active = true, intensity = 50 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Gerar partículas de confete
    const newParticles = Array.from({ length: intensity }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      color: ['#FF073A', '#00FFFF', '#FFD700', '#FFB800'][Math.floor(Math.random() * 4)],
    }));

    setParticles(newParticles);

    // Limpar após animação
    const timeout = setTimeout(() => {
      setParticles([]);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [active, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            top: '-10px',
            left: `${particle.left}%`,
            opacity: 1,
            rotate: particle.rotation,
          }}
          animate={{
            top: '100vh',
            opacity: 0,
            rotate: particle.rotation + 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: particle.color }}
        />
      ))}
    </div>
  );
}
