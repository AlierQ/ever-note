import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";

const history = createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: App,
    },
  ],
});

export default router;
