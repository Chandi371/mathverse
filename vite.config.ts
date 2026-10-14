import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('katex')) return 'katex';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('pdfjs-dist')) return 'pdfjs';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
