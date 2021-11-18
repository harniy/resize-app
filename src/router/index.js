import Vue from 'vue'
import VueRouter from 'vue-router'
import crope from '../pages/crope.vue'
import resize from '../pages/resizeImage.vue'

Vue.use(VueRouter)

const routes = [
    
  {
      path: '/',
      name: 'resize',
      component: resize,
      routes: true
  },
  {
      path: '/crope',
      name: 'crope',
      component: crope,
      routes: true
  }
]

const router = new VueRouter({
    mode: 'history',
  routes
})

export default router
