export default [
  {
    path: '/facility-setting',
    children: [
      {
        path: '',
        name: 'facilitySetting',
        component: () => import('@/views/pages/Setting/faciliti/Edit.vue'),
        meta: {
          pageTitle: 'facilitySetting',
          Breadcrumb: 'settings',
        },
      },
    ],
  },
  {
    path: '/user',
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/pages/Setting/users/Edit.vue'),
        meta: {
          pageTitle: 'users',
          Breadcrumb: 'settings',
        },
      },
    ],
  },
];
