import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/danger-noodle',
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib'),
      game: path.resolve(__dirname, 'src/game'),
      utils: path.resolve(__dirname, 'src/utils'),
      assets: path.resolve(__dirname, 'src/assets'),
      stores: path.resolve(__dirname, 'src/stores'),
      constants: path.resolve(__dirname, 'src/constants'),
    },
  },
});
