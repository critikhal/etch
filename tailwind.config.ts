import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'coral-red': '#FE3058',
        'midnight-navy': '#000B13',
        'snow-white': '#FDFDFD',
        // Secondary Colors
        'mint-green': '#6CFBAB',
        'cyan': '#78E8EC',
        // Legacy aliases
        primary: {
          DEFAULT: '#FE3058',
          light: '#FFA0B2',
        },
        background: '#FDFDFD',
        text: {
          primary: '#000B13',
          secondary: '#8A969F',
        },
      },
      fontFamily: {
        sans: ['var(--font-league-spartan)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
