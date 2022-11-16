const admin = [
  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
    children: [
      {
        path: "job",
        name: "view-job",
        component: () => import("../views/job/job/ViewJob.vue"),
      },
      {
        path: "location",
        name: "addLocation",
        component: () => import("../views/job/location/AddLocation.vue"),
      },
    ],
  },
];
export default admin;
