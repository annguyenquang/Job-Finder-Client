import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                foreground: 'var(--foreground)',
                background: '#eff3fc',
                primary: '#6a93d9',
                secondary: '#2d3748',
                text: '#ffffff',
                textHover: '#4a5568'
            }
        }
    },
    plugins: []
};
export default config;
