<template>
  <span :title="username">{{ slug }}</span>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import Auth from "@/api/auth";
const username = ref("");

// setup中使用计算属性
const slug = computed(() => {
  return username.value.slice(0, 1);
});

// 请求数据数据，理论上写在created中，但是setup中没有必要使用created
Auth.get_login_state().then((res) => {
  type State = {
    isLogin: boolean;
    data?: {
      username: string;
      createAt: string;
      updatedAt: string;
    };
  };

  if ((res as State).isLogin) username.value = (res as State).data!.username;
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
