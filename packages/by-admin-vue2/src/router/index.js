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
    path: '/page/a',
    component: () => import("@/views/PageA.vue")
  },
  {
    path: '/page/b',
    component: () => import("@/views/PageB.vue")
  },
  {
    path: '/test/msg',
    component: () => import("@/views/TestMsg.vue")
  },
  {
    path: '/user/:userId',
    component: () => import("@/views/TestUser.vue")
  },
  {
    path: '/test/route/props/:xxx',
    component: () => import("@/views/TestRouteProps.vue"),
    props: true
  }
];

const router = new VueRouter({
  // mode: 'history', // 是否开启 history 模式
  routes,
});

export default router;
