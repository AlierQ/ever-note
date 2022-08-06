import { createWebHashHistory, createRouter } from "vue-router";
import App from "@/App.vue";
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
      name: "App",
      component: App,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/notebooks",
      name: "NotebookList",
      component: NotebookList,
    },
    {
      path: "/note/:noteId",
      name: "NoteDetail",
      component: NoteDetail,
    },
    {
      path: "/trash/:noteId",
      name: "TrashDetail",
      component: TrashDetail,
    },
  ],
});

export default router;
