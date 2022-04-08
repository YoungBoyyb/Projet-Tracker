import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import SettingsPage from "./pages/Settings.vue";
import SettingsApp from "./components/SettingsApp.vue";
import SettingsUser from "./components/SettingsUser.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
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
      children: [
        {
          path: "app",
          component: SettingsApp,
        },
        {
          path: "user",
          component: SettingsUser,
        },
      ],
    },
  ],
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
