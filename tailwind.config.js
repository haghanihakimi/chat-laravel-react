const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
    './resources/js/**/*.jsx',
  ],

  theme: {
    screens: {
      x2sm: '280px',
      xsm: '480px',
      sm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
      xxl: '1920px',
      xxxl: '1440px',
    },
    colors: {
      // Palette
      'dark-blue': '#011f44',
      'blue': '#0059bf',
      'yellow': '#ffce4e',


      'transparent': 'transparent',
      //'blue': '#0088ff',
      'warm-blue': '#107ad8',
      'black': '#151630',
      'smooth-black': '#151630',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'red': '#e3342f',
      'orange': '#ff6047',
      'green': '#0ea785',
      'yellow': '#fad226',
      'yellow-gold': '#f3b422',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white-fc': '#fcfcfc',
      'white': '#ffffff',
      'alpha-white': 'hsla(201, 100%, 100%, 0.95)',
      'clouds-50': '#F2F2F2',
      'clouds-100': '#F5F5F5',
      'clouds-200': '#e8ebf5',
      'thin-black': 'hsla(238, 39%, 14%, 0.075)',
      'thick-black': 'hsla(238, 39%, 14%, 0.15)',
      'thin-white': '#fcfcfc',
      'afterpay': '#b8edd8'
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
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'rounded': '3px',
      },
      keyframes: {
        fadeInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.95, 0.95)' },
          '50%': { opacity: '0.5', transform: 'scale(1.00, 1.00)' },
          '75%': { opacity: '1.0', transform: 'scale(1.05, 1.05)' },
          '100%': { opacity: '1.0', transform: 'scale(1.00, 1.00)' },
        },
        fadeHomeHero: {
          '0%': { transform: 'translateY(-70%)' },
          '100%': { transform: 'translateY(-40%)' },
        }
      },
      animation: {
        'fadeInBounce': 'fadeInBounce 300ms ease-in 0ms 1 alternate',
        'fadeHomeHero': 'fadeHomeHero 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms 1 alternate',
      },
      boxShadow: {
        'xsm-spread': 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
        'sm-spread': 'rgba(0, 0, 0, 0.05) 0px 0px 3px 1px',
        'md-spread': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      },
      backgroundImage: {
        'homeHeroImage': "url('https://mdbootstrap.com/img/new/textures/full/142.jpg')",
      },
      backgroundPosition: {
        'p-0': '0%',
        'p-10': '10%',
        'p-20': '20%',
        'p-30': '30%',
        'p-40': '40%',
        'p-50': '50%',
        'p-60': '60%',
        'p-70': '70%',
        'p-80': '80%',
        'p-90': '90%',
        'p-100': '100%',
      },
      display: ["group-hover", "group-focus"],
    }
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'),
  ]
};
