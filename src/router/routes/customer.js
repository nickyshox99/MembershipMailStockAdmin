export default [
  {
    path: '/recommendjoinfamily',
    name: 'recommend-join-family',
    component: () => import('@/views/pages/customer/recommendjoinfamily.vue'),
    meta: {
      layout: 'full',            
    },
  },
  {
    path: '/registeremail',
    name: 'registere-mail',
    component: () => import('@/views/pages/customer/registeremail.vue'),
    meta: {
      layout: 'full',            
    },
  },
]
