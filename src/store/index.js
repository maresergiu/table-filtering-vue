import Vuex from "vuex";
import Vue from "vue";
import users from "@/store/users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users
  }
});
