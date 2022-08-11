import { defineStore } from "pinia";
import Notes from "@/api/notes";
import { useRouter } from "vue-router";
import { useCurrentNotebookStore } from "@/stores/currentNotebooks";
export const useNotesStore = defineStore("notes", {
  state: () => {
    return { notes: null as any };
  },
  actions: {
    getNotes() {
      const useCurrentNotebook = useCurrentNotebookStore();
      if (useCurrentNotebook.currentNotebook) {
        Notes.getAllNote({
          notebookId: useCurrentNotebook.currentNotebook.id,
        }).then((res: any) => {
          this.setNotes(res.data);
        });
      }
    },

    setNotes(notes: any) {
      this.notes = notes;
    },
    addNotes() {
      const useCurrentNotebook = useCurrentNotebookStore();
      const router = useRouter();
      Notes.addNote(
        { notebookId: useCurrentNotebook.currentNotebook.id },
        { title: "未命名笔记", content: "" }
      ).then((res: any) => {
        // 将新数据插入到Notes中
        this.notes.unshift(res.data);
        // 跳转url到新增笔记页面
        // router.push(
        //   "/note?noteId=" +
        //     res.data.id +
        //     "&notebookId=" +
        //     useCurrentNotebook.currentNotebook.id
        // );
      });
    },
  },
});
