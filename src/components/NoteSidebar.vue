<template>
  <div class="note-sidebar">
    <span class="add-note" @click="">
      <plus theme="filled" size="18" fill="#4a4a4a" :strokeWidth="3" />
      添加笔记
    </span>
    <el-dropdown
      trigger="click"
      class="notebook-title"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        {{ currentNotebook?.title }}
        <down theme="filled" size="20" fill="#4a4a4a" :strokeWidth="3" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="notebook in notebooks"
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
          :to="`/note?noteId=${note.id}&notebookId=${currentNotebook.id}`"
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
import { useRouter, useRoute } from "vue-router";
import Notebooks from "@/api/notebooks";
import Note from "@/api/notes";
import { formatDate } from "@/helpers/util";

const router = useRouter();

const route = useRoute();

const notebooks = ref();

const notes = ref();

const currentNotebook = ref();

Notebooks.getAllNotebook()
  .then((res: any) => {
    notebooks.value = res.data;
    currentNotebook.value =
      notebooks.value.find((notebook: any) => {
        return Number(notebook.id) === Number(route.query.notebookId);
      }) ||
      res.data[0] ||
      {};
  })
  .then(() => {
    Note.getAllNote({ notebookId: currentNotebook.value.id }).then(
      (res: any) => {
        notes.value = res.data;
      }
    );
  });

const handleCommand = (command: string | number | object) => {
  if (command === "trash") {
    router.push("/trash");
  } else {
    currentNotebook.value = command;
    Note.getAllNote({ notebookId: currentNotebook.value.id }).then(
      (res: any) => {
        notes.value = res.data;
      }
    );
  }
};
</script>

<style lang="less">
@import "@/assets/style/note-sidebar.less";
</style>
