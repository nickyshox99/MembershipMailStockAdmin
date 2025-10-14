export default [
  // {
  //   path: '/RecommendJoinFamily',
  //   name: 'recommend-join-family',
  //   component: () => import('@/views/pages/customer/RecommendJoinFamily.vue'),
  //   meta: {
  //     layout: 'full',            
  //   },
  // },
  {
    path: '/RegisterEmail',
    name: 'registeremail',
    component: () => import('@/views/pages/customer/registeremail.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/BuyProduct',
    name: 'buy-product',
    component: () => import('@/views/pages/customer/BuyProduct.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/ConfirmPayment',
    name: 'confirm-payment',
    component: () => import('@/views/pages/customer/ConfirmPayment.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/SelectTopic',
    name: 'select-topic',
    component: () => import('@/views/pages/customer/SelectTopic.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/SelectPlanType',
    name: 'select-plan-type',
    component: () => import('@/views/pages/customer/SelectPlanType.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/UserRegis',
    name: 'user-regis',
    component: () => import('@/views/pages/customer/UserRegis.vue'),
    meta: {
      layout: 'full',            
    },
  },
]
