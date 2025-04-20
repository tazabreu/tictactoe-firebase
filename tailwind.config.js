/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        neon: { pink: '#FF6EC7', teal: '#00F5D4' },
        'bg-light': '#F5F5F5', 'bg-dark': '#111111',
      },
      keyframes: { /* your flicker/pulse definitions */ },
      animation: { /* your animations */ },
    },
  },
  plugins: [],
};
