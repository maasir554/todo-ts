import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

// just so that vite dev server is accessible on my phone:
export default defineConfig({
    server: {
      host: '0.0.0.0',
    },
    
    base:"/todo-ts/",

    plugins: [
      VitePWA({ 
        registerType: 'autoUpdate',
        manifest:{
          name: 'ToDude: todo app made with TypeScript',
          short_name: 'ToDude',
          description: 'A simple todo-app made using TS, latest CSS features, and Vite',
          theme_color: '#195EC6',
          icons: [
            {
              src: '/logo-192x192.svg',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/logo-512x512.svg',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        }
    }),
    ]
  
  });
