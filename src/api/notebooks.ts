import request from "@/helpers/request";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id",
};

export default {
  getAllNotebook() {
    return request(URL.GET);
  },
  updateNotebook(notebookId: number, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId.toString()), "PATCH", {
      title,
    });
  },
  deleteNotebook(notebookId: number) {
    return request(URL.DELETE.replace(":id", notebookId.toString()), "DELETE");
  },
  addNotebook({ title = "新建笔记本" } = { title: "新建笔记本" }) {
    return request(URL.ADD, "POST", { title });
  },
};
