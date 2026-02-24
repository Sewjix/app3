import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#F0F3F8',
        'navy-primary': '#0D1B4B',
        'navy-secondary': '#1A3A8F',
        'accent-blue': '#4A90D9',
        'accent-green': '#27AE60',
        'accent-amber': '#F5A623',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
      },
    },
  },
  plugins: [],
};

export default config;
