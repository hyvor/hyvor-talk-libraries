import { defineConfig } from 'vite';


export default defineConfig({

    build: {
        lib: {
            entry: './src/index.ts',
            name: '@hyvor/hyvor-talk-base',
            fileName: 'hyvor-talk-base',
        },
    }

})