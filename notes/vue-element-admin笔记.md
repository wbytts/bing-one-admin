
# 相关资料

项目文档网站：https://panjiachen.github.io/vue-element-admin-site/zh/

花裤衩文章：
- 手摸手，带你用vue撸后台：https://juejin.cn/post/6844903476661583880

Github：
- 默认模板：https://github.com/PanJiaChen/vue-element-admin
- 基础模板：https://github.com/PanJiaChen/vue-admin-template
- 集成TS模板：https://github.com/Armour/vue-typescript-admin-template
- 桌面端模板：https://github.com/PanJiaChen/electron-vue-admin


# vue-admin-template

注意：这个项目不能用 node18，经过我测试 node14和16貌似都可以

```
cd some-projects/vue-admin-template
nvm use 14.18.3  (没有的先 nvm install 14.18.3)
npm i
```

查看 package.json 的 scripts 字段寻找启动命令：
```
npm run dev
```

## 环境问题

详细说明见：https://cli.vuejs.org/zh/guide/mode-and-env.html

如何指定环境运行，即读取指定的 env文件
- 运行的本质是 vue-cli-service serve 这个命令
- 指定env文件使用--mode 参数：`vue-cli-service serve --mode 环境名`
  - 这个命令会读取 `.env.环境名`  这个配置文件
  - 如果不指定
    - serve 时默认是 development 环境
    - 生产打包时是 production 环境


例子：这个脚本就可以加载 .env.staging 环境变量文件
```json
"dev:staging": "vue-cli-service serve --mode staging",
```

## `vue.config.js` Vue-CLI 项目的配置文件

vue.config.js 是 VUE-CLI 的配置，本身是在 Webpack配置上包了一层

### 在 vue.config.js 中更改 webpack 配置

方式1：在 vue.config.js 中的 configureWebpack 选项提供一个对象，该对象将会被 webpack-merge 合并入最终的 webpack 配置

方式2：链式操作 (高级)
https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7


### public 目录

这个目录下的大部分文件不会进行打包处理，会被复制到打包目录

比如UI给的高清图，不放到public里就可能被打包工具压缩，丢失精度
如果本来就想压缩，那就放src下就行
还有其他处理（不止压缩，如svg之类的处理）

如果需要进行资源处理，得放到 `src` 里，一般是 `src/assets`

项目里访问 public下的东西： / 打头
项目里访问 src 里的静态资源：
- 我们先看看静态资源打包后放到了哪里
  - 图片：dist/static/img/xxxxx
  - css：dist/static/css/xxxxx
- 这就导致了，如果我们项目里写死了访问路径，打包后的路径其实是重新规划过得，你会访问不到
  - 如，开发时，一个图片src下的路径是 src/assets/img/a.png
  - 打包后的路径可能就是 dist/static/img/SADAafa.png  （文件名也被哈希过了）
  - 我们可以利用Webpack的 require 函数来计算打包后的路径值

### public/index.html

https://cli.vuejs.org/zh/guide/html-and-static-assets.html#index-%E6%96%87%E4%BB%B6

public/index.html 文件是一个会被 html-webpack-plugin 处理的模板。在构建过程中，资源链接会被自动注入。另外，Vue CLI 也会自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接。


