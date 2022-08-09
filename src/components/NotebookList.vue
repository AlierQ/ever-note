<template>
  <div id="notebook-list">
    <header>
      <a href="javascript:void(0);">
        <plus theme="outline" size="22" fill="#a2a2a2" :strokeWidth="3" />
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <h3>笔记本列表(10)</h3>
      <div class="notebook-list">
        <a
          href="javascript:void(0);"
          class="notebook"
          v-for="notebook in notebookList"
          key="notebook.id"
        >
          <div>
            <notebook-one
              theme="filled"
              size="24"
              fill="#6a6a6a"
              :strokeWidth="3"
            />
            <span>{{ notebook.title }}</span>
            <span>
              <span>{{ notebook.noteCounts }}</span>
            </span>
            <span>{{ notebook.updatedAt.slice(0, 10) }}</span>
            <span @click="onUpdateNotebook(notebook.id)">编辑</span>
            <span @click="onDeleteNotebook(notebook.id)">删除</span>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Auth from "@/api/auth";
import { Plus, NotebookOne } from "@icon-park/vue-next";
import Notebooks from "@/api/notebooks";

type Notebook = {
  id: number;
  noteCounts: number;
  title: string;
  updatedAt: string;
};

const router = useRouter();

const notebookList = ref<Notebook[]>();

Auth.get_login_state().then((ref: any) => {
  if (!ref.isLogin) {
    router.push("/login");
  }
});

const initNotebookList = () => {
  Notebooks.getAllNotebook().then((res: any) => {
    notebookList.value = res.data;
  });
};
initNotebookList();
const onUpdateNotebook = (id: number) => {
  const title = prompt("请输入标题:");
  if (title !== "" && title !== undefined && title !== null) {
    Notebooks.updateNotebook(id, { title }).then(initNotebookList);
  }
};

const onDeleteNotebook = (id: number) => {
  Notebooks.deleteNotebook(id).then(initNotebookList);
};
</script>

<style scoped lang="less">
@import "@/assets/style/notebook-list.less";
</style>
