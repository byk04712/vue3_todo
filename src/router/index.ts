import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index.vue";
import Simple from "../views/Simple/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "index",
      path: "/",
      component: Index,
    },
    {
      name: "simple",
      path: "/simple",
      component: Simple,
    },
  ],
});

export default router;
