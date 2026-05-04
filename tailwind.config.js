/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#424B54', // primary background, headers
        },
        secondary: {
          DEFAULT: '#93A8AC', // secondary surfaces, cards
        },
        accent: {
          primary: '#E2B4BD', // primary accent, CTA buttons
          secondary: '#9B6A6C', // secondary accent, hover states
        },
        background: '#FFFFFF', // main background
      },
      fontFamily: {
        heading: ['Poppins', 'DM Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'large': '24px',
        'medium': '16px',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
