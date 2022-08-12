<template>
  <div id="note" class="detail">
    <transition name="sidebar">
      <NoteSidebar v-show="isVisible"></NoteSidebar>
    </transition>
    <div class="toggle-sidebar" @click="toggleVisible">
      <span v-show="isVisible"
        ><left theme="outline" size="24" fill="#4a4a4a" :strokeWidth="3"
      /></span>
      <span v-show="!isVisible"
        ><right theme="outline" size="24" fill="#4a4a4a" :strokeWidth="3"
      /></span>
    </div>
    <div class="note-detail">
      <div class="note-detail">
        <div class="note-empty" v-show="!useNotes.currentNote.id">
          请选择笔记
        </div>
        <div class="note-detail-ct" v-show="useNotes.currentNote.id">
          <div class="note-bar">
            <span>
              创建日期: {{ formatDate(useNotes.currentNote.createdAt) }}</span
            >
            <span>
              更新日期: {{ formatDate(useNotes.currentNote.updatedAt) }}</span
            >
            <span> {{ stateText }}</span>
            <span class="icon-fullscreen" @click="togglePreview">
              <preview-close
                v-show="!preview"
                theme="outline"
                size="18"
                fill="#aaa"
                :strokeWidth="3"
              />
              <preview-open
                v-show="preview"
                theme="outline"
                size="18"
                fill="#aaa"
                :strokeWidth="3"
              />
              <span>&nbsp;预览</span>
            </span>
            <span @click="deleteNote"
              ><delete-one
                theme="outline"
                size="18"
                fill="#aaa"
                :strokeWidth="3"
              />
              <span>&nbsp;放入回收站</span>
            </span>
          </div>
          <div class="note-title">
            <input
              type="text"
              placeholder="输入标题"
              @input="updateNote"
              @keydown="
                stateText = '正在输入...';
                useNotes.currentNote.updatedAt = new Date().toISOString();
              "
              v-model="useNotes.currentNote.title"
            />
          </div>
          <div class="editor">
            <textarea
              placeholder="输入内容, 支持 markdown 语法"
              @input="updateNote"
              @keydown="
                stateText = '正在输入...';
                useNotes.currentNote.updatedAt = new Date().toISOString();
              "
              v-model="useNotes.currentNote.content"
            ></textarea>
            <transition name="preview">
              <div
                v-show="preview"
                class="preview markdown-body"
                v-html="md.render(useNotes.currentNote.content)"
              ></div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Auth from "@/api/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
import {
  DeleteOne,
  PreviewClose,
  PreviewOpen,
  Left,
  Right,
} from "@icon-park/vue-next";
import { formatDate } from "@/helpers/util";
import { ElMessage } from "element-plus";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import mdhighlight from "markdown-it-highlightjs";
import "@/assets/style/code-style.less";
import hljs from "highlight.js";
import { useNotesStore } from "@/stores/notes";
// pinia全局状态管理
const useNotes = useNotesStore();

const md = new MarkdownIt().use(mdhighlight, {
  auto: true,
  hljs: hljs,
});

const isVisible = ref(true);

const router = useRouter();

const route = useRoute();

const preview = ref(true);

const stateText = ref("笔记未改动");

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

watchEffect(() => {
  if (useNotes.notes && route.query.noteId) {
    if (useNotes.notes.length === 0) return;
    const temp = useNotes.notes.filter((note: any) => {
      return Number(route.query.noteId) === Number(note.id);
    })[0];
    if (temp !== undefined) {
      useNotes.currentNote = temp;
    } else {
      ElMessage({
        type: "error",
        message: "访问的笔记不存在",
      });
    }
  } else {
    useNotes.setCurrentNote({ title: "", content: "" });
  }
});

const togglePreview = () => {
  preview.value = !preview.value;
};

const toggleVisible = () => {
  isVisible.value = !isVisible.value;
};

// 使用了第三方节流
const updateNote = _.debounce(() => {
  useNotes
    .updateCurrentNote()
    .then((res) => {
      stateText.value = "已保存";
    })
    .catch((err) => {
      ElMessage({
        type: "error",
        message: err.response.data.msg,
      });
      stateText.value = "保存失败";
    });
}, 300);

const deleteNote = () => {
  useNotes.deleteCurrentNote(useNotes.currentNote.id);
  router.push(`/note?notebookId=${route.query.notebookId}`);
};
</script>

<style lang="less">
@import "@/assets/style/note-detail.less";
@import "@/assets/style/markdown-style.less";

.preview-enter-active,
.preview-leave-active {
  transition: all 0.25s ease;
}

.preview-enter-from,
.preview-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.15s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  width: 0;
  opacity: 0;
}
</style>
