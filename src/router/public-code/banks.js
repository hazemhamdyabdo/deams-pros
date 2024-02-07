export default [
  {
    path: "",
    name: "home",
    component: () => import("@/views/pages/dashboard/indexpage.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/banks",
    name: "banks",
    component: () => import("@/views/pages/PublicCodes/banks/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "addBank",
    name: "addBank",
    component: () => import("@/views/pages/PublicCodes/banks/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "editBank/:id",
    name: "editBank",
    component: () => import("@/views/pages/PublicCodes/banks/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
