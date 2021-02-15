import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/todo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo,
    meta: {
      auth: true,
      title: 'Todo'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      auth: true,
      title: 'About us'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
