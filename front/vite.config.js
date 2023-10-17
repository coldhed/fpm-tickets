import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        https: {
            key: fs.readFileSync('frontend.key'),
            cert: fs.readFileSync('frontend.cer'),
            ca: fs.readFileSync('../rootCA.cer')
        }
    },
    base: './',
});
