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
      component: () => import('@/views/pages/customer4/registeremail.vue'),
      meta: {
        layout: 'full',            
      },
    },
    {
      path: '/BuyProduct',
      name: 'buy-product',
      component: () => import('@/views/pages/customer4/BuyProduct.vue'),
      meta: {
        layout: 'full',            
      },
    },
    {
      path: '/ConfirmPayment',
      name: 'confirm-payment',
      component: () => import('@/views/pages/customer4/ConfirmPayment.vue'),
      meta: {
        layout: 'full',            
      },
    },
    {
      path: '/SelectTopic',
      name: 'select-topic',
      component: () => import('@/views/pages/customer4/SelectTopic.vue'),
      meta: {
        layout: 'full',            
      },
    },
    {
      path: '/SelectPlanType',
      name: 'select-plan-type',
      component: () => import('@/views/pages/customer4/SelectPlanType.vue'),
      meta: {
        layout: 'full',            
      },
    },
    {
      path: '/UserRegis',
      name: 'user-regis',
      component: () => import('@/views/pages/customer4/UserRegis.vue'),
      meta: {
        layout: 'full',            
      },
    },
  ]
  