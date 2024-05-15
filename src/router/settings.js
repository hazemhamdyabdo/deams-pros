export default [
  {
    path: '/facility',
    children: [
      // {
      //   path: '',
      //   name: 'facility',
      //   component: () => import('@/views/pages/Setting/faciliti/List.vue'),
      //   meta: {
      //     pageTitle: 'facility',
      //     Breadcrumb: 'settings',
      //   },
      // },
      // {
      //   path: 'addFaciliti',
      //   name: 'addFaciliti',
      //   component: () => import('@/views/pages/Setting/faciliti/Edit.vue'),
      //   meta: {
      //     pageTitle: 'facility',
      //     Breadcrumb: 'facility',
      //   },
      // },
      {
        path: '',
        name: 'editFaciliti',
        component: () => import('@/views/pages/Setting/faciliti/Edit.vue'),
        meta: {
          pageTitle: 'editFaciliti',
          Breadcrumb: 'facility',
        },
      },
    ],
  },
];
