import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 取消生产提示
Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'mini' });

// 创建Vue实例
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

// 挂载根实例
app.$mount("#app");

// 调试用
window._app = app;
