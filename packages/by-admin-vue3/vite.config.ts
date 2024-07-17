import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 本地开发服务
  server: {
    host: '127.0.0.1',
    port: 8888,
    proxy: {
      '/by-admin-api': {
        target: 'http://wbytts.w1.luyouxia.net',
        //target: "http://127.0.0.1:3000",
        rewrite: (p) => p.replace(/^\/by-admin-api/, '')
      }
    }
  }
})
