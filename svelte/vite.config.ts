import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
        entry: 'src/index.ts',
        name: '@hyvor/hyvor-talk-svelte',
        fileName: 'hyvor-talk-svelte'
    },
    rollupOptions: {
        external: ['svelte', 'svelte/internal'],
        output: {
            globals: {
                svelte: 'Svelte'
            },
        },
    },
  }
})
