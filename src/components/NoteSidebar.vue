<template>
  <div class="note-sidebar">
    <span class="add-note" @click="addNote">
      <plus theme="filled" size="18" fill="#4a4a4a" :strokeWidth="3" />
      添加笔记
    </span>
    <el-dropdown
      trigger="click"
      class="notebook-title"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        {{ useCurrentNotebook.currentNotebook!.title }}
        <down theme="filled" size="20" fill="#4a4a4a" :strokeWidth="3" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="notebook in useNotebooks.notebooks"
            :key="notebook.id"
            :command="notebook"
          >
            <notebook-one
              theme="outline"
              size="16"
              fill="#606266"
              :strokeWidth="3"
            />&nbsp;{{ notebook.title }}</el-dropdown-item
          >
          <el-dropdown-item command="trash">
            <delete-one
              theme="outline"
              size="16"
              fill="#606266"
              :strokeWidth="3"
            />
            &nbsp;回收站
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="menu">
      <div>标题</div>
      <div>更新时间</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link
          :class="{
            ['active']: Number($route.query.noteId) === Number(note.id),
          }"
          :to="`/note?noteId=${note.id}&notebookId=${useCurrentNotebook.currentNotebook.id}`"
        >
          <span class="title">{{ note.title }}</span>
          <span class="date">{{ formatDate(note.updatedAt) }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Down, Plus, DeleteOne, NotebookOne } from "@icon-park/vue-next";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Notebooks from "@/api/notebooks";
import Note from "@/api/notes";
import { formatDate } from "@/helpers/util";
import { getCurrentInstance } from "vue";
import { useNotebooksStore } from "@/stores/notebook";
import { useCurrentNotebookStore } from "@/stores/currentNotebooks";

// pinia全局状态管理
const useNotebooks = useNotebooksStore();
const useCurrentNotebook = useCurrentNotebookStore();
// 初始化数据
useNotebooks.getNotebooks();
useCurrentNotebook.getCurrentNotebook();

const instance = getCurrentInstance();

// 接收外部参数，没有使用，可以不接收
// defineProps(["notes"]);

const emit = defineEmits(["update:notes"]);

const router = useRouter();

const notebooks = ref();

const notes = ref();

Notebooks.getAllNotebook()
  .then((res: any) => {
    notebooks.value = res.data;
  })
  .then(() => {
    Note.getAllNote({ notebookId: useCurrentNotebook.currentNotebook.id }).then(
      (res: any) => {
        notes.value = res.data;
        // 自定义事件，将notes交给父组件，进行双向绑定
        emit("update:notes", notes.value);
      }
    );
  });

const handleCommand = (command: string | number | object) => {
  if (command === "trash") {
    router.push("/trash");
  } else {
    useCurrentNotebook.setCurrentNotebook(command);
    Note.getAllNote({ notebookId: useCurrentNotebook.currentNotebook.id }).then(
      (res: any) => {
        notes.value = res.data;
        emit("update:notes", notes.value);
        router.push(
          "/note?notebookId=" + useCurrentNotebook.currentNotebook.id
        );
      }
    );
  }
};

const addNote = () => {
  Note.addNote(
    { notebookId: useCurrentNotebook.currentNotebook.id },
    { title: "未命名笔记", content: "" }
  ).then((res: any) => {
    // 将新数据插入到Notes中
    notes.value.unshift(res.data);
    // 跳转url到新增笔记页面
    router.push(
      "/note?noteId=" +
        res.data.id +
        "&notebookId=" +
        useCurrentNotebook.currentNotebook.id
    );
  });
};

// 订阅updateNotes事件，更新Notes
instance?.proxy?.$Bus.on("updateNotes", () => {
  Note.getAllNote({ notebookId: useCurrentNotebook.currentNotebook.id }).then(
    (res: any) => {
      notes.value = res.data;
      emit("update:notes", notes.value);
      router.push("/note?notebookId=" + useCurrentNotebook.currentNotebook.id);
    }
  );
});
</script>

<style lang="less">
@import "@/assets/style/note-sidebar.less";
</style>
