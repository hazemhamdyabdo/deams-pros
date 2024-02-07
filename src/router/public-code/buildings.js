export default [
  {
    path: "/building",
    name: "building",
    component: () => import("@/views/pages/PublicCodes/buildings/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addBuilding",
    name: "addBuilding",
    component: () => import("@/views/pages/PublicCodes/buildings/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editBuilding/:id",
    name: "editBuilding",
    // same component with addBuilding
    component: () => import("@/views/pages/PublicCodes/buildings/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
