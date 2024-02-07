import publiccode from "./publicCodes";

export default [
  {
    path: "/index",
    name: "index",
    component: () => import("../views/pages/dashboard/index"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
    children: [
      ...publiccode,
    ],
  },
  {
    path: "/index-one",
    name: "index-one",
    component: () => import("../views/pages/dashboard/index-one"),
    meta: {
      headerClass: "header header-one",
      headerthreeClass: "sidebar new-header sidebar-one",
      sidebarClass: "sidebar-one hide-sidebar",
    },
  },
  {
    path: "/index-two",
    name: "index-two",
    component: () => import("../views/pages/dashboard/index-two"),
    meta: {
      headerClass: "header header-two",
      divClass: "container",
    },
  },
  {
    path: "/index-three",
    name: "index-three",
    component: () => import("../views/pages/dashboard/index-three"),
    meta: {
      headerClass: "header header-three",
      headerthreeClass: "sidebar side-three new-header",
      divClass: "container",
      sidebarClass: "sidebar-three hide-sidebar",
    },
  },
  {
    path: "/index-four",
    name: "index-four",
    component: () => import("../views/pages/dashboard/index-four"),
    meta: {
      headerClass: "header header-four",
      hideClass: "v-cloak",
    },
  },
];
