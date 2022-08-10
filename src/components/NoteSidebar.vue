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
        笔记本
        <down theme="filled" size="20" fill="#4a4a4a" :strokeWidth="3" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="notebook in notebooks"
            :key="notebook.id"
            :command="notebook.id"
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
          :to="`/note?noteId=${note.id}&notebookId=${$route.query.notebookId}`"
        >
          <span class="title">{{ note.title }}</span>
          <span class="date">{{ note.updatedAtFriendly }}</span>
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

const router = useRouter();

const notebooks = ref();

const notes = ref([
  {
    id: 11,
    title: "这是一个笔记1dasdasdasdasdasdasdasd",
    updatedAtFriendly: "刚刚",
  },
  {
    id: 22,
    title: "这是一个笔记2",
    updatedAtFriendly: "3分钟前",
  },
]);

Notebooks.getAllNotebook().then((res: any) => {
  console.log(res.data);
  notebooks.value = res.data;
});

const handleCommand = (command: string | number | object) => {
  if (command === "trash") {
    router.push("/trash");
  }
};
</script>

<style lang="less">
@import "@/assets/style/note-sidebar.less";
</style>
