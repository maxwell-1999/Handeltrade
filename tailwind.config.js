/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        horizontalSm: '32px'
      },
      colors: {
        brand: '#a474f3',
        lightBrand: '#eae5fb',
        white: '#fff',
        '1': 'black',
        '2': '#8f95a4',
        '1b': '#fff',
        '2b': '#F6F7FC',
        '3b': '#0D0D0D0D',
      },
      fontSize: {
        f9: '9px',
        f10: '10px',
        f12: '12px',
        f14: '14px',
        md: '16px',
        lg: '22px',
      }
    },
  },
  plugins: [],
}

