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
        white: '#fff',
        '1': 'black',
        '2': '#8f95a4'
      },
      fontSize: {
        f9: '9px',
        f10: '10px',
        f12: '12px',
        f14: '14px',
        md: '16px',
      }
    },
  },
  plugins: [],
}

