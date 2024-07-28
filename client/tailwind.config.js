/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
    './pages/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Comic Sans MS"', 'cursive'], // You can replace this with any cursive font you prefer
      },
      keyframes: {
        bubble: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
      },
      animation: {
        bubble1: 'bubble 0s infinite',
        bubble2: 'bubble 0.2s infinite',
        bubble3: 'bubble 0,3s infinite',
        bubble4: 'bubble 0.4s infinite',
        bubble5: 'bubble 0.5s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}