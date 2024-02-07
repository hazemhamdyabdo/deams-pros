export default [
  {
    path: "/newuser",
    name: "newuser",
    component: () => import("../views/pages/users/newuser"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/newuseredit",
    name: "newuseredit",
    component: () => import("../views/pages/users/newuseredit"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
