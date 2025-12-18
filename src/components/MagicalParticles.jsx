import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagicalParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Gerar partículas continuamente
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        left: Math.random() * 100,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            bottom: -10,
            left: `${particle.left}%`,
            opacity: 0,
          }}
          animate={{
            bottom: '100vh',
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear',
          }}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, #fef08a 0%, rgba(254, 240, 138, 0) 70%)`,
            boxShadow: '0 0 12px rgba(254, 240, 138, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
