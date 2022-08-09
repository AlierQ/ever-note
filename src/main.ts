import { createApp } from "vue";
import "@icon-park/vue-next/styles/index.css";
import "@/style.css";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import mitt from "mitt";
import "element-plus/dist/index.css";

const app = createApp(App);
const pinia = createPinia();
const Mit = mitt();

declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit;
  }
}

app.config.globalProperties.$Bus = Mit;

app.use(router);
app.use(pinia);
app.mount("#app");
