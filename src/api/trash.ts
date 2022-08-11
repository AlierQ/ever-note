import request from "@/helpers/request";

const URL = {
  GET: "/notes/trash",
  REVERT: "/notes/:noteId/revert",
  DELETE: "/notes/:noteId/confirm",
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then((res: any) => {
          res.data = res.data.sort((note1: any, note2: any) => {
            {
              return (
                new Date(note2.updatedAt).getTime() -
                new Date(note1.updatedAt).getTime()
              );
            }
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  revertNote({ noteId }: { noteId: number }) {
    return request(URL.REVERT.replace(":noteId", noteId.toString()), "PATCH");
  },

  deleteNote({ noteId }: { noteId: number }) {
    return request(URL.DELETE.replace(":noteId", noteId.toString()), "DELETE");
  },
};
