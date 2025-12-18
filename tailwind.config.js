/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noel-dark': '#020010',
        'noel-darker': '#11001F',
        'noel-red': '#FF073A',
        'noel-cyan': '#00FFFF',
        'noel-gold': '#FFD700',
        'noel-gold-dark': '#FFB800',
        'noel-glass': 'rgba(220, 225, 255, 0.05)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)' },
        },
      },
      backdropBlur: {
        'xl': '20px',
      },
      backgroundImage: {
        'gradient-noel': 'linear-gradient(135deg, #020010 0%, #11001F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFB800 100%)',
      },
    },
  },
  plugins: [],
}
