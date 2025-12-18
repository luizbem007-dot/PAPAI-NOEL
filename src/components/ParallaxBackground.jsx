import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ParallaxBackground({ children, intensity = 0.5 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setOffset(window.scrollY * intensity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  // Gerar camadas de fundo com padrão abstrato
  const layers = [
    {
      id: 'layer-1',
      delay: 0,
      color: 'rgba(0, 255, 255, 0.05)',
      top: -200,
      left: -100,
      size: 600,
      duration: 20,
    },
    {
      id: 'layer-2',
      delay: 1,
      color: 'rgba(255, 215, 0, 0.03)',
      top: 200,
      right: -150,
      size: 500,
      duration: 25,
    },
    {
      id: 'layer-3',
      delay: 2,
      color: 'rgba(0, 255, 255, 0.02)',
      top: 400,
      left: 100,
      size: 400,
      duration: 30,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-noel"
      style={{ perspective: '1200px' }}
    >
      {/* Camadas de parallax estáticas */}
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
          className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            top: layer.top,
            left: layer.left,
            right: layer.right,
            width: layer.size,
            height: layer.size,
            background: layer.color,
          }}
        />
      ))}

      {/* Conteúdo com parallax */}
      <motion.div
        style={{ y: offset }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Grid de fundo sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
