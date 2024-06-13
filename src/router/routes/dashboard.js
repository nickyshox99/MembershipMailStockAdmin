export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {
    path: '/dashboardsummary',
    name: 'dashboardsummary',
    component: () => import('@/views/dashboard/ecommerce/EcommerceSummary.vue'),
  },
]
