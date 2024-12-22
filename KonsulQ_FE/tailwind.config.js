/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}", // Pastikan mencakup file HTML, JS, JSX, TSX, dan CSS
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Menambahkan font Poppins
      },
    },
  },
  plugins: [],
};
