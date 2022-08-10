<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      123
      <!-- <div class="note-empty">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期: {{ 123123 }}</span>
          <span> 更新日期: {{ 123123123 }}</span>
          <span> {{ 12312321 }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题" />
        </div>
        <div class="editor">
          <textarea placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Auth from "@/api/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
const router = useRouter();

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});
const msg = ref("notebookId");
</script>

<style scoped lang="less">
@import "@/assets/style/note-detail.less";
</style>
