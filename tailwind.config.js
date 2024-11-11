/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ga-dark': '#111111',
        'ga-white': '#f6f6f6',
        'ga-gray': '#2a2a2a',
        'ga-black': '#000000',
        'ga-pure-white': '#ffffff',
        'ga-light': '#dcdcdc',
      },
      fontFamily: {
        'alata': ['Alata', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}