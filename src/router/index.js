import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views//qz')
      },
      {
        path: '/profile',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
