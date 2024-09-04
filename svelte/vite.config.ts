/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import {svelteTesting} from '@testing-library/svelte/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    svelteTesting(),
  ],
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
  },
  // @ts-ignore
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
})
