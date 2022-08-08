<template>
  <div id="notebook-list">
    <header>
      <a href="javascript:void(0);">
        <plus theme="outline" size="22" fill="#a2a2a2" :strokeWidth="3" />
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <h3>笔记本列表(10)</h3>
      <div class="notebook-list">
        <a href="#" class="notebook">
          <div>
            <notebook-one
              theme="outline"
              size="24"
              fill="#4a4a4a"
              :strokeWidth="3"
            />
            <span>笔记本</span>
            <span><span>3</span></span>
            <span>3天前</span>
            <span>编辑</span>
            <span>删除</span>
          </div>
        </a>
        <a href="#" class="notebook">
          <div>
            <notebook-one
              theme="outline"
              size="24"
              fill="#4a4a4a"
              :strokeWidth="3"
            />
            <span>笔记本</span>
            <span><span>12</span></span>
            <span>2022/8/8</span>
            <span>编辑</span>
            <span>删除</span>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Auth from "@/api/auth";
import { Plus, NotebookOne } from "@icon-park/vue-next";

const router = useRouter();

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

const msg = ref("笔记本列表");
</script>

<style scoped lang="less">
@import "@/assets/style/notebook-list.less";
</style>
