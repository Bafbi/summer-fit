import localFont from 'next/font/local';

export const callingCode = localFont({
  src: '../../public/assets/fonts/CallingCode-Regular.ttf',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Times New Roman',
  display: 'auto',
  variable: '--font1',
});
export const firaCode = localFont({
  src: '../../public/assets/fonts/FiraCode-Regular.otf',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Times New Roman',
  display: 'auto',
  variable: '--font2',
});
export const inter = localFont({
  src: '../../public/assets/fonts/Inter-Regular.ttf',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Times New Roman',
  display: 'auto',
  variable: '--font3',
});
export const montserrat = localFont({
  src: '../../public/assets/fonts/Montserrat-Regular.ttf',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Times New Roman',
  display: 'auto',
  variable: '--font4',
});
export const poppins = localFont({
  src: '../../public/assets/fonts/Poppins-Regular.otf',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Times New Roman',
  display: 'auto',
  variable: '--font5',
});