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
        primary: {
          DEFAULT: '#FE3058',
          light: '#FFA0B2',
        },
        background: '#FDFDFD',
        text: {
          primary: '#000B13',
          secondary: '#8A969F',
        },
        input: '#F1F3F9',
      },
      fontFamily: {
        sans: ['var(--font-league-spartan)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
