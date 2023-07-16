import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svelte(),
        vue(),
    ],
    server: {
        port: 3456
    }
})
