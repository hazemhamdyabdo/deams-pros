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
      {
        path: 'addFaciliti',
        name: 'addFaciliti',
        component: () => import('@/views/pages/Setting/faciliti/Edit.vue'),
        meta: {
          pageTitle: 'facility',
          Breadcrumb: 'facility',
        },
      },
      {
        path: 'editFaciliti',
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
