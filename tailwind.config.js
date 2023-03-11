const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
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
      'blue': '#006ce0',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1.0' },
        },
        fadeInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.95, 0.95)' },
          '50%': { opacity: '0.5', transform: 'scale(1.00, 1.00)' },
          '75%': { opacity: '1.0', transform: 'scale(1.05, 1.05)' },
          '100%': { opacity: '1.0', transform: 'scale(1.00, 1.00)' },
        },
        alertFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95, 0.95)', transform: 'translateX(0)' },
          '25%': { opacity: '0.25', transform: 'scale(1.075, 1.075)', transform: 'translateX(-1%)' },
          '50%': { opacity: '0.5', transform: 'scale(1.075, 1.075)', transform: 'translateX(1%)' },
          '75%': { opacity: '0.75', transform: 'scale(1.075, 1.075)', transform: 'translateX(-1%)' },
          '100%': { opacity: '1.0', transform: 'scale(1.00, 1.00)', transform: 'translateX(0)' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 200ms ease-in 0ms 1 alternate',
        'fadeInBounce': 'fadeInBounce 200ms ease-in 0ms 1 alternate',
        'alertFadeIn': 'alertFadeIn 200ms ease-in 0ms 1 alternate',
      },
      boxShadow: {
        'xsm-spread': 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
        'sm-spread': 'rgba(0, 0, 0, 0.05) 0px 0px 3px 1px',
        'md-spread': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        'warm': 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
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
