import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/UserSelect',
    name: 'UserSelect',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserSelect" */ '../views/UserSelect.vue'),
    params: true
  },

  {
    path: '/Home',
    name: 'UserHome',
    component: () => import("../views/Home.vue"),
    params: true,
    props: true,
  },

  {
    path: '/MovieData',
    name: 'MovieData',
    component: ()=>import("../components/MovieData.vue"),
    params:true,
    props: true,
  },

  {
    path: '/TvData',
    name: 'TvData',
    component: ()=>import("../components/TvData.vue"),
    params:true,
    props: true,
  },

  {
    path: '/MusicData',
    name: 'MusicData',
    component: ()=>import("../components/MusicData.vue"),
    params:true,
    props: true,
  },

  {
    path: '/MovieHome',
    name: 'MovieHome',
    component: ()=>import("../components/MovieHome.vue"),
    params: true,
    props: true,
  },

  {
    path: '/TvHome',
    name: 'TvHome',
    component: ()=>import("../components/TvHome.vue"),
    params: true,
    props: true,
  },

  {
    path: '/MusicHome',
    name: 'MusicHome',
    component: ()=>import("../components/MusicHome.vue"),
    params: true,
    props: true,
  },

  {
    path: '/EpisodeHome',
    name: 'EpisodeHome',
    component: ()=>import("../components/EpisodeHome.vue"),
    params: true,
    props: true,
  },





]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
