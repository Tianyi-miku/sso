import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: () =>
      import("../views/layout/layout.vue"),
    children: [
      {
        path: "logger",
        name: "logger",
        component: () =>
          import("../views/logger/logger.vue"),
      },
      {
        path: "role",
        name: "role",
        component: () =>
          import("../views/role/role.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () =>
          import("../views/user/user.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return true
})

export default router;
