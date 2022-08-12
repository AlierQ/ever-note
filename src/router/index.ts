import { createWebHashHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
// 路由懒加载
const NotebookList = () => import("@/components/NotebookList.vue");
const NoteDetail = () => import("@/components/NoteDetail.vue");
const TrashDetail = () => import("@/components/TrashDetail.vue");

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      alias: "/notebooks",
      component: NotebookList,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/note",
      name: "NoteDetail",
      component: NoteDetail,
    },
    {
      path: "/trash",
      name: "TrashDetail",
      component: TrashDetail,
    },
  ],
});

export default router;
