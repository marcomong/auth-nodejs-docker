import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
