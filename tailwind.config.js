/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        horizontalSm: '10px'
      },
      colors: {
        brand: '#3C32A3',
        lightBrand: '#DBE7FF',
        white: '#fff',
        brandGrey: "#f6f7fc",
        // brandGrey: "pink",
        '1': 'black',
        '2': '#8f95a4',
        '1b': '#fff',
        '2b': '#F6F7FC',
        '3b': '#f3f3f3',
        'grey2': '#eaebf0',
        'grey1': "#f6f7fc",


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

