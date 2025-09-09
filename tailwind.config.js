/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-primary': '#FCD34D',
        'yellow-secondary': '#FEF3C7',
        'yellow-accent': '#F59E0B',
      },
    },
  },
  plugins: [],
}

