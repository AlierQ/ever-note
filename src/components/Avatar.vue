<template>
  <span :title="user.username">{{ user.username.slice(0, 1) }}</span>
</template>
<script setup lang="ts">
import { ref } from "vue";
const user = ref({ username: "AlierQ" });
</script>
<style scoped lang="less">
span {
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #06a17e;
  color: #fff;
  text-shadow: 1px 0 1px #08dfad;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
