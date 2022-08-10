<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      <div class="note-detail">
        <div class="note-empty" v-show="">请选择笔记</div>
        <div class="note-detail-ct" v-show="true">
          <div class="note-bar">
            <span> 创建日期: {{ currentNote.createdAt }}</span>
            <span> 更新日期: {{ currentNote.updatedAt }}</span>
            <span> {{ currentNote.stateText }}</span>
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
              v-model="currentNote.title"
            />
          </div>
          <div class="editor">
            <textarea
              placeholder="输入内容, 支持 markdown 语法"
              v-model="currentNote.content"
            ></textarea>
            <div class="preview markdown-body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Auth from "@/api/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
import { DeleteOne, PreviewClose, PreviewOpen } from "@icon-park/vue-next";
const router = useRouter();

const preview = ref(false);

const currentNote = ref({
  title: "未命名笔记",
  content: "这里是内容",
  createdAt: "1天前",
  updatedAt: "刚刚",
  stateText: "未保存",
});

const togglePreview = () => {
  preview.value = !preview.value;
};

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});
</script>

<style scoped lang="less">
@import "@/assets/style/note-detail.less";
</style>
