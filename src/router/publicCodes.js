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
    path: "/roomStatus",
    name: "roomStatus",
    component: () => import("@/views/pages/PublicCodes/roomStatus/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addRoomStatus",
    name: "addRoomStatus",
    component: () => import("@/views/pages/PublicCodes/roomStatus/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editRoomStatus/:id",
    name: "editRoomStatus",
    // same component with addRentType
    component: () => import("@/views/pages/PublicCodes/roomStatus/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/floor",
    name: "floor",
    component: () => import("@/views/pages/PublicCodes/floors/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addFloor",
    name: "addFloor",
    component: () => import("@/views/pages/PublicCodes/floors/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editFloor/:id",
    name: "editFloor",
    component: () => import("@/views/pages/PublicCodes/floors/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/loungesTypes",
    name: "loungesTypes",
    component: () => import("@/views/pages/PublicCodes/loungesTypes/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addLoungesTypes",
    name: "addLoungesTypes",
    component: () => import("@/views/pages/PublicCodes/loungesTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editLoungesTypes/:id",
    name: "editLoungesTypes",
    component: () => import("@/views/pages/PublicCodes/loungesTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/roomTypes",
    name: "roomTypes",
    component: () => import("@/views/pages/PublicCodes/roomTypes/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addRoomTypes",
    name: "addRoomTypes",
    component: () => import("@/views/pages/PublicCodes/roomTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editRoomTypes/:id",
    name: "ediRoomTypes",
    component: () => import("@/views/pages/PublicCodes/roomTypes/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/rooms",
    name: "rooms",
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
  },
  {
    path: "/guest",
    name: "guest",
    component: () => import("@/views/pages/PublicCodes/guests/List.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/addGuest",
    name: "addGuest",
    component: () => import("@/views/pages/PublicCodes/guests/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  },
  {
    path: "/editGuest/:id",
    name: "editGuest",
    component: () => import("@/views/pages/PublicCodes/guests/Edit.vue"),
    meta: {
      headerClass: "header",
      sidebarClass: "",
    },
  }
];
