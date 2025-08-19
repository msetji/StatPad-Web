import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        charcoal: '#111827',
        accentGreen: '#12B76A',
        accentPurple: '#7C3AED',
        accentPink: '#F43F5E',
        accentBlue: '#3B82F6',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;