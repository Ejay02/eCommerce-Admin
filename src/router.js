import { createWebHistory, createRouter } from "vue-router";

import Login from "./pages/login.vue";
import Dashboard from "./pages/dashboard.vue";
import MainLayout from "./components/mainLayout.vue";
import ResetPassword from "./pages/resetPassword.vue";
import NotFound from "./components/error/notFound.vue";
import ForgotPassword from "./pages/forgotPassword.vue";
// import AboutView from "./AboutView.vue";

const routes = [
  {
    path: "/",
    component: Login,
    // children: [
    // {
    //   path: "dashboard",
    //   component: Dashboard,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  // ],
  // },
  {
    path: "/admin",
    component: MainLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
