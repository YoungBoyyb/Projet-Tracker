import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import SettingsPage from "./pages/Settings.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsPage,
    },
  ],
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
