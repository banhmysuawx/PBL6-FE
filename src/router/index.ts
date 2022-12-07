import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/Profile/ProfileView.vue";
import admin from "./admin";
import AppliedJob from "../views/AppliedJob.vue";
import JobView from "../views/JobView.vue";
import TestView from "../views/test/TestView.vue";
import ListCompany from "../views/ListCompany.vue";
import CompanyDetail from "../views/CompanyDetail.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  ...admin,
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/applied-jobs",
    name: "appliedJob",
    component: AppliedJob,
  },
  {
    path: "/jobs/:name",
    name: "jobview",
    component: JobView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/companies",
    name: "list-company",
    component: ListCompany,
  },
  {
    path: "/companies/:name/:id",
    name: "company-detail",
    component: CompanyDetail,
  },
  {
    path: "/companies/:id",
    name: "job-detail",
    component: CompanyDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
