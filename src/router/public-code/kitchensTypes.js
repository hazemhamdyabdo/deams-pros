export default [
  {
    path: "/kitchenType",
    name: "kitchenType",
    component: () => import("@/views/pages/PublicCodes/kitchensTypes/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addkitchenType",
    name: "addkitchenType",
    component: () => import("@/views/pages/PublicCodes/kitchensTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editkitchenType/:id",
    name: "editkitchenType",
    component: () => import("@/views/pages/PublicCodes/kitchensTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
