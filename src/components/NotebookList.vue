<template>
  <div id="notebook-list">
    <header>
      <a href="javascript:void(0);" @click.prevent="onAddNotebook">
        <plus theme="outline" size="22" fill="#a2a2a2" :strokeWidth="3" />
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <h3>笔记本列表({{ notebookList?.length }})</h3>
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
            <span>{{ format_date(notebook.createdAt) }}</span>
            <span @click.prevent="onUpdateNotebook(notebook.id, notebook.title)"
              >编辑</span
            >
            <span @click.prevent="onDeleteNotebook(notebook.id)">删除</span>
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
import { formatDate } from "@/helpers/util";
import { ElMessage, ElMessageBox } from "element-plus";

type Notebook = {
  id: number;
  noteCounts: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const format_date = formatDate;

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

const onUpdateNotebook = (id: number, oldTitle: string) => {
  ElMessageBox.prompt("请输入新的名称", "修改名称", {
    confirmButtonText: "修改",
    cancelButtonText: "取消",
    inputValue: oldTitle,
  })
    .then(({ value }) => {
      Notebooks.updateNotebook(id, { title: value }).then(() => {
        notebookList.value?.forEach((notebook) => {
          if (notebook.id === id) {
            notebook.title = value;
          }
        });
        ElMessage({
          type: "success",
          message: `修改成功`,
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: `取消修改`,
      });
    });
};

const onDeleteNotebook = (id: number) => {
  ElMessageBox.confirm("确认要删除该笔记本吗?", "删除笔记本", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    confirmButtonClass: "danger",
    type: "error",
  })
    .then(() => {
      Notebooks.deleteNotebook(id).then(() => {
        notebookList.value = notebookList.value?.filter((notebook) => {
          return notebook.id !== id;
        });
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
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
  })
    .then(({ value }) => {
      Notebooks.addNotebook({ title: value }).then((res: any) => {
        res.data.noteCounts = 0;
        notebookList.value?.unshift(res.data);
        ElMessage({
          type: "success",
          message: `创建成功`,
        });
      });
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
