export default [
  {
    path: "/",
    name: "signin",
    component: () => import("../views/pages/auth/signin"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/pages/auth/signup"),
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: () => import("../views/pages/auth/forgetpassword"),
  },
];
