/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': '#0074ff',
      'secondary': '#A1197B',
      'secondary-dark': '#4c0c3a',
      'white': '#FFFFFF',
      'background': '#F5F5F5',
      'background-dark': '#1a1a1a',
      'red': '#DE1A1A',
      'green': '#04A777',
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s',
      },
    },
  },
  plugins: [],
};
