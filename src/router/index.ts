import { createWebHashHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
import NotebookList from "@/components/NotebookList.vue";
import NoteDetail from "@/components/NoteDetail.vue";
import TrashDetail from "@/components/TrashDetail.vue";
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
