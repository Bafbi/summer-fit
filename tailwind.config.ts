import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {withMaterialColors} from 'tailwind-material-colors';

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;


module.exports = withMaterialColors(config, {
  // Here, your base colors as HEX values
  // primary is required
  // secondary and/or tertiary are optional, if not set they will be derived from the primary color
  primary: '#ff0000',
  secondary: '#ffff00',
  tertiary: '#0000ff',
  });