import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // 改成你想要的端口号
    strictPort: true, // 如果端口被占用则直接报错，不自动换端口
  }
})
