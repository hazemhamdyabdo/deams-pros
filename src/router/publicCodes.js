export default [
    {
      path: "",
      name: "home",
      component: () => import("@/views/pages/dashboard/Edit.vue"),
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
    {
      path: "/nationality",
      name: "nationality",
      component: () => import("@/views/pages/PublicCodes/nationalities/List.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/addNationality",
      // same name with addBuilding route
      name: "addNationality",
      component: () => import("@/views/pages/PublicCodes/nationalities/Edit.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/editNationality/:id",
      name: "editNationality",
      // same component with addNationality
      component: () => import("@/views/pages/PublicCodes/nationalities/Edit.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/paymentMehtod",
      name: "PaymentMehtod",
      component: () =>
        import("@/views/pages/PublicCodes/Paymentmethods/List.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/addPaymentmethod",
      name: "addPaymentmethod",
      component: () =>
        import("@/views/pages/PublicCodes/Paymentmethods/Edit.vue"),
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
        import("@/views/pages/PublicCodes/Paymentmethods/Edit.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
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
    {
      path: "/room",
      name: "room",
      component: () => import("@/views/pages/PublicCodes/rooms/List.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/addRoom",
      name: "addRoom",
      component: () => import("@/views/pages/PublicCodes/rooms/Edit.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    },
    {
      path: "/editRoom/:id",
      name: "editRoom",
      component: () => import("@/views/pages/PublicCodes/rooms/Edit.vue"),
      meta: {
        headerClass: "header",
        sidebarClass: "",
      },
    }
  ];