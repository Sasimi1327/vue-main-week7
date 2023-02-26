import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardLayout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/AdminCoupons.vue')
      }
    ]
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
