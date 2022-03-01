import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/error", component: ErrorPage }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
