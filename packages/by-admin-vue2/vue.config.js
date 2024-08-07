const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/docschina': {
        target: 'https://www.docschina.org',
        pathRewrite: { '^/docschina': '' },
      }
    }
  }
});
