/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here

        backgroundImage: {
          cats: 'url(../../src/assets/Images/playStore.png)',
        },

        green: {
          Primary_1: ' #16956C',
          Primary_2: '#1AB381',
          300: '#bbddce',
          Primary_4: ' #30E0A8',
          500: '#78bc9d',
          600: '#56ab84',
          700: '#359B6C',
          800: '#359B6C',
          900: '#236748',
          1000: '#1a4d36',
          1100: '#113324',
          1200: '#081912',
          1300: '#040e0a',
        },
        status: {
          lemon: '#D5F2FF',
          pending: '#08B6FF',
          warning: '#EDD20B',
          warningbg: '#FEFCF1',
        },
        red: {
          100: '#E03069',
          200: '#B31A4B',
        },
        blue: {
          100: '#1A97B3',
          200: '#30C1E0',
        },
      },
      borderRadius: {
        100: '2px',
      },
      boxShadow: {
        card: ' 0px 4px 6px 0px rgba(62, 73, 84, 0.04)',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
