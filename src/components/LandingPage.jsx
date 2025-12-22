import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, ScrollText, ShieldCheck } from 'lucide-react';
import MagicalParticles from './MagicalParticles';
import SnowEffect from './SnowEffect';
import VSLPlayer from './VSLPlayer';
import WhatsAppIcon from './WhatsAppIcon';

export default function LandingPage({ onCTAClick, vslUrl }) {
  // Carregar o script do vturb player dinamicamente
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://scripts.converteai.net/e57fed85-7f72-481f-b182-402ed86ecb6a/players/6946bdd725bdf7820c03c503/v4/player.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  const navigate = useNavigate();

  const handleCTAClick = () => {
    // Rastrear clique no CTA nos Meta Pixels
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart', {
        content_name: 'CTA - Criar Vídeo do Papai Noel',
        content_category: 'Landing Page'
      });
    }
    
    if (onCTAClick) onCTAClick();
    setTimeout(() => navigate('/checkout'), 600);
  };

  const steps = [
    {
      icon: ScrollText,
      title: 'Conte os Segredos para o Noel',
      description: 'Informe o nome, a idade e aqueles detalhes mágicos que só a família sabe. É isso que fará os olhos dele brilharem de verdade.',
    },
    {
      icon: Wand2,
      title: 'Nossa IA forja a magia',
      description: 'Papai Noel hiper-real fala tudo em minutos.',
    },
    {
      icon: WhatsAppIcon,
      title: 'Receba no WhatsApp',
      description: 'Pronto para emocionar e compartilhar.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-700 via-red-900 to-black text-white overflow-hidden">
      <MagicalParticles />
      <SnowEffect intensity={0.2} />

      {/* Marca discreta */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-red-950/70 border border-yellow-400/30 backdrop-blur">
        <Sparkles className="w-4 h-4 text-noel-gold" />
        <span className="text-sm font-semibold bg-gradient-to-r from-noel-gold to-yellow-300 bg-clip-text text-transparent">
          Noel.IA
        </span>
      </div>

      {/* Dobra 1: Vídeo acima, texto abaixo */}
      <section className="relative w-full overflow-hidden">
        {/* Vídeo primeiro (no topo) */}
        <div className="relative w-full aspect-video max-h-[60vh] overflow-hidden">
          <VSLPlayer />
        </div>

        {/* Texto abaixo do vídeo */}
        <div className="relative w-full px-4 py-12 text-center space-y-6 bg-gradient-to-b from-red-950 via-red-900 to-red-950">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight drop-shadow-md">
              Crie o <span className="bg-gradient-to-r from-noel-gold to-yellow-300 bg-clip-text text-transparent font-black">Momento Mais Inesquecível</span> Deste Natal.
            </h1>
            <p className="text-yellow-200 text-base leading-relaxed max-w-lg mx-auto mt-4">
              Crie um vídeo mágico e 100% personalizado do Papai Noel para seu filho e receba <span className="font-bold text-white">direto no seu WhatsApp</span>. É fácil, rápido e emocionante.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTAClick}
                className="mx-auto flex items-center justify-center gap-3 px-8 py-5 text-lg font-black rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-gray-900 shadow-[0_0_40px_rgba(255,215,0,0.6),0_0_80px_rgba(255,165,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.8),0_0_100px_rgba(255,165,0,0.6)] transition-all duration-300"
              >
                ✨ CRIAR O VÍDEO MÁGICO AGORA
              </motion.button>

              {/* Selo de garantia ao lado da CTA */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Garantia total
              </div>
            </div>
            {/* Frase de prova social abaixo da CTA */}
            <p className="text-yellow-100/90 text-sm font-medium">
              ⭐⭐⭐⭐⭐ Presente #1 escolhido por milhares de mães em 2025
            </p>
          </div>
        </div>
      </section>

      {/* Dobra 2: 3 passos mágicos com design premium */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-red-950 via-red-900/80 to-red-950">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-yellow-400/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70 font-semibold">Como funciona</p>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">A Magia em 3 Passos Simples</h2>
            <p className="text-orange-50/80 text-lg max-w-2xl mx-auto">Transforme um desejo em um momento mágico em minutos</p>
          </div>

          {/* Cards Grid - Centralized e sem overflow */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -8, borderColor: "rgba(251, 191, 36, 0.6)" }}
                  className="relative group"
                >
                  {/* Número decorativo gigante - visível e intencional */}
                  <div className="absolute -top-8 -right-4 text-9xl font-black text-yellow-300/15 select-none leading-none z-10">
                    {index + 1}
                  </div>

                  {/* Card com glassmorphism */}
                  <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 group-hover:border-yellow-400/40">
                    {/* Brilho de hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/0 via-transparent to-yellow-400/0 group-hover:from-yellow-400/10 group-hover:to-yellow-400/5 transition-all duration-300" />

                    <div className="relative z-10 flex flex-col h-full gap-5">
                      {/* Ícone em círculo dourado */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                        <Icon className="w-8 h-8 text-gray-900" />
                      </div>

                      {/* Número do passo - label */}
                      <div>
                        <span className="text-xs uppercase tracking-widest text-yellow-300 font-bold">Passo {index + 1}</span>
                      </div>

                      {/* Título */}
                      <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                        {step.title}
                      </h3>

                      {/* Descrição */}
                      <p className="text-orange-50/85 text-base leading-relaxed flex-grow">
                        {step.description}
                      </p>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTAClick}
                  className="mx-auto flex items-center justify-center gap-3 px-10 py-6 text-lg font-black rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-gray-900 shadow-[0_0_40px_rgba(255,215,0,0.6),0_0_80px_rgba(255,165,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.8),0_0_100px_rgba(255,165,0,0.6)] transition-all duration-300 border-2 border-yellow-300/40"
                >
                  ✨ Criar Este Momento Inesquecível
                </motion.button>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  Garantia total
                </div>
              </div>
              <p className="text-yellow-100/90 text-sm font-medium">
                ⭐⭐⭐⭐⭐ Presente #1 escolhido por milhares de mães em 2025
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-12 px-4 bg-red-950/60 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <div className="mt-12 pt-8 border-t border-yellow-400/15">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-200/50 mb-6 text-center">
              POTENCIALIZADO PELA MELHOR TECNOLOGIA:
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {/* Google Gemini */}
              <svg height="32" style={{flex:'none',lineHeight:'1'}} viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="gemini-fill-0" x1="7" x2="11" y1="15.5" y2="12"><stop stopColor="#08B962"></stop><stop offset="1" stopColor="#08B962" stopOpacity="0"></stop></linearGradient></defs>
              </svg>

              {/* Make */}
              <svg height="32" style={{flex:'none',lineHeight:'1'}} viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.989 4.036L.062 17.818a.577.577 0 00.257.774l3.733 1.876a.577.577 0 00.775-.256L11.753 6.43a.577.577 0 00-.257-.775L7.763 3.78a.575.575 0 00-.774.257z" fill="#E90CF9"></path><path d="M19.245 3.832h4.179c.318 0 .577.26.577.577v15.425a.578.578 0 01-.577.578h-4.179a.578.578 0 01-.577-.578V4.41c0-.318.259-.577.577-.577z" fill="#B02DE9"></path><path d="M12.815 4.085L9.85 19.108a.576.576 0 00.453.677l4.095.826c.314.063.62-.14.681-.454l2.964-15.022a.577.577 0 00-.453-.677l-4.096-.827a.577.577 0 00-.68.454z" fill="#6D00CC"></path>
              </svg>

              {/* Google Veo */}
              <svg height="32" style={{flex:'none',lineHeight:'1'}} viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M19.615 3.184c-2.369-.244-7.615-.244-7.615-.244s-5.246 0-7.615.244c-1.844.191-3.291 1.638-3.482 3.482C.659 9.035.659 12 .659 12s0 2.965.244 5.334c.191 1.844 1.638 3.291 3.482 3.482 2.369.244 7.615.244 7.615.244s5.246 0 7.615-.244c1.844-.191 3.291-1.638 3.482-3.482.244-2.369.244-5.334.244-5.334s0-2.965-.244-5.334c-.191-1.844-1.638-3.291-3.482-3.482zM9.659 15.531V8.469L15.803 12l-6.144 3.531z" fill="url(#veo-grad)"/>
                <defs><linearGradient id="veo-grad" x1="0" x2="24" y1="0" y2="24"><stop stopColor="#FF6B6B"/><stop offset="1" stopColor="#FF8E53"/></linearGradient></defs>
              </svg>

              {/* NVIDIA */}
              <svg height="32" style={{flex:'none',lineHeight:'1'}} viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.212 8.976V7.62c.127-.01.256-.017.388-.021 3.596-.117 5.957 3.184 5.957 3.184s-2.548 3.647-5.282 3.647a3.227 3.227 0 01-1.063-.175v-4.109c1.4.174 1.681.812 2.523 2.258l1.873-1.627a4.905 4.905 0 00-3.67-1.846 6.594 6.594 0 00-.729.044m0-4.476v2.025c.13-.01.259-.019.388-.024 5.002-.174 8.261 4.226 8.261 4.226s-3.743 4.69-7.643 4.69c-.338 0-.675-.031-1.007-.092v1.25c.278.038.558.057.838.057 3.629 0 6.253-1.91 8.794-4.169.421.347 2.146 1.193 2.501 1.564-2.416 2.083-8.048 3.763-11.24 3.763-.308 0-.603-.02-.894-.048V19.5H24v-15H10.21zm0 9.756v1.068c-3.356-.616-4.287-4.21-4.287-4.21a7.173 7.173 0 014.287-2.138v1.172h-.005a3.182 3.182 0 00-2.502 1.178s.615 2.276 2.507 2.931m-5.961-3.3c1.436-1.935 3.604-3.148 5.961-3.336V6.523C5.81 6.887 2 10.723 2 10.723s2.158 6.427 8.21 7.015v-1.166C5.77 16 4.25 10.958 4.25 10.958h-.002z" fill="#74B71B"></path>
              </svg>

              {/* WhatsApp */}
              <svg height="32" style={{flex:'none',lineHeight:'1'}} viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg" fill="#25D366">
                <path d="M12.04 2C6.5 2 2 6.5 2 12.04C2 13.81 2.46 15.54 3.33 17.04L2 22L7.08 20.68C8.53 21.5 10.23 22 12.04 22C17.58 22 22.08 17.5 22.08 11.96C22.08 6.42 17.58 2 12.04 2ZM12.04 20.2C10.45 20.2 8.91 19.75 7.56 18.94L7.23 18.75L4.17 19.54L4.98 16.53L4.78 16.16C3.9 14.73 3.44 13.11 3.44 11.96C3.44 7.28 7.31 3.48 12.04 3.48C16.77 3.48 20.64 7.28 20.64 11.96C20.64 16.64 16.77 20.2 12.04 20.2ZM16.49 14.91C16.26 14.8 15.13 14.24 14.92 14.16C14.72 14.09 14.57 14.05 14.42 14.28C14.27 14.51 13.84 15.03 13.7 15.18C13.57 15.33 13.43 15.36 13.2 15.24C12.97 15.13 12.23 14.88 11.35 14.11C10.66 13.5 10.2 12.76 10.07 12.53C9.94 12.3 10.05 12.18 10.17 12.07C10.27 11.97 10.39 11.81 10.51 11.67C10.63 11.53 10.67 11.42 10.75 11.27C10.83 11.12 10.78 10.99 10.72 10.88C10.66 10.76 10.21 9.65 10 9.21C9.82 8.78 9.62 8.85 9.49 8.85C9.36 8.85 9.22 8.85 9.08 8.85C8.94 8.85 8.7 8.91 8.51 9.11C8.31 9.31 7.76 9.83 7.76 10.89C7.76 11.95 8.53 12.97 8.65 13.12C8.77 13.27 10.24 15.52 12.46 16.49C13.01 16.73 13.43 16.87 13.76 16.98C14.32 17.16 14.83 17.13 15.23 17.07C15.68 17 16.6 16.51 16.79 15.98C16.98 15.45 16.98 15.01 16.92 14.91C16.86 14.8 16.72 14.73 16.49 14.59V14.91Z"/>
              </svg>

              {/* Security Shield */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Dobra 3: Social Proof */}
      <section className="relative py-12 px-4 bg-red-950/80">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/70">Demonstração Real</p>
            <h3 className="text-3xl font-bold">IMAGINE SEU FILHO RECEBENDO ISSO 🎅</h3>
            <p className="text-lg text-yellow-200">Dê o play e assista ao vídeo que o Papai Noel gravou para o pequeno Abraão.</p>
          </div>

          <div className="flex justify-center w-full">
            <vturb-smartplayer id="vid-6946bdd725bdf7820c03c503" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}></vturb-smartplayer>
          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTAClick}
            className="relative mx-auto flex items-center justify-center gap-3 px-7 py-5 text-lg font-extrabold rounded-full bg-gradient-to-r from-noel-red to-noel-gold text-white shadow-[0_0_40px_rgba(255,215,0,0.4)]"
          >
            Sim! Quero criar este momento inesquecível
            <Sparkles className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center justify-center text-yellow-300/80 text-xs font-semibold tracking-wider">
            🔒 Ambiente Seguro e Privado
          </div>
        </div>
      </section>

      <footer className="border-t border-yellow-400/15 bg-red-950/70 backdrop-blur-sm py-8 text-center text-yellow-200/70 text-sm">
        Noel.IA • Magia personalizada em minutos
      </footer>
    </div>
  );
}
