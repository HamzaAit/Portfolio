// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    // serve from root in dev, from /<repo>/ in prod
    base: isDev ? '/' : '/Portfolio/',

    plugins: [react()],

    // Enable network access for mobile testing
    server: {
      host: true,      // Allow external connections (alternative to 0.0.0.0)
      port: 5173,      // Use Vite's default port
      open: false,     // Don't auto-open browser
      strictPort: false // Allow port fallback if busy
    }
  }
})
