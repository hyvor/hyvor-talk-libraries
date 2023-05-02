import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true
        }),
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: '@hyvor/hyvor-talk-react',
            fileName: 'hyvor-talk-react'
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React'
                },
            },
        },
    },
    resolve: {
        alias: {
            '@root': '../',
        }
    }
})
