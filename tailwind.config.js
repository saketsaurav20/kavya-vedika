/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          darkest: '#070605',
          dark: '#0b0a08',
          paper: '#12100d',
          card: '#161410',
          border: 'rgba(230, 195, 135, 0.15)',
          borderHover: 'rgba(230, 195, 135, 0.35)',
          gold: '#e6c387',
          goldBright: '#f5d99b',
          goldDim: '#b8924b',
          saffron: '#d97736',
          vermilion: '#b94a28',
          text: '#fbf8ee',
          textMuted: '#e2dac9',
          textDim: '#b0a693',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        'devanagari-sans': ['"Mukta"', '"Noto Sans Devanagari"', 'sans-serif'],
        'devanagari-serif': ['"Noto Serif Devanagari"', 'serif'],
        'devanagari-display': ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
        mukta: ['"Mukta"', '"Noto Sans Devanagari"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        rozha: ['"Rozha One"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
