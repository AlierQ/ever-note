import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import Vrouter from "@/router";

import { useNotebooksStore } from "@/stores/notebook";

export const useCurrentNotebookStore = defineStore("currentNotebook", {
  state: () => {
    return { currentNotebook: null as any };
  },
  actions: {
    getCurrentNotebook() {
      const useNotebooks = useNotebooksStore();
      const route = Vrouter.currentRoute.value;
      return new Promise((resolve, reject) => {
        if (route.query.notebookId) {
          useNotebooks.notebooks.forEach((notebook) => {
            if (Number(notebook.id) === Number(route.query.notebookId)) {
              this.setCurrentNotebook(notebook);
            }
          });
        } else {
          this.setCurrentNotebook(useNotebooks.notebooks[0]);
        }
        resolve("ok");
      });
    },

    setCurrentNotebook(notebook: any) {
      this.currentNotebook = notebook;
    },
  },
});
