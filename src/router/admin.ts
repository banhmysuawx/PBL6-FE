export const admin = [
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
      {
        path: "edit_job",
        name: "editJob",
        component: () => import("../views/job/job/EditJob.vue"),
      },
      {
        path: "skill",
        name: "addSkill",
        component: () => import("../views/job/skill/AddSkill.vue"),
      },
    ],
  },
];
export default admin;
