import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Use function form for manual chunks (recommended approach)
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Motion vendor chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          // UI vendor chunk
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/class-variance-authority')) {
            return 'ui-vendor';
          }
          // Router vendor chunk
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Analytics vendor chunk
          if (id.includes('node_modules/@vercel/analytics') || 
              id.includes('node_modules/@vercel/speed-insights')) {
            return 'analytics-vendor';
          }
          // Other vendor chunks
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Improve HMR performance
    hmr: {
      overlay: false,
    },
  },
  // Pre-bundle dependencies for faster dev server startup
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      'react-router-dom',
      '@vercel/analytics',
      '@vercel/speed-insights'
    ],
  },
  // Improve build performance
  esbuild: {
    // Remove console.log in production
    drop: ['console', 'debugger'],
  },
})
