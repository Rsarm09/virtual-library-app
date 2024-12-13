/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'sans-serif'],
        'nunito': ['nunito', 'sans-serif'],
      },
      colors: {
        'sienna': '#772F1A',
        'field': '#585123',
      },
    },
  },
  plugins: [],
}

