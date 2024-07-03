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
        component: () => import('@/views/pages/Setting/users/List.vue'),
        meta: {
          pageTitle: 'users',
          Breadcrumb: 'settings',
        },
      },
      {
        path: "/editUsers/:id",
        name: "editUsers",
        component: () =>
          import("@/views/pages/Setting/users/Edit.vue"),
        meta: {
          pageTitle: "editUsers",
          Breadcrumb: "user",
        },
      },
      {
        path: "/addUsers",
        name: "addUsers",
        component: () =>
          import("@/views/pages/Setting/users/Edit.vue"),
        meta: {
          pageTitle: "addUsers",
          Breadcrumb: "user",
        },
      }
    ],
  },
];
