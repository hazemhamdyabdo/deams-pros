export default [
  {
    path: "/addbrand",
    name: "addbrand",
    component: () => import("../views/pages/product/addbrand"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addcategory",
    name: "addcategory",
    component: () => import("../views/pages/product/addcategory"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: () => import("../views/pages/product/addproduct"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/brandlist",
    name: "brandlist",
    component: () => import("../views/pages/product/brandlist"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/categorylist",
    name: "categorylist",
    component: () => import("../views/pages/product/categorylist"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editbrand",
    name: "editbrand",
    component: () => import("../views/pages/product/editbrand"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editcategory",
    name: "editcategory",
    component: () => import("../views/pages/product/editcategory"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editproduct/:id",
    name: "editproduct",
    component: () => import("../views/pages/product/editproduct"),
    props: true,
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editsubcategory",
    name: "editsubcategory",
    component: () => import("../views/pages/product/editsubcategory"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/importproduct",
    name: "importproduct",
    component: () => import("../views/pages/product/importproduct"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/product-details/:id",
    name: "product-details",
    component: () => import("../views/pages/product/product-details"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/productlist",
    name: "productlist",
    component: () => import("../views/pages/product/productlist"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/subaddcategory",
    name: "subaddcategory",
    component: () => import("../views/pages/product/subaddcategory"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/subcategorylist",
    name: "subcategorylist",
    component: () => import("../views/pages/product/subcategorylist"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
