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
      },
      transitionProperty: {
        'position-size': 'top,left,width,height',
      },
    },
  },
  plugins: [],
}
