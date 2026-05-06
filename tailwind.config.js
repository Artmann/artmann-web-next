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
        'navy-900': '#060d19',
        paper: '#F4EFE6',
        ink: '#111111',
        'accent-red': '#E63946',
        'accent-yellow': '#F4C430',
        'accent-blue': '#1D4ED8'
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif']
      },
      spacing: {
        84: '21rem',
        96: '24rem',
        256: '42rem'
      }
    }
  },
  variants: {}
}
