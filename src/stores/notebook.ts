// stores/notebook.js
import { defineStore } from "pinia";
import Notebooks from "@/api/notebooks";
import { ElMessage } from "element-plus";
import Vrouter from "@/router";

export const useNotebooksStore = defineStore("notebooks", {
  state: () => {
    return {
      notebooks: [] as any[],
      currentNotebook: {} as any,
    };
  },
  actions: {
    getCurrentNotebook() {
      // const useNotebooks = useNotebooksStore();
      const route = Vrouter.currentRoute.value;
      return new Promise((resolve, reject) => {
        if (route.query.notebookId) {
          this.notebooks.forEach((notebook) => {
            if (Number(notebook.id) === Number(route.query.notebookId)) {
              this.setCurrentNotebook(notebook);
            }
          });
        } else {
          this.setCurrentNotebook(this.notebooks[0]);
        }
        resolve("ok");
      });
    },

    setCurrentNotebook(notebook: any) {
      this.currentNotebook = notebook;
    },
    setNotebooks(notebooks: []) {
      this.notebooks = notebooks;
    },

    getNotebooks() {
      return new Promise((resolve, reject) => {
        Notebooks.getAllNotebook()
          .then((res: any) => {
            this.setNotebooks(res.data);
            resolve("ok");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    addNotebook(title: any) {
      Notebooks.addNotebook({ title })
        .then((res: any) => {
          res.data.noteCounts = 0;
          this.notebooks.unshift(res.data);
          ElMessage({
            type: "success",
            message: `创建成功`,
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err.response.data.msg,
          });
        });
    },

    updateNotebook(notebook: any) {
      this.notebooks.forEach((n) => {
        if (n.id === notebook.id) {
          n.title = notebook.title;
          Notebooks.updateNotebook(n.id, { title: n.title })
            .then(() => {
              ElMessage({
                type: "success",
                message: `修改成功`,
              });
            })
            .catch((err) => {
              ElMessage({
                type: "error",
                message: err.response.data.msg,
              });
            });
        }
      });
    },

    deleteNotebook(notebook: any) {
      this.notebooks = this.notebooks.filter((n) => {
        return n.id !== notebook.id;
      });
      Notebooks.deleteNotebook(notebook.id)
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err.response.data.msg,
          });
        });
    },
  },
  getters: {},
});
