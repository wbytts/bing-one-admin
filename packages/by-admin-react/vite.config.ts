import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import path from "path";
import TurboConsole from "unplugin-turbo-console/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 支持 React 开发
    UnoCSS(),
    TurboConsole({}),
  ],

  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 本地开发服务
  server: {
    host: "127.0.0.1",
    port: 8888,
    proxy: {
      "/by-admin-api": {
        // 丙祎家的服务
        target: "http://wbytts.w1.luyouxia.net",
        // 本地服务
        //target: "http://127.0.0.1:3000",
        rewrite: (p) => p.replace(/^\/by-admin-api/, ""),
      },
    },
  },
});
