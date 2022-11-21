import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import JobBoard from "../views/job/board/job_board.vue"
import Candidate from "../views/candidate/candidate.vue"
import Interview from "../views/interview/interview.vue"
import ViewJob from "../views/job/job/ViewJob.vue"

import ProfileView from "../views/Profile/ProfileView.vue";
import AppliedJob from "../views/AppliedJob.vue";
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
    path: "/job_board",
    name: "JobBoard",
    component: JobBoard,
  },
  {
    path: "/company/job",
    name: "company-job",
    component: ViewJob,
  },
  {
    path: "/candidate",
    name: "Candidate",
    component: Candidate,
  },
  {
    path: "/interview",
    name: "Interview",
    component: Interview,
  },

  {
    path: "/applied-jobs",
    name: "appliedJob",
    component: AppliedJob,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
