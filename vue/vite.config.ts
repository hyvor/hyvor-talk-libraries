import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: '@hyvor/hyvor-talk-vue',
            fileName: 'hyvor-talk-vue'
        },
        rollupOptions: {
            external: ['vue'],
        }
    }
})
