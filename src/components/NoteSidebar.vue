<template>
  <div class="note-sidebar">
    <span class="add-note" @click="">
      <plus theme="filled" size="18" fill="#4a4a4a" :strokeWidth="3" />
      添加笔记
    </span>
    <el-dropdown trigger="click" class="notebook-title">
      <span class="el-dropdown-link">
        笔记本
        <down theme="filled" size="20" fill="#4a4a4a" :strokeWidth="3" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li>
        <router-link :to="`/note?noteId=111&notebookId=111`">
          <span class="date">{{ "2020-08-10" }}</span>
          <span class="title">{{ "笔记1" }}</span>
        </router-link>
      </li>
      <li>
        <router-link :to="`/note?noteId=111&notebookId=111`">
          <span class="date">{{ "2020-08-10" }}</span>
          <span class="title">{{ "笔记1" }}</span>
        </router-link>
      </li>
      <li>
        <router-link :to="`/note?noteId=111&notebookId=111`">
          <span class="date">{{ "2020-08-10" }}</span>
          <span class="title">{{ "笔记1" }}</span>
        </router-link>
      </li>
      <li>
        <router-link :to="`/note?noteId=111&notebookId=111`">
          <span class="date">{{ "2020-08-10" }}</span>
          <span class="title">{{ "笔记1" }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Down, Plus } from "@icon-park/vue-next";
</script>

<style lang="less">
@import "@/assets/style/note-sidebar.less";
</style>
