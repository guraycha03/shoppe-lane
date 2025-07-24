// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
   
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
    theme: {
      extend: {
        colors: {
          bgMain: '#FAF5EF',
          bgBanner: '#F2E8DA',
          textDark: '#3B3028',
          textSoft: '#7D6F61',
          cardBg: '#FFFDF9',
          button: '#A47551',
          buttonHover: '#916746',
          accent: '#E4D1B9',
        },
   
        fontFamily: {
          sans: ['Quicksand', 'sans-serif'],
          serif: ['Cormorant Garamond', 'serif'],
        }
      },
    },
    plugins: [],
  }