import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";

const app = createApp(App);
for (let i in Icons) {
  app.component(i, Icons[i]);
}
app.use(createPinia()).use(router).use(ElementPlus);

app.mount("#app");
