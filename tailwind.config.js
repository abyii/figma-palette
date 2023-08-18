/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ['src/app/**/*.{html, jsx, tsx, js, ts}', 'dist/ui.html'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
