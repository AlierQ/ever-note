import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useNotebooksStore } from "@/stores/notebook";

export const useCurrentNotebookStore = defineStore("currentNotebook", {
  state: () => {
    return { currentNotebook: null as any };
  },
  actions: {
    getCurrentNotebook() {
      const useNotebooks = useNotebooksStore();
      useNotebooks.getNotebooks();
      if (useRoute().query.notebookId) {
        useNotebooks.notebooks.forEach((notebook) => {
          if (Number(notebook.id) === Number(useRoute().query.notebookId)) {
            this.setCurrentNotebook(notebook);
          }
        });
      } else {
        this.setCurrentNotebook(useNotebooks.notebooks[0]);
      }
    },

    setCurrentNotebook(notebook: any) {
      this.currentNotebook = notebook;
    },
  },
});
