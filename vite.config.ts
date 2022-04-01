import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
