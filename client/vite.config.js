import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',      // change from default "dist"
    emptyOutDir: true     // clears build folder before build
  },
  plugins: [react()],
  server: {
    port: 3000
  }
})