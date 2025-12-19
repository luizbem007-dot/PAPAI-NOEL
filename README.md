## Como colocar o vídeo da VSL no hero

O hero da landing já aceita uma URL de vídeo via variável de ambiente. Basta enviar a URL pública do seu MP4 e colocar no `.env.local`.

1) Crie (ou edite) o arquivo `.env.local` na raiz do projeto e adicione:

```
VITE_VSL_URL=https://seu-cdn.com/vsl-hero-720p.mp4
```

2) Rode o projeto:

```
npm run dev
```

Pronto. O vídeo será usado automaticamente em `src/components/LandingPage.jsx`.

### Requisitos recomendados (mobile-first)
- Formato: MP4 (H.264), 16:9 para o hero.
- Resolução: 1280×720 (720p), bitrate ~2–3 Mbps.
- Duração curta (10–20s), tamanho ~3–5 MB.
- O player já força `muted`, `autoplay` e `playsInline` para garantir reprodução automática no mobile.

### Poster (opcional)
Se quiser adicionar um poster para suavizar o carregamento, envie também a URL de uma imagem (JPEG 50–100KB) e eu conecto no componente `LandingPage`.

# Natal Mágico IA - Landing Page

Landing Page de alta conversão para vídeos personalizados do Papai Noel criados por Inteligência Artificial.

## 🎄 Sobre o Projeto

O **Natal Mágico IA** é uma aplicação que permite aos pais criar vídeos personalizados onde o Papai Noel fala diretamente com seus filhos, mencionando nome, idade, comportamentos e o presente desejado.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna
- **Google Fonts** - Inter (sans-serif) e Playfair Display (serif)

## 🎨 Design System

### Cores Temáticas de Natal
- **Vermelho Coca-Cola**: `#D42426` (`natal-red`)
- **Verde Pinheiro**: `#165B33` (`natal-green`)
- **Dourado**: `#F8B229` (`natal-gold`)
- **Creme/Papel**: `#F3F0E7` (`natal-cream`)

### Tipografia
- **Sans-serif**: Inter (corpo de texto)
- **Serif**: Playfair Display (títulos)

## 📱 Estrutura da Página

1. **Header** - Logo e CTA fixo
2. **Hero Section** - Headline emocional, subtítulo e vídeo de exemplo
3. **Como Funciona** - 3 passos simples com ícones
4. **Formulário** - Destaque visual com campos para personalização
5. **FAQ** - Perguntas frequentes com acordeão
6. **Footer** - Copyright e informações

## 🛠️ Como Executar

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173/`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build de produção
npm run preview
```

## 📋 Funcionalidades do Formulário

O formulário coleta os seguintes dados:
- ✅ Nome da Criança (obrigatório)
- ✅ Idade (obrigatório, 1-12 anos)
- ✅ Comportamento para Elogiar (obrigatório)
- ⚪ Comportamento para Melhorar (opcional)
- ✅ Presente Desejado (obrigatório)
- ✅ WhatsApp com DDD (obrigatório)

Ao enviar, os dados são logados no console (integração com backend pendente).

## 🎯 Objetivos de Conversão

- **Mobile First** - Design otimizado para dispositivos móveis
- **CTAs Destacados** - Botões estratégicos ao longo da página
- **Scroll Suave** - Navegação intuitiva até o formulário
- **Visual Atrativo** - Cores e ícones temáticos de Natal
- **FAQ Interativo** - Reduz objeções e aumenta confiança

## 📦 Estrutura de Arquivos

```
NATAL/
├── src/
│   ├── App.jsx          # Componente principal da Landing Page
│   ├── index.css        # Estilos globais e imports do Tailwind
│   └── main.jsx         # Entry point da aplicação
├── public/              # Arquivos estáticos
├── tailwind.config.js   # Configuração do Tailwind com cores customizadas
├── postcss.config.js    # Configuração do PostCSS
├── vite.config.js       # Configuração do Vite
└── package.json         # Dependências do projeto
```

## 🔄 Próximos Passos

- [ ] Integrar formulário com backend (API)
- [ ] Adicionar vídeo de demonstração real
- [ ] Implementar gateway de pagamento
- [ ] Adicionar animações avançadas
- [ ] Implementar tracking (Google Analytics/Meta Pixel)
- [ ] Testes A/B para otimização de conversão
- [ ] SEO optimization

## 📄 Licença

© 2025 Natal Mágico IA. Todos os direitos reservados.

---

**Desenvolvido com ❤️ e ✨ para criar a mágica do Natal!**
// Trigger deploy 1766101177
Trigger: Fri Dec 19 15:58:49 -03 2025
