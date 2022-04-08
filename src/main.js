import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import SettingsPage from "./pages/Settings.vue";
import LoginPage from "./pages/Login.vue";
import NotFoundPage from "./pages/NotFound.vue";
import SettingsApp from "./components/SettingsApp.vue";
import SettingsUser from "./components/SettingsUser.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "Home",
      component: HomePage,
      meta: { needLoggedIn: false },
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
      meta: { needLoggedIn: false },
      children: [
        {
          path: "app",
          component: SettingsApp,
          meta: { needLoggedIn: false },
        },
        {
          path: "user",
          component: SettingsUser,
          meta: { needLoggedIn: false },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem("isLoggedIn")) {
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
  if (to.meta.needLoggedIn && !localStorage.getItem("isLoggedIn")) {
    return "/login";
  }
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
