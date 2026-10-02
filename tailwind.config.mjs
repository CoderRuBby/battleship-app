export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      keyframes: {
        newGame: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        endGameButton: {
          '0%, 100%': { backgroundColor: 'rgba(6, 6, 6, .93)' },
          '50%': { backgroundColor: 'rgba(16, 72, 117, 1)' },
        },
      },
      animation: {
        'fade-in': 'newGame 3s ease-in-out forwards',
        'bg-transition': 'endGameButton 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
