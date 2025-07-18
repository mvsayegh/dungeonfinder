/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#4c1d95',
          950: '#2e1065',
        },
        medieval: {
          800: '#3b2f2f',
          900: '#1c1917',
        },
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
