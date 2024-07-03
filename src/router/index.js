import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "../utils/index";

export const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "主页",
    meta: {
      title: "主页",
    },
    component: () => import("../views/Home.vue"), // layout
    redirect: "/",
    children: [
      {
        path: "/",
        meta: {
          title: "首页",
        },
        component: () => import("../views/Welcome.vue"),
      },
      {
        path: "/user/list",
        meta: {
          title: "用户列表",
        },
        component: () => import("../views/User/index.vue"),
      },
      {
        path: "/user/add",
        meta: {
          title: "添加用户",
        },
        component: () => import("../views/User/AddUser.vue"),
      },
      {
        path: "/user/detail",
        meta: {
          title: "用户详情",
        },
        component: () => import("../views/User/UserDetail.vue"),
      },

      {
        path: "/product/list",
        meta: {
          title: "商品列表",
        },
        component: () => import("../views/Product/index.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to: 要访问的路径
  // from: 从哪个路径跳转而来
  // next: 放行函数
  // next() 放行 next('/login') 强制跳转

  if (to.meta.title) {
    // document.title = "后台管理系统" + to.meta.title;
    document.title = "cms" + to.meta.title;
  }

  return next();

  //   登录
  if (to.path === "/login") {
    return next();
  }
  //   获取token
  const token = getToken();
  if (!token) {
    return next("/login");
  } else {
    return next();
  }
});

export default router;
