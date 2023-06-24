import { createRouter, createWebHistory } from "vue-router";
import JoinCall from "../views/JoinCall.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Join",
      component: JoinCall,
    },
    {
      path: "/call",
      name: "Call",
      component: () => import("../views/Call.vue"),
    },
  ],
});

export default router;
