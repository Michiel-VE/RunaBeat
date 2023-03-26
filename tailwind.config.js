/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        akira: ['AKIRA', 'sans-serif'],
      },
      colors: {
        'orange': '#FE885D',
      },
    },
  },
  plugins: [],
}
