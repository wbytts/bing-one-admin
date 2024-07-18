import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import TurboConsole from 'unplugin-turbo-console/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Vue
    vueJsx(), // 支持 Vue 的 JSX 语法
    VueDevTools(), // 调试工具
    TurboConsole({}) // console 打印优化
  ],

  // 解析相关
  resolve: {
    // 项目别名配置
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
        // 丙祎家的服务
        target: 'http://wbytts.w1.luyouxia.net',
        // 本地服务
        //target: "http://127.0.0.1:3000",
        rewrite: (p) => p.replace(/^\/by-admin-api/, '')
      }
    }
  }
})
