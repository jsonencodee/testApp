import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Axios from "axios";
import Vuex from "vuex";

Axios.defaults.withCredentials = false;

if (localStorage.getItem("api_token")) {
  Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "api_token"
    )}`;
    return config;
  });
}

loadFonts();

createApp(App).use(Vuex).use(router).use(router).use(vuetify).mount("#app");
