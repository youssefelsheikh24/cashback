/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // `white` is the primary foreground; mapping it to a CSS var makes
        // every text-white / border-white/x / bg-white/x utility theme-aware.
        white: 'rgb(var(--fg-rgb) / <alpha-value>)',
        brand: {
          // Accent token — defaults to gold, but driven by a CSS var so a single
          // page (e.g. /studio) can re-theme every accent to red and revert on exit.
          red: 'rgb(var(--accent-rgb) / <alpha-value>)',
          black: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
          gray: 'rgb(var(--muted-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
