import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddLocation from '../views/job/location/AddLocation.vue'
import ViewJob from '../views/job/job/ViewJob.vue'
import EditJob from '../views/job/job/EditJob.vue'
import AddSkill from '../views/job/skill/AddSkill.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/location',
    name: 'addLocation',
    component: AddLocation
  },
  {
    path: '/job',
    name: 'viewJob',
    component: ViewJob
  },
  {
    path: '/edit_job',
    name: 'editJob',
    component: EditJob
  },
  {
    path: '/skill',
    name: 'addSkill',
    component: AddSkill
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
