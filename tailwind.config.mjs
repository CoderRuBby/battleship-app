export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        blink: {
          '0%': { backgroundColor: 'rgba(163, 12, 2, .4)' },
          '50%': { backgroundColor: 'rgba(163, 0, 2, 1)' },
          '100%': { backgroundColor: 'rgba(163, 12, 2, .5)' },
        },
        endGameButton: {
          '0%, 100%': { backgroundColor: 'rgba(6, 6, 6, .93)' },
          '50%': { backgroundColor: 'rgba(16, 72, 117, 1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 3s ease-in-out forwards',
        'menu-fade-out': 'fadeOut 2s ease-in-out forwards',
        'fade-out': 'fadeOut 9s ease-in-out forwards',
        'sunk-ship': 'blink ease-in-out 2s 2 forwards',
        'bg-transition': 'endGameButton 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
