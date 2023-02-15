module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './public/**/*.html'
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        'navy-400': '#1F253C',
        'navy-700': '#0C192F',
        'navy-900': '#060d19'
      },
      spacing: {
        '84': '21rem',
        '96': '24rem',
        '256': '42rem'
      }
    },
  },
  variants: {},
}
