import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from '@honkhonk/vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    react(),
    tsconfigPaths(),
    svgr({ keepEmittedAssets: true }),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      }
    }),
  ],
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
