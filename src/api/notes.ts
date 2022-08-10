import request from "@/helpers/request";

const URL = {
  GET: "/notes/from/:notebookId",
  ADD: "/notes/to/:notebookId",
  UPDATE: "/notes/:noteId",
  DELETE: "/notes/:noteId",
};

export default {
  getAllNote({ notebookId }: { notebookId: number }) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(":notebookId", notebookId.toString()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateNote(
    { noteId }: { noteId: number },
    { title, content }: { title: string; content: string }
  ) {
    return request(URL.UPDATE.replace(":noteId", noteId.toString()), "PATCH", {
      title,
      content,
    });
  },

  deleteNote({ noteId }: { noteId: number }) {
    return request(URL.DELETE.replace(":noteId", noteId.toString()), "DELETE");
  },

  addNote(
    { notebookId }: { notebookId: number },
    { title, content } = { title: "", content: "" }
  ) {
    return request(
      URL.ADD.replace(":notebookId", notebookId.toString()),
      "POST",
      {
        title,
        content,
      }
    );
  },
};
