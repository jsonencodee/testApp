import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

function auth(to, from, next) {
  if (!localStorage.getItem("api_token")) {
    next("/login");
  }
  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("api_token")) {
    next("/");
  }
  next();
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: auth,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: guest,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: guest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
