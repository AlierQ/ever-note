<template>
  <div id="trash-detail">
    <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const msg = ref("回收站笔记详情页");
</script>

<style scoped lang="less">
h1 {
  color: yellow;
}
</style>
