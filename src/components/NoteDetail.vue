<template>
  <div id="note" class="detail">
    <NoteSidebar v-model:notes="notes"></NoteSidebar>
    <div class="note-detail">
      <div class="note-detail">
        <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
        <div class="note-detail-ct" v-show="currentNote.id">
          <div class="note-bar">
            <span> 创建日期: {{ formatDate(currentNote.createdAt) }}</span>
            <span> 更新日期: {{ formatDate(currentNote.updatedAt) }}</span>
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
            </span>
            <span
              ><delete-one
                theme="outline"
                size="18"
                fill="#aaa"
                :strokeWidth="3"
            /></span>
          </div>
          <div class="note-title">
            <input
              type="text"
              placeholder="输入标题"
              @input="updateNote"
              @keydown="stateText = '正在输入...'"
              v-model="currentNote.title"
            />
          </div>
          <div class="editor">
            <textarea
              placeholder="输入内容, 支持 markdown 语法"
              @input="updateNote"
              @keydown="stateText = '正在输入...'"
              v-model="currentNote.content"
            ></textarea>
            <div class="preview markdown-body" hidden></div>
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
import Notes from "@/api/notes";
import NoteSidebar from "@/components/NoteSidebar.vue";
import { DeleteOne, PreviewClose, PreviewOpen } from "@icon-park/vue-next";
import { onBeforeRouteUpdate } from "vue-router";
import { formatDate } from "@/helpers/util";
import { ElMessage, ElMessageBox } from "element-plus";
import _ from "lodash";

const router = useRouter();

const route = useRoute();

const preview = ref(false);

// 当前编辑的note
const currentNote = ref({
  id: undefined,
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
});

const notes = ref();

const stateText = ref("笔记未改动");

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

watchEffect(() => {
  if (notes.value && route.query.noteId) {
    if (notes.value.length === 0) return;
    currentNote.value = notes.value.filter((note: any) => {
      return Number(route.query.noteId) === Number(note.id);
    })[0];
  }
});

onBeforeRouteUpdate((to, from) => {
  // 组件内路由更新的时候就将选中的note绑定到currentNote
  if (to.query.noteId) {
    currentNote.value = notes.value.filter((note: any) => {
      return Number(to.query.noteId) === Number(note.id);
    })[0];
  } else {
    currentNote.value.id = undefined;
  }
});

const togglePreview = () => {
  preview.value = !preview.value;
};

// 使用了第三方节流
const updateNote = _.debounce(() => {
  console.log("写东西了");
  Notes.updateNote(
    { noteId: Number(currentNote.value.id) },
    {
      title: currentNote.value.title,
      content: currentNote.value.content,
    }
  )
    .then((ref) => {
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
</script>

<style scoped lang="less">
@import "@/assets/style/note-detail.less";
</style>
