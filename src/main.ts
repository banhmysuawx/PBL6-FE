import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(Antd);
app.use(router);
app.use(createPinia());
app.use(VueAxios, axios);
app.use(store).use(router).use(ElementPlus).mount("#app");