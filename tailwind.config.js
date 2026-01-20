/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        cv: {
          primary: '#1a365d',
          secondary: '#2d3748',
          accent: '#3182ce',
          light: '#f7fafc',
          border: '#e2e8f0',
        }
      },
      spacing: {
        'a4-width': '210mm',
        'a4-height': '297mm',
      }
    },
  },
  plugins: [],
}
