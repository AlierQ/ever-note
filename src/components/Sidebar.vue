<template>
  <div id="sidebar">
    <div class="sidebar-top">
      <Avatar />
      <div class="sidebar-top-icons">
        <router-link to="" title="笔记" active-class="checked">
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
        <router-link to="" title="回收站" active-class="checked">
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
    </div>

    <div class="sidebar-bottom-icons">
      <a href="javascript:void(0);" @click="onLogout">
        <logout theme="outline" size="22" fill="#ffffff" :strokeWidth="3" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notes, NotebookOne, DeleteOne, Logout } from "@icon-park/vue-next";
import Avatar from "@/components/Avatar.vue";
import Auth from "@/api/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const onLogout = () => {
  Auth.logout().then((data) => {
    router.push("/login");
  });
};
</script>

<style scoped lang="less">
#sidebar {
  height: 100vh;
  background: #2d333d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  > .sidebar-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .sidebar-top-icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
      > a {
        padding: 8px 18px;
        transition: all 0.25s ease;
        &:hover {
          background: #5d6165;
        }
        &.checked {
          background: #5d6165;
        }
      }
    }
  }
  > .sidebar-bottom-icons {
    > a {
      display: inline-block;
      padding: 12px 18px;
      transition: all 0.25s ease;
      &:hover {
        background: #5d6165;
      }
    }
  }
}
</style>
