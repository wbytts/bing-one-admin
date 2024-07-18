import Vue from "vue";
import './fix'
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = new VueRouter({
  // mode: 'history', // 是否开启 history 模式
  routes,
});

export default router;
