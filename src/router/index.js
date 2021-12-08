import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("../views/SignIn"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("../views/SignUp"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
