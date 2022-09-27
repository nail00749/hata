/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'translucentBlack': 'rgba(0,0,0, 0.7)',
      },
      keyframes: {
        'ascent': {
          '0%': {top: '-500px'},
          '100%': {top: '0px'}
        },
        'hide': {
          '0%': {top: '0px'},
          '100%': {top: '1500px'}
        }
      },
      animation: {
        'ascent': 'ascent .5s ease-in-out forwards',
        'hide': 'hide .5s ease-in-out forwards',

      }
    },
  },
  plugins: [],
};
