<template>
  <span>{{ slug }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStateStore } from "@/stores/userState";

// 用户登录状态
const userStateStore = useUserStateStore();

// setup 计算属性
const slug = computed(() => {
  return userStateStore.userState.data.username.slice(0, 1);
});
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
