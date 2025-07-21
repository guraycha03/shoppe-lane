// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    // This content path is correct. It tells Tailwind where to look for classes.
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
    // Your custom theme is perfectly structured!
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
        // By defining these, you can now use `font-serif` and `font-sans`
        // to apply your custom Google Fonts.
        fontFamily: {
          sans: ['Quicksand', 'sans-serif'],
          serif: ['Cormorant Garamond', 'serif'],
        }
      },
    },
    plugins: [],
  }