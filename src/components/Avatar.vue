<template>
  <span :title="username">{{ slug }}</span>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";
import Auth from "@/api/auth";

const instance = getCurrentInstance();

const username = ref("");

Auth.get_login_state().then((ref: any) => {
  if (ref.data) username.value = ref.data.username;
});

// 全局事件总线，登录时触发的username更新
instance?.proxy?.$Bus.on("userInfo", (data: any) => {
  username.value = data.username;
});

// setup 计算属性
const slug = computed(() => {
  return username.value.slice(0, 1);
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
