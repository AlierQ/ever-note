<template>
  <div id="notebook-list">
    <header>
      <a href="javascript:void(0);" @click.prevent="onAddNotebook">
        <plus theme="outline" size="22" fill="#a2a2a2" :strokeWidth="3" />
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <h3>笔记本列表({{ useNotebooks.notebooks?.length }})</h3>
      <div class="notebook-list">
        <router-link
          v-for="notebook in useNotebooks.notebooks"
          :to="`/note?notebookId=${notebook.id}`"
          href="javascript:void(0);"
          class="notebook"
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
            <span>{{ format_date(notebook.createdAt) }}</span>
            <span @click.prevent="onUpdateNotebook(notebook)">编辑</span>
            <span @click.prevent="onDeleteNotebook(notebook)">删除</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Auth from "@/api/auth";
import { Plus, NotebookOne } from "@icon-park/vue-next";
import { formatDate } from "@/helpers/util";
import { ElMessage, ElMessageBox } from "element-plus";
import { useNotebooksStore } from "@/stores/notebook";

// pinia全局状态管理
const useNotebooks = useNotebooksStore();
// 初始化数据
useNotebooks.getNotebooks();

const format_date = formatDate;

const router = useRouter();

Auth.get_login_state()
  .then((ref: any) => {
    if (!ref.isLogin) {
      router.push("/login");
    }
  })
  .catch((err) => {
    ElMessage({
      type: "error",
      message: err.response.data.msg,
    });
  });

const onUpdateNotebook = (notebook: any) => {
  ElMessageBox.prompt("请输入新的名称", "修改名称", {
    confirmButtonText: "修改",
    cancelButtonText: "取消",
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: "标题不能为空，且不能超过30个字符！",
    inputValue: notebook.title,
  })
    .then(({ value }) => {
      notebook.title = value;
      useNotebooks.updateNotebook(notebook);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: `取消修改`,
      });
    });
};

const onDeleteNotebook = (notebook: any) => {
  ElMessageBox.confirm("确认要删除该笔记本吗?", "删除笔记本", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    confirmButtonClass: "danger",
    type: "error",
  })
    .then(() => {
      useNotebooks.deleteNotebook(notebook);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const onAddNotebook = () => {
  ElMessageBox.prompt("请输入名称", "新建笔记本", {
    confirmButtonText: "创建",
    cancelButtonText: "取消",
    inputPattern: /^.{1,30}$/,
    inputValue: "新建笔记本",
    inputErrorMessage: "标题不能为空，且不能超过30个字符！",
  })
    .then(({ value }) => {
      useNotebooks.addNotebook(value);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: `取消创建`,
      });
    });
};
</script>

<style lang="less">
@import "@/assets/style/notebook-list.less";

.danger {
  background: #f56c6c !important;
  border: #f56c6c !important;
}
</style>
