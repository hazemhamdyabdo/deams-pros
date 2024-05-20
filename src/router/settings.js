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
];
