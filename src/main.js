import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";

const LoginPage = () => import("./pages/Login.vue");
const SettingsPage = () => import("./pages/Settings.vue");
const NotFoundPage = () => import("./pages/NotFound.vue");
const SettingsApp = () => import("./components/SettingsApp.vue");
const SettingsUser = () => import("./components/SettingsUser.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "Home",
      component: HomePage,
      meta: { needJsonBin: true },
      children: [
        {
          path: "/home/:taskID",
          component: HomePage,
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsPage,
      meta: { needJsonBin: false },
      children: [
        {
          path: "app",
          component: SettingsApp,
          meta: { needJsonBin: false },
        },
        {
          path: "user",
          component: SettingsUser,
          meta: { needJsonBin: false },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem("jsonBinAccess")) {
          return false;
        }
      },
    },
    {
      path: "/notfound",
      name: "NotFound",
      component: NotFoundPage,
    },
    {
      path: "/:wrongPath(.*)",
      redirect: (to) => {
        return { name: "NotFound", params: { wrongPath: to.params.wrongPath } };
      },
    },
  ],
});

router.beforeEach((to, from) => {
  /* global localStorage */
  if (to.meta.needJsonBin && !localStorage.getItem("jsonBinAccess")) {
    return "/settings/app";
  }
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
