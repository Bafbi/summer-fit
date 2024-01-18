import { type Config } from "tailwindcss";
import {withMaterialColors} from 'tailwind-material-colors';

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        callingCode: ['var(--font1)'],
        firaCode: ['var(--font2)'],
        inter: ['var(--font3)'],
        montserrat: ['var(--font4)'],
        poppins: ['var(--font5)'],
      },
    },
  },
  plugins: [],
} satisfies Config;


module.exports = withMaterialColors(config, {
  // Here, your base colors as HEX values
  // primary is required
  // secondary and/or tertiary are optional, if not set they will be derived from the primary color
  primary: '#fceba3',
  
  }, {extend: true});