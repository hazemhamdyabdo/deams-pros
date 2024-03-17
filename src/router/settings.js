export default [
  {
    path: '/facility',
    children: [
      {
        path: '',
        name: 'facility',
        component: () => import('@/views/pages/Setting/faciliti/List.vue'),
        meta: {
          pageTitle: 'facility',
          Breadcrumb: 'Settings',
        },
      },
    ],
  },
];
