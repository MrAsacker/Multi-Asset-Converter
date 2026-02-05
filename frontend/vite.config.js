import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration for the React app
export default defineConfig({
  // Plugins: React for JSX, Tailwind for styling
  plugins: [react(), tailwindcss()],
  
  server: {
    // During development, redirect /api requests to our backend on port 5000
    // This prevents CORS issues while developing locally
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  build: {
    outDir: 'dist',           // Output built files to 'dist' folder
    sourcemap: false,         // Don't include source maps in production
    minify: 'terser',        // Minify code to reduce file size
  },
})
