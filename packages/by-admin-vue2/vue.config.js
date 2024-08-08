const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/docschina': {
        target: 'https://www.docschina.org',
        pathRewrite: { '^/docschina': '' },
      },
      '/api': {
        target: 'http://wbytts.w1.luyouxia.net',
        pathRewrite: { '^/api': '' },
      }
    }
  }
});
