import { createApp } from "vue";
import { createPinia } from "pinia";
import { BuzzNotify } from "vue-buzz-notify";

import "vue-buzz-notify/style.css";
import "./style.css";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(BuzzNotify);
app.mount("#app");
