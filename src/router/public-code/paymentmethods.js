export default [
  {
    path: "/PaymentMehtod",
    name: "PaymentMehtod",
    component: () =>
      import("@/views/pages/PublicCodes/paymentmethods/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addPaymentmethod",
    name: "addPaymentmethod",
    component: () =>
      import("@/views/pages/PublicCodes/paymentmethods/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editPaymentMethod/:id",
    name: "editPaymentMethod",
    // same component with editPaymintMethod
    component: () =>
      import("@/views/pages/PublicCodes/paymentmethods/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
];
