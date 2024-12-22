import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true, // Pastikan port tetap sama
    hmr: {
      overlay: true, // Menampilkan error overlay di browser
    },
  },
});
