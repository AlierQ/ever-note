<template>
  <div id="sidebar">
    <div class="sidebar-top-icons">
      <router-link to="/note/1" title="笔记" active-class="checked">
        <notes theme="outline" size="22" fill="#ffffff" :strokeWidth="3" />
      </router-link>
      <router-link to="/notebooks" title="笔记本" active-class="checked">
        <i class="note">
          <notebook-one
            theme="outline"
            size="22"
            fill="#ffffff"
            :strokeWidth="3"
          />
        </i>
      </router-link>
      <router-link to="/trash/2" title="回收站" active-class="checked">
        <i class="note">
          <delete-one
            theme="outline"
            size="22"
            fill="#ffffff"
            :strokeWidth="3"
          />
        </i>
      </router-link>
    </div>
    <div class="sidebar-bottom-icons">
      <a href="#">
        <logout theme="outline" size="22" fill="#ffffff" :strokeWidth="3" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Notes, NotebookOne, DeleteOne, Logout } from "@icon-park/vue-next";
</script>
<style scoped>
#sidebar {
  height: 100vh;
  background: #2d333d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#sidebar > .sidebar-top-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#sidebar > .sidebar-top-icons > a {
  padding: 8px 18px;
}
#sidebar > .sidebar-bottom-icons {
  margin-bottom: 16px;
}

.checked {
  background: #5d6165;
}
</style>
