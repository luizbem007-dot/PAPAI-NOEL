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
      <main className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
        <div className="relative max-w-4xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/15 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 space-y-8 text-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-200/70 font-semibold">Upsell Exclusivo</p>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight bg-gradient-to-r from-noel-gold via-yellow-200 to-noel-gold bg-clip-text text-transparent">
                ✅ TUDO CERTO! O vídeo do Papai Noel já está garantido e chegará no seu WhatsApp.
              </h1>
              <p className="text-lg text-yellow-100/90 leading-relaxed max-w-2xl mx-auto">
                Mas atenção, mamãe: O Natal acaba amanhã, mas as Férias continuam... Como você vai fazer seu filho dormir no horário certo com toda essa agitação?
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="px-4 py-2 rounded-full bg-red-900/60 border border-yellow-400/30 text-sm font-semibold uppercase tracking-wide text-yellow-200/90">
                  Oferta Única: MANUAL DO SONO INFANTIL - Edição de Férias
                </div>
              </div>

              <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-inner shadow-yellow-500/10">
                <img
                  src="https://placehold.co/600x400"
                  alt="Manual do Sono Infantil - Edição de Férias"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-lg text-yellow-50/90 leading-relaxed max-w-3xl mx-auto">
                O guia prático para fazer seu filho dormir a noite toda e regular o sono nas férias, sem brigas e sem choro. Garanta noites de paz para você descansar.
              </p>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-gray-900 font-black text-lg shadow-[0_0_35px_rgba(16,185,129,0.55)]">
                  <span className="text-sm line-through text-gray-900/70">De R$ 199,00</span>
                  <span>|</span>
                  <span>APENAS R$ 37,00</span>
                  <span className="text-xs font-bold uppercase tracking-wide">(Oferta válida só nesta página)</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleUpsell}
                  className="w-full sm:w-auto mx-auto flex items-center justify-center gap-3 px-10 py-5 text-lg font-black rounded-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 text-gray-900 shadow-[0_20px_60px_rgba(16,185,129,0.45)] border-2 border-emerald-200/70 hover:shadow-[0_25px_75px_rgba(16,185,129,0.55)] transition-all duration-300"
                >
                  QUERO ADICIONAR AO MEU PEDIDO POR R$ 37
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-yellow-100/80">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-300/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  Acesso imediato + garantia total
                </div>
                <div className="px-4 py-2 rounded-full bg-red-900/40 border border-yellow-400/30 font-semibold text-yellow-100">
                  Oferta disponível apenas nesta página de obrigado
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
