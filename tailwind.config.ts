import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        background: '#FAFAFA',
        primary: '#19734e',
        secondary: '#145c3e',
        text: '#ffffff',
        textHover: '#4a5568'
      }
    }
  },
  plugins: []
}
export default config
