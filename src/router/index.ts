import { createWebHashHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import Login from "@/components/Login.vue";
const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
