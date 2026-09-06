export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      keyframes: {
        endGameButton: {
          '0%, 100%': { backgroundColor: 'rgba(6, 6, 6, .93)' },
          '50%': { backgroundColor: 'rgba(16, 72, 117, 1)' },
        },
      },
      animation: {
        'bg-transition': 'endGameButton 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
