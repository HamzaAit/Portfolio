// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    // serve from root in dev, from /<repo>/ in prod
    base: isDev ? '/' : '/Portfolio/',

    plugins: [react()]
  }
})
