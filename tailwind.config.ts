import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  // darkMode: 'class',
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      white: '#f6f6f8',
      gray: '#8d9196',
      eboni: {
        100: '#7b7e81',
        200: '#676a6d',
        300: '#54575b',
        400: '#414548',
        500: '#383c40',
        600: '#2f3337',
        700: '#2d3034',
        800: '#2a2d31',
        900: '#202327',
      },
      negroni: {
        100: '#f3dcbd',
        200: '#f2d7b4',
        300: '#f0d2ab',
        400: '#eecda1',
        500: '#d1b48d',
        600: '#b39a79',
        700: '#776751',
        800: '#3c3429',
        900: '#1e1a15',
      },
    },
    container: {
      screens: {
        '2xl': '1536px',
        '3xl': '1682px',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '1rem',
      base: '1.25rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '3.5rem',
      '5xl': '4rem',
      '6xl': '4.5rem',
      '7xl': '5rem',
      '8xl': '5.5rem',
      '12xl': '12rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
