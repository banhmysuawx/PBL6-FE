export const admin = [
  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
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
        path: "company",
        name: "company-management",
        component: () => import("../views/admin/company.management.vue"),
      },
    ],
  },
];
export default admin;
