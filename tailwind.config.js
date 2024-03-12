/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#1ED760",
        "container": "#101010",
        "lightContainer": "#151515"
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in',
        'move': 'move 20s linear infinite'
      },
      keyframes:{
        fadeIn : {
          '0%' : {opacity : '0'},
          '100%' : {opacity: '1'}
        },
        move : {
          '0%' : { transform: 'translate(0, 0)'},
          '100%' : { transform: 'translate(-100%, 0)'}
        }
      }
    },
  },
  plugins: [],
}