export const admin = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("../layouts/admin.vue"),
    meta: {
      role: "admin",
    },
    children: [
      {
        path: "account",
        name: "account-management",
        component: () => import("../views/admin/account.management.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/admin/dashboard.vue"),
      },
      {
        path: "companies",
        name: "company-management",
        component: () => import("../views/admin/company.management.vue"),
      },
      {
        path: "company/:id",
        name: "admin-company-detail",
        component: () => import("../views/admin/company.detail.vue"),
      },
      {
        path: "seeker",
        name: "seeker-management",
        component: () => import("../views/admin/seeker.management.vue"),
      },
      {
        path: "post",
        name: "post-management",
        component: () => import("../views/admin/post.management.vue"),
      },
      {
        path: "posts/:name",
        name: "admin-job-detail",
        component: () => import("../views/admin/post.detail.vue"),
      },
      {
        path: "seeker/:id",
        name: "seeker-detail",
        component: () => import("../views/admin/seeker.detail.vue"),
      },
    ],
  },
];
export default admin;
