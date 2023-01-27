/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: '280px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
      xxl: '1920px',
      xxxl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      'dark-blue': '#011f44',
      'blue': '#0059bf',
      'yellow': '#ffce4e',
      'warm-blue': '#107ad8',
      'black': '#0c172c',
      'smooth-black': '#10203c',
      'white': '#FFFFFF',
      'milky-white': '#f3f3f3',
      'red': '#ff003b',
      'orange': '#ff8f05',
      'green': '#00db6a',
    },
    fontFamily: {
      sans: ['Graphik', 'Poppins', 'sans-serif'],
      serif: ['Merriweather', 'Noto Serif', 'serif'],
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'md': '0.938rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      keyframes: {
        fadeInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.95, 0.95)' },
          '50%': { opacity: '0.5', transform: 'scale(1.00, 1.00)' },
          '75%': { opacity: '1.0', transform: 'scale(1.05, 1.05)' },
          '100%': { opacity: '1.0', transform: 'scale(1.00, 1.00)' },
        },
      },
      animation: {
        'fadeInBounce': 'fadeInBounce 200ms ease-in 0ms 1 alternate',
      },
      boxShadow: {
        'xsm-spread': 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
        'sm-spread': 'rgba(0, 0, 0, 0.05) 0px 0px 3px 1px',
        'md-spread': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      },
      backgroundImage:{
        dark: 'linear-gradient(to right, #10203c, #0c172c)'
      },
      display: ["group-hover", "group-focus"],
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
