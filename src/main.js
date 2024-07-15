import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import vue3GoogleLogin from "vue3-google-login";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Antd)
  .component("QuillEditor", QuillEditor)
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  })
  .mount("#app");
