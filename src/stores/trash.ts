import { defineStore } from "pinia";
import Trash from "@/api/trash";
import { ElMessage } from "element-plus";
export const useTrashStore = defineStore("trash", {
  state: () => {
    return {
      trashNotes: [] as any,
      currentNote: {} as any,
    };
  },
  actions: {
    getTrashNotes() {
      Trash.getAll().then((res: any) => {
        console.log(res);

        this.setTrashNotes(res.data);
      });
    },
    setTrashNotes(trashNotes: any) {
      this.trashNotes = trashNotes;
    },

    setCurrentNote(note: any) {
      this.currentNote = note;
    },
    deleteNote(note: any) {
      Trash.deleteNote({ noteId: note.id }).then(() => {
        this.trashNotes = this.trashNotes.filter((n: any) => {
          return n.id !== note.id;
        });
        this.currentNote = {};
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    },
    revertNote(note: any) {
      Trash.revertNote({ noteId: note.id }).then(() => {
        this.trashNotes = this.trashNotes.filter((n: any) => {
          return n.id !== note.id;
        });
        this.currentNote = {};
        ElMessage({
          type: "success",
          message: "恢复成功",
        });
      });
    },
  },
});
