import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Heart } from 'lucide-react';

export default function CancelPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-noel flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-2xl w-full">
        {/* Ícone de aviso */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 flex justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-noel-red/20 flex items-center justify-center">
            <AlertCircle className="w-20 h-20 text-noel-red" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-noel-red to-noel-gold bg-clip-text text-transparent">
            Pagamento Cancelado
          </span>
        </motion.h1>

        {/* Descrição */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="text-xl text-noel-cyan/90 mb-4">
            Parece que você saiu do pagamento.
          </p>
          <p className="text-noel-cyan/70">
            Sem problemas! Você pode tentar novamente a qualquer momento.
          </p>
        </motion.div>

        {/* Informações */}
        <motion.div
          variants={itemVariants}
          className="bg-noel-glass backdrop-blur-xl rounded-2xl p-8 border border-noel-cyan/20 mb-8"
        >
          <h3 className="text-lg font-bold text-noel-gold mb-6">
            Seu carrinho foi salvo 💾
          </h3>

          <ul className="space-y-3 text-noel-cyan/80">
            <li className="flex items-center gap-3">
              <span className="text-noel-gold">✓</span>
              <span>Seus dados foram armazenados com segurança</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-noel-gold">✓</span>
              <span>Você pode voltar e retomar de onde parou</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-noel-gold">✓</span>
              <span>Nenhuma cobrança foi feita</span>
            </li>
          </ul>
        </motion.div>

        {/* Razões comuns */}
        <motion.div
          variants={itemVariants}
          className="bg-noel-darker/50 rounded-xl p-6 border border-noel-cyan/20 mb-8"
        >
          <h3 className="text-sm font-bold text-noel-gold mb-4">Dúvidas sobre o pagamento?</h3>
          <ul className="space-y-2 text-sm text-noel-cyan/70">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>O preço é único: R$ 19,90 (sem taxas escondidas)</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Você recebe o vídeo em 5 minutos via WhatsApp</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Suportamos cartão de crédito, débito e até boleto</span>
            </li>
          </ul>
        </motion.div>

        {/* Botões de ação */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row justify-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-noel-red text-white rounded-lg font-bold hover:shadow-lg transition inline-flex items-center justify-center gap-2"
            style={{
              boxShadow: '0 0 30px rgba(255, 7, 58, 0.4)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Tentar Novamente
          </motion.a>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-noel-cyan text-noel-cyan rounded-lg font-bold hover:bg-noel-cyan/10 transition inline-flex items-center justify-center gap-2"
          >
            🏠 Voltar ao Início
          </motion.a>
        </motion.div>

        {/* Suporte */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-10 p-6 bg-noel-cyan/10 rounded-lg border border-noel-cyan/20"
        >
          <p className="text-noel-cyan/80 mb-4">
            <Heart className="w-5 h-5 inline mr-2 text-noel-red" />
            Algum problema? Estamos aqui para ajudar!
          </p>
          <p className="text-sm text-noel-cyan/60">
            Entre em contato conosco via WhatsApp ou email
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
