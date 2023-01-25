import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.jsx',
        ]),
        {
            name: 'jsx',
            handleHotUpdate({file, server}) {
                if(file.endsWith('.jsx')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*', 
                    });
                }
            }
        },
        react(),
    ],
});
