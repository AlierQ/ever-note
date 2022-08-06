<template>
  <div id="notebook-detail">
    <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const msg = ref("笔记本详情页");
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
