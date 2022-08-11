<template>
  <span :title="useUser.user.username">{{ useUser.slug }}</span>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const useUser = useUserStore();
useUser.getUser();
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
