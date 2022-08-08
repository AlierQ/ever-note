<template>
  <div id="trash-detail">
    <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStateStore } from "@/stores/userState";

const router = useRouter();
const userStateStore = useUserStateStore();
if (!userStateStore.userState.isLogin) {
  router.push("/login");
}
const msg = ref("回收站笔记详情页");
</script>

<style scoped lang="less">
h1 {
  color: yellow;
}
</style>
