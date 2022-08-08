<template>
  <div id="notebook-detail">
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
const msg = ref("笔记本详情页");
</script>

<style scoped lang="less">
h1 {
  color: blue;
}
</style>
