import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',    
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        light: '#ee8bf7',
        DEFAULT: '#7945f7',
        dark: '#8d12e4',
      },
      secondary: {
        light: '#fceba3',
        DEFAULT: '#fce277',
        dark: '#cf8c67',
      },
      background: {
        300: '#272e35',
        200: '#1e252c',
        100: '#171e25', 
        DEFAULT: '#0d1117',
      },
      dialog: {
        title: '#ccdae7',
        DEFAULT: '#a7b5c4',
      },
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      callingCode: ['var(--font1)'],
      firaCode: ['var(--font2)'],
      inter: ['var(--font3)'],
      montserrat: ['var(--font4)'],
      poppins: ['var(--font5)'],
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;