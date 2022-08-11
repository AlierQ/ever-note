/// <reference types="vite/client" />

// markdown预览
declare module "markdown-it";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
