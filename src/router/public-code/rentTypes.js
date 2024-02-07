export default [
  {
    path: "/rentType",
    name: "rentType",
    component: () => import("@/views/pages/PublicCodes/rentTypes/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addRentType",
    name: "addRentType",
    component: () => import("@/views/pages/PublicCodes/rentTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editRentType/:id",
    name: "editRentType",
    // same component with addRentType
    component: () => import("@/views/pages/PublicCodes/rentTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
