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
  {
    path: '/branches',
    children: [
      {
        path: '',
        name: 'branches-list',
        component: () => import('@/views/pages/Setting/branches/List.vue'),
        meta: {
          pageTitle: 'branches',
          Breadcrumb: 'settings',
        },
      },
      {
        path: "new",
        name: "branch-new",
        component: () =>
          import("@/views/pages/Setting/branches/Edit.vue"),
        meta: {
          pageTitle: "branch-new",
          Breadcrumb: "branches",
        },
      },
      {
        path: "edit/:id",
        name: "branch-edit",
        component: () =>
          import("@/views/pages/Setting/branches/Edit.vue"),
        meta: {
          pageTitle: "branch-edit",
          Breadcrumb: "branches",
        },
      }
    ],
  },
];
