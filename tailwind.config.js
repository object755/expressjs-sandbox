/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    // require('autoprefixer'),
  ],
};
