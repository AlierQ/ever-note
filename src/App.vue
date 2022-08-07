<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
</script>

<style scoped>
.container {
  display: flex;
}
.content {
  flex-grow: 1;
}
</style>
