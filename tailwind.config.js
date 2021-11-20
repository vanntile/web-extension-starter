module.exports = {
  mode: 'jit',
  purge: ['./source/**/*.html', './source/**/*.js', './source/**/*.ts', './source/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          gray: '#F5F6F8',
          light_yellow: '#FFF9B1',
          yellow: '#F5D128',
          orange: '#FF9D48',
          light_green: '#D5F692',
          green: '#C9DF56',
          dark_green: '#93D275',
          cyan: '#67C6C0',
          light_pink: '#FFCEE0',
          pink: 'ea94BB',
          violet: '#BE88C7',
          red: '#F16C7F',
          light_blue: '#A6CCF5',
          blue: '#6CD8FA',
          dark_blue: '#7B92FF',
          black: '#000000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
