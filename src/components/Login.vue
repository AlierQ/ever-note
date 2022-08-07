<template>
  <div id="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const msg = ref("this is login page");
</script>

<style scoped lang="less">
h1 {
  color: red;
}
</style>
