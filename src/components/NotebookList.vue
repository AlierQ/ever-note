<template>
  <div id="notebook-list">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/note/1">笔记本1</router-link>
      </li>
      <li>
        <router-link to="/note/2">笔记本2</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Auth from "@/api/auth";

const router = useRouter();

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

const msg = ref("笔记本列表");
</script>

<style scoped lang="less">
h1 {
  color: red;
}
</style>
