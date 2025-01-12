/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          neon: '#ced4da1a;',
        },
        blue: {
          neon: '#6ea8fe1a',
                },
        red: {
          neon: '#ea868f1a',
        },
        yellow: {
          neon: '#ffda6a1a',
        },
        green: {
          neon: '#75b7981a',
        }
      },
      screens: {
        'sm': { max: '639px' }, 
        'md': { max: '767px' }, 
        'lg': { max: '1023px' }, 
      },
    }
  },
  plugins: [
  ],
}

