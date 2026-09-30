/// <reference types='vitest' />
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  base: '/battleship-app/',
  test: {
    globals: true,
    setupFiles: './__test__/setup.ts',
    environment: 'jsdom',
  },
});
