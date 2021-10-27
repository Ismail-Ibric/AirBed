module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'stars': "url('/stars.jpg')"
       },
       zIndex: {
         'n100': '-100'
       }
    },
    fontFamily: {
      'rosse': ['Rossetti'],
      'blogS': ['BlogScriptW00-Regular'],
      'sleep': ['Last to sleep']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar-hide')
  ],
}
