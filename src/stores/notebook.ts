// stores/notebook.js
import { defineStore } from "pinia";
import Notebooks from "@/api/notebooks";
import { ElMessage, ElMessageBox } from "element-plus";
export const useNotebooksStore = defineStore("notebooks", {
  state: () => {
    return { notebooks: [] as any[] };
  },
  actions: {
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
