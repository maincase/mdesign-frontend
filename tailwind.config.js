/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        full: '0px 0px 0px 10000px rgba(0, 0, 0, 0.4)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '3d': '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      },
      transitionProperty: {
        'position-size': 'top,left,width,height',
      },
      lineHeight: {
        'extra-loose': '2.5',
        5.5: '1.45rem',
      },
    },
  },
  plugins: [],
}
