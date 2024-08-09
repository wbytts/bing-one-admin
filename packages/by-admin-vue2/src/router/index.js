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
  {
    path: "/docschina",
    component: () => import("@/pages/docschina/index.vue"),
    children: []
  },
  {
    path: "/login",
    component: () => import("@/pages/login/login.vue")
  },

];

const router = new VueRouter({
  // mode: 'history', // 是否开启 history 模式
  routes,
});

router.beforeEach((to, from, next) => {
  
  next()
})

export default router;
