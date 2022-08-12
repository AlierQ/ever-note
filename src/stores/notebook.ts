// stores/notebook.js
import { defineStore } from "pinia";
import Notebooks from "@/api/notebooks";
import { ElMessage } from "element-plus";
import Vrouter from "@/router";

export const useNotebooksStore = defineStore("notebooks", {
  // 管理 当前笔记本 和 所有笔记本 的状态
  state: () => {
    return {
      notebooks: [] as any[],
      currentNotebook: {} as any,
    };
  },
  actions: {
    getCurrentNotebook() {
      // 获取route，useRouter和useRoute只能在setup中使用
      const route = Vrouter.currentRoute.value;
      // 返回一个Promise对象便于后续在此基础之上的操作
      return new Promise((resolve, reject) => {
        // 根据当前url的query参数'notebookId'设置当前笔记本
        if (route.query.notebookId) {
          this.notebooks.forEach((notebook) => {
            if (Number(notebook.id) === Number(route.query.notebookId)) {
              this.setCurrentNotebook(notebook);
            }
          });
        } else {
          // 没有则设置第一个笔记本
          this.setCurrentNotebook(this.notebooks[0]);
        }
        resolve("ok");
      });
    },

    // 设置当前笔记本
    setCurrentNotebook(notebook: any) {
      this.currentNotebook = notebook;
    },

    // 设置所有笔记本
    setNotebooks(notebooks: []) {
      this.notebooks = notebooks;
    },

    // 发送请求获取所有笔记本
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
      Notebooks.updateNotebook(notebook.id, { title: notebook.title })
        .then(() => {
          this.notebooks.forEach((n) => {
            if (n.id === notebook.id) {
              n.title = notebook.title;
            }
          });
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
    },

    deleteNotebook(notebook: any) {
      Notebooks.deleteNotebook(notebook.id)
        .then(() => {
          this.notebooks = this.notebooks.filter((n) => {
            return n.id !== notebook.id;
          });
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

    getNotebookTitle(notebookId: any) {
      return this.notebooks.find((n) => {
        return n.id === notebookId;
      });
    },
  },
  getters: {},
});
