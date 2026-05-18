import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  
  server: {
    port: 5173,
    open: true,
    // Enable serving static files from public directory
    fs: {
      strict: false,
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    
    // Asset handling configuration
    assetsDir: 'assets',
    assetsInlineLimit: 0, // Never inline assets (always separate files)
    
    // Don't include kanji_data in build (now managed externally)
    copyPublicDir: true,
    
    rollupOptions: {
      // Exclude kanji_data from build
      external: [],
      
      output: {
        // Organize assets in output directory
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        
        // Manual chunks for better caching
        manualChunks: {
          // React vendor chunk
          react: ['react', 'react-dom'],
          // Asset service and components
          assets: [
            './src/services/AssetService.ts',
            './src/components/AssetLoader.tsx',
          ],
          // Kanji-related
          kanji: [
            './src/hooks/useKanji.ts',
            './src/components/Kanji.tsx',
            './src/data/kanjiDatabase.ts',
          ],
        },
      },
    },
    
    // Performance optimizations
    // Disable CSS code splitting for smaller files
    cssCodeSplit: false,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [],
  },
  
  // Prevent bundling of external URLs
  // This ensures that remote asset URLs are not processed by Vite
  // Asset storage configuration is loaded from .env file
  define: {},
});
