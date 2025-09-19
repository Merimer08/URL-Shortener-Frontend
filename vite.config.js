// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        cors: true
      }
    }
  },
  optimizeDeps: {
    // Recharts depende de react-is; lo pre-empaquetamos para evitar resoluciones fallidas
    include: ['react-is']
  },
  build: {
    // Solo para reducir ruido del warning (puedes quitarlo si quieres)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Divide dependencias pesadas en chunks separados
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          uiVendor: ['react-bootstrap', 'bootstrap'],
          chartsVendor: ['recharts', 'react-is']
        }
      }
    }
  }
})
