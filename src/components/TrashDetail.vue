<template>
  <div id="trash">
    <div class="note-sidebar">
      <h3>回收站</h3>
      <div class="menu">
        <div>标题</div>
        <div>更新时间</div>
      </div>
      <ul class="notes">
        <li v-for="note in useTrash.trashNotes" :key="note.id">
          <router-link
            :to="`/trash?noteId=${note.id}`"
            @click="onSelectNote(note)"
            :class="{
              ['active']: useTrash.currentNote?.id === note.id,
            }"
          >
            <span class="title">{{ note.title }}</span>
            <span class="date">{{ formatDate(note.updatedAt) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-detail">
        <div class="note-empty" v-show="!useTrash.currentNote.id">
          请选择笔记
        </div>
        <div class="note-detail-ct" v-show="useTrash.currentNote.id">
          <div class="note-bar">
            <span>
              创建日期: {{ formatDate(useTrash.currentNote.createdAt) }}</span
            >
            <span>
              更新日期: {{ formatDate(useTrash.currentNote.updatedAt) }}</span
            >
            <span>
              {{
                "所属笔记本：" +
                useNotebooks.getNotebookTitle(useTrash.currentNote.notebookId)
                  ?.title
              }}</span
            >
            <span @click="deleteNote(useTrash.currentNote)"> 彻底删除 </span>
            <span @click="revertNote(useTrash.currentNote)"> 恢复 </span>
          </div>
          <div class="note-title">
            <input
              type="text"
              placeholder="输入标题"
              :value="useTrash.currentNote.title"
              disabled
            />
          </div>
          <div class="editor">
            <textarea placeholder="输入内容, 支持 markdown 语法" disabled>{{
              useTrash.currentNote.content
            }}</textarea>
            <div
              class="preview markdown-body"
              v-html="md.render(useTrash.currentNote.content || '')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Auth from "@/api/auth";
import { useTrashStore } from "@/stores/trash";
import { formatDate } from "@/helpers/util";
import MarkdownIt from "markdown-it";
import mdhighlight from "markdown-it-highlightjs";
import "@/assets/style/code-style.less";
import hljs from "highlight.js";
import { ElMessage, ElMessageBox } from "element-plus";

import { useNotebooksStore } from "@/stores/notebook";

// pinia全局状态管理
const useNotebooks = useNotebooksStore();
useNotebooks.getNotebooks();

const md = new MarkdownIt().use(mdhighlight, {
  auto: true,
  hljs: hljs,
});

const router = useRouter();

const route = useRoute();

const useTrash = useTrashStore();

useTrash.getTrashNotes();

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

watchEffect(() => {
  if (useTrash.trashNotes && route.query.noteId) {
    if (useTrash.trashNotes.length === 0) return;
    const temp = useTrash.trashNotes.filter((note: any) => {
      return Number(route.query.noteId) === Number(note.id);
    })[0];
    if (temp !== undefined) {
      useTrash.currentNote = temp;
    } else {
      ElMessage({
        type: "error",
        message: "访问的笔记不存在",
      });
    }
  }
});

const onSelectNote = (note: any) => {
  useTrash.setCurrentNote(note);
};

const deleteNote = (note: any) => {
  ElMessageBox.confirm("永久删除该笔记吗?", "删除笔记", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    confirmButtonClass: "danger",
    type: "error",
  }).then(() => {
    useTrash.deleteNote(note);
    router.push("/trash");
  });
};
const revertNote = (note: any) => {
  ElMessageBox.confirm("确认要恢复该笔记吗?", "恢复笔记", {
    confirmButtonText: "恢复",
    cancelButtonText: "取消",
    type: "info",
  }).then(() => {
    useTrash.revertNote(note);
    router.push("/trash");
  });
};
</script>

<style lang="less">
@import "@/assets/style/trash.less";

.danger {
  background: #f56c6c !important;
  border: #f56c6c !important;
}
</style>
