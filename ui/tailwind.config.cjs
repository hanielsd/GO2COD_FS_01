/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: '#0074D9',
        primary: '#0074D9',

        blue: {
          1: '#337ab7',
          2: '#2e6da4',
          3: '#6C63FF',
        },
        gray: {
          1: '#ccc',
          2: '#666',
          3: '#ddd',
          5: '#999',
          4: 'rgba(51, 51, 51, 0.1)',
        },
        red: {
          1: '#d9534f',
          2: '#d43f3a',
        },
      },
      fontFamily: {
        body: [" 'Poppins' ", 'sans-serif'],
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        mdp5: '992px',
        lg: '1024px',
        lgp8: '1200px',
        xl: '1280px',
        // Your custom screens here...
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
