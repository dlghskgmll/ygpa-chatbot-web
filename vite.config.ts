import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // VITE_USE_MOCK=false 일 때 /api 요청을 로컬 FastAPI로 보낸다
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
