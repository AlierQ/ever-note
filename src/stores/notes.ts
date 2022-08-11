import { defineStore } from "pinia";
import Notes from "@/api/notes";
import { ElMessage } from "element-plus";
import { useNotebooksStore } from "@/stores/notebook";

export const useNotesStore = defineStore("notes", {
  state: () => {
    return {
      notes: [] as any,
      currentNote: {
        id: undefined,
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      } as any,
    };
  },
  actions: {
    getNotes() {
      const useNotebooks = useNotebooksStore();
      if (useNotebooks.currentNotebook) {
        Notes.getAllNote({
          notebookId: useNotebooks.currentNotebook.id,
        }).then((res: any) => {
          this.setNotes(res.data);
        });
      }
    },

    setNotes(notes: any) {
      this.notes = notes;
    },
    setCurrentNote(note: any) {
      this.currentNote = note;
    },
    updateCurrentNote() {
      return Notes.updateNote(
        { noteId: this.currentNote.id },
        {
          title: this.currentNote.title,
          content: this.currentNote.content,
        }
      );
    },
    deleteCurrentNote() {
      Notes.deleteNote({ noteId: this.currentNote.id })
        .then((res: any) => {
          this.notes = this.notes.filter((note: any) => {
            return note.id !== this.currentNote.id;
          });
          this.currentNote = {
            id: undefined,
            title: "",
            content: "",
            createdAt: "",
            updatedAt: "",
          };
          ElMessage({
            type: "warning",
            message: res.msg,
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err.response.data.msg,
          });
        });
    },
    addNotes() {
      const useNotebooks = useNotebooksStore();
      Notes.addNote(
        { notebookId: useNotebooks.currentNotebook.id },
        { title: "未命名笔记", content: "" }
      ).then((res: any) => {
        // 将新数据插入到Notes中
        this.notes.unshift(res.data);
      });
    },
  },
});
