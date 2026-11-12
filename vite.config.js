import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        preple: resolve(root, 'preple/index.html'),
        shopez: resolve(root, 'shopez/index.html'),
        gameOn: resolve(root, 'game-on/index.html'),
      },
    },
  },
})
