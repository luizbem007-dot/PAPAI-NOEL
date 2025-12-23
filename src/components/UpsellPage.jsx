import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import MagicalParticles from './MagicalParticles';
import SnowEffect from './SnowEffect';

export default function UpsellPage({ onCTAClick }) {
  const navigate = useNavigate();

  const handleUpsell = () => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart', {
        content_name: 'Upsell - Manual do Sono Infantil',
        content_category: 'Upsell',
      });
    }

    if (onCTAClick) {
      onCTAClick();
    }

    navigate('/checkout');
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-700 via-red-900 to-black text-white overflow-hidden">
      <MagicalParticles />
      <SnowEffect intensity={0.2} />

      {/* Marca discreta (Header) */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-red-950/70 border border-yellow-400/30 backdrop-blur">
        <Sparkles className="w-4 h-4 text-noel-gold" />
        <span className="text-sm font-semibold bg-gradient-to-r from-noel-gold to-yellow-300 bg-clip-text text-transparent">
          Noel.IA
        </span>
      </div>

      {/* Conteúdo central de upsell */}
      <main className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative max-w-5xl w-full">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 space-y-10">
            {/* Headline de Sucesso */}
            <div className="text-center space-y-4 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-bold text-emerald-200 uppercase tracking-wider">Pedido Confirmado</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                <span className="text-white">O vídeo do Papai Noel</span>{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-yellow-300 bg-clip-text text-transparent">
                  já está garantido!
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-yellow-100/80 max-w-2xl mx-auto">
                Chegará no seu WhatsApp em instantes...
              </p>
            </div>

            {/* Card de Oferta */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 sm:p-12 space-y-8">
                {/* Gancho */}
                <div className="text-center space-y-3">
                  <p className="text-sm uppercase tracking-widest text-yellow-300 font-bold">Mas espera...</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    O Natal acaba, mas as <span className="text-yellow-300">Férias continuam...</span>
                  </h2>
                  <p className="text-lg text-yellow-50/90 leading-relaxed max-w-2xl mx-auto">
                    Como você vai fazer seu filho dormir no horário certo com toda essa agitação?
                  </p>
                </div>

                {/* Produto */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                      MANUAL DO SONO INFANTIL
                    </h3>
                    <p className="text-sm text-yellow-300/80 uppercase tracking-wide mt-1">Edição de Férias</p>
                  </div>

                  <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border-2 border-white/20 shadow-xl">
                    <img
                       src="https://res.cloudinary.com/dfnhbhkhp/image/upload/v1766516577/freepik__produto-ebook-manual-do-sono-infantil-edio-de-fria__20296_lulrh1.jpg"
                      alt="Manual do Sono Infantil - Edição de Férias"
                       className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-base sm:text-lg text-center text-yellow-50/90 leading-relaxed max-w-2xl mx-auto px-4">
                    O guia prático para fazer seu filho <strong className="text-white">dormir a noite toda</strong> e regular o sono nas férias, <strong className="text-white">sem brigas e sem choro.</strong> Garanta noites de paz para você descansar.
                  </p>
                </div>

                {/* Preço e CTA */}
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-gray-400 line-through">R$ 199,00</span>
                      <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
                        R$ 37,00
                      </span>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/40">
                      <span className="text-xs font-bold text-red-200 uppercase tracking-wider">Oferta válida só nesta página</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpsell}
                    className="w-full max-w-xl mx-auto flex items-center justify-center gap-3 px-8 py-6 text-base sm:text-lg font-black rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-gray-900 shadow-[0_20px_60px_rgba(16,185,129,0.5)] hover:shadow-[0_25px_80px_rgba(16,185,129,0.6)] transition-all duration-300"
                  >
                    <span>ADICIONAR AO PEDIDO POR R$ 37</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-emerald-200">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Acesso imediato</span>
                    </div>
                    <span className="text-white/40">•</span>
                    <div className="flex items-center gap-2 text-emerald-200">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Garantia total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-yellow-400/15 bg-red-950/70 backdrop-blur-sm py-8 text-center text-yellow-200/70 text-sm">
        Noel.IA • Magia personalizada em minutos
      </footer>
    </div>
  );
}
