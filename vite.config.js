import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['./public/overflow.jpg', './public/icon512_maskable.png', './public/icon512_rounded.png'],
      manifest: {
        name: "Overflow",
        short_name: "Overflow",
        themeColors: "#000000",
        background_color: '#000000',
        start_url: '/overflow',
        scope: '/overflow',
        display: 'standalone',
        icons: [
          {
            src: 'icon512_maskable.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon512_rounded.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ],
  base: '/overflow',
})
