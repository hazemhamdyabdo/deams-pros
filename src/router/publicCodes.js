export default [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/pages/dashboard/Edit.vue'),
    meta: {
      headerClass: 'header',
      sidebarClass: '',
    },
  },
  {
    path: '/banks',
    children: [
      {
        path: '',
        name: 'banks',
        component: () => import('@/views/pages/PublicCodes/banks/List.vue'),
        meta: {
          pageTitle: 'Banks',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addBank',
        alias: '/addBank',
        name: 'addBank',
        component: () => import('@/views/pages/PublicCodes/banks/Edit.vue'),
        meta: {
          pageTitle: 'addBank',
          Breadcrumb: 'Banks',
        },
      },
      {
        path: '/editBank/:id',
        name: 'editBank',
        component: () => import('@/views/pages/PublicCodes/banks/Edit.vue'),
        meta: {
          pageTitle: 'editBank',
          Breadcrumb: 'Banks',
        },
      },
    ],
  },
  {
    path: '/building',
    children: [
      {
        path: '',
        name: 'building',
        component: () => import('@/views/pages/PublicCodes/buildings/List.vue'),
        meta: {
          pageTitle: 'buildings',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addBuilding',
        name: 'addBuilding',
        component: () => import('@/views/pages/PublicCodes/buildings/Edit.vue'),
        meta: {
          pageTitle: 'addBuilding',
          Breadcrumb: 'buildings',
        },
      },
      {
        path: '/editBuilding/:id',
        name: 'editBuilding',
        // same component with addBuilding
        component: () => import('@/views/pages/PublicCodes/buildings/Edit.vue'),
        meta: {
          pageTitle: 'editBuilding',
          Breadcrumb: 'buildings',
        },
      },
    ],
  },
  {
    path: '/kitchenType',
    children: [
      {
        path: '',
        name: 'kitchenType',
        component: () =>
          import('@/views/pages/PublicCodes/kitchensTypes/List.vue'),
        meta: {
          pageTitle: 'KitchensTypes',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addkitchenType',
        name: 'addkitchenType',
        component: () =>
          import('@/views/pages/PublicCodes/kitchensTypes/Edit.vue'),
        meta: {
          pageTitle: 'addKitchenType',
          Breadcrumb: 'KitchensTypes',
        },
      },
      {
        path: '/editkitchenType/:id',
        name: 'editkitchenType',
        component: () =>
          import('@/views/pages/PublicCodes/kitchensTypes/Edit.vue'),
        meta: {
          pageTitle: 'editkitchenType',
          Breadcrumb: 'KitchensTypes',
        },
      },
    ],
  },
  {
    path: '/nationality',
    children: [
      {
        path: '',
        name: 'nationality',
        component: () =>
          import('@/views/pages/PublicCodes/nationalities/List.vue'),
        meta: {
          pageTitle: 'Nationalities',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addNationality',
        name: 'addNationality',
        component: () =>
          import('@/views/pages/PublicCodes/nationalities/Edit.vue'),
        meta: {
          pageTitle: 'addNationality',
          Breadcrumb: 'Nationalities',
        },
      },
      {
        path: '/editNationality/:id',
        name: 'editNationality',
        component: () =>
          import('@/views/pages/PublicCodes/nationalities/Edit.vue'),
        meta: {
          pageTitle: 'editNationality',
          Breadcrumb: 'Nationalities',
        },
      },
    ],
  },
  {
    path: '/paymentMehtod',
    children: [
      {
        path: '',
        name: 'PaymentMehtod',
        component: () =>
          import('@/views/pages/PublicCodes/Paymentmethods/List.vue'),
        meta: {
          pageTitle: 'paymentMethod',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addPaymentmethod',
        name: 'addPaymentmethod',
        component: () =>
          import('@/views/pages/PublicCodes/Paymentmethods/Edit.vue'),
        meta: {
          pageTitle: 'addPaymentMethod',
          Breadcrumb: 'paymentMethod',
        },
      },
      {
        path: '/editPaymentMethod/:id',
        name: 'editPaymentMethod',
        // same component with editPaymintMethod
        component: () =>
          import('@/views/pages/PublicCodes/Paymentmethods/Edit.vue'),
        meta: {
          pageTitle: 'editPaymentMethod',
          Breadcrumb: 'paymentMethod',
        },
      },
    ],
  },
  {
    path: '/rentType',
    children: [
      {
        path: '',
        name: 'rentType',
        component: () => import('@/views/pages/PublicCodes/rentTypes/List.vue'),
        meta: {
          pageTitle: 'rentTypes',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addRentType',
        name: 'addRentType',
        component: () => import('@/views/pages/PublicCodes/rentTypes/Edit.vue'),
        meta: {
          pageTitle: 'addRentType',
          Breadcrumb: 'rentTypes',
        },
      },
      {
        path: '/editRentType/:id',
        name: 'editRentType',
        // same component with addRentType
        component: () => import('@/views/pages/PublicCodes/rentTypes/Edit.vue'),
        meta: {
          pageTitle: 'editRentType',
          Breadcrumb: 'rentTypes',
        },
      },
    ],
  },
  {
    path: '/roomStatus',
    children: [
      {
        path: '',
        name: 'roomStatus',
        component: () =>
          import('@/views/pages/PublicCodes/roomStatus/List.vue'),
        meta: {
          pageTitle: 'roomStatuses',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addRoomStatus',
        name: 'addRoomStatus',
        component: () =>
          import('@/views/pages/PublicCodes/roomStatus/Edit.vue'),
        meta: {
          pageTitle: 'addRoomstatus',
          Breadcrumb: 'roomStatuses',
        },
      },
      {
        path: '/editRoomStatus/:id',
        name: 'editRoomStatus',
        // same component with addRentType
        component: () =>
          import('@/views/pages/PublicCodes/roomStatus/Edit.vue'),
        meta: {
          pageTitle: 'editRoomstatus',
          Breadcrumb: 'roomStatuses',
        },
      },
    ],
  },
  {
    path: '/floor',
    children: [
      {
        path: '',
        name: 'floor',
        component: () => import('@/views/pages/PublicCodes/floors/List.vue'),
        meta: {
          pageTitle: 'floors',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addFloor',
        name: 'addFloor',
        component: () => import('@/views/pages/PublicCodes/floors/Edit.vue'),
        meta: {
          pageTitle: 'addFloor',
          Breadcrumb: 'floors',
        },
      },
      {
        path: '/editFloor/:id',
        name: 'editFloor',
        component: () => import('@/views/pages/PublicCodes/floors/Edit.vue'),
        meta: {
          pageTitle: 'editFloor',
          Breadcrumb: 'floors',
        },
      },
    ],
  },
  {
    path: '/loungesTypes',
    children: [
      {
        path: '/loungesTypes',
        name: 'loungesTypes',
        component: () =>
          import('@/views/pages/PublicCodes/loungesTypes/List.vue'),
        meta: {
          pageTitle: 'loungesTypes',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addLoungesTypes',
        name: 'addLoungesTypes',
        component: () =>
          import('@/views/pages/PublicCodes/loungesTypes/Edit.vue'),
        meta: {
          pageTitle: 'addLoungeType',
          Breadcrumb: 'loungesTypes',
        },
      },
      {
        path: '/editLoungesTypes/:id',
        name: 'editLoungesTypes',
        component: () =>
          import('@/views/pages/PublicCodes/loungesTypes/Edit.vue'),
        meta: {
          pageTitle: 'editLoungeType',
          Breadcrumb: 'loungesTypes',
        },
      },
    ],
  },
  {
    path: '/roomTypes',
    children: [
      {
        path: '',
        name: 'roomTypes',
        component: () => import('@/views/pages/PublicCodes/roomTypes/List.vue'),
        meta: {
          pageTitle: 'roomTypes',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/roomTypes',
        name: 'addRoomTypes',
        component: () => import('@/views/pages/PublicCodes/roomTypes/Edit.vue'),
        meta: {
          pageTitle: 'addRoomType',
          Breadcrumb: 'roomTypes',
        },
      },
      {
        path: '/editRoomTypes/:id',
        name: 'ediRoomTypes',
        component: () => import('@/views/pages/PublicCodes/roomTypes/Edit.vue'),
        meta: {
          pageTitle: 'editRoomType',
          Breadcrumb: 'roomTypes',
        },
      },
    ],
  },
  {
    path: '/rooms',
    children: [
      {
        path: '',
        name: 'rooms',
        component: () => import('@/views/pages/PublicCodes/rooms/List.vue'),
        meta: {
          pageTitle: 'rooms',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addRoom',
        name: 'addRoom',
        component: () => import('@/views/pages/PublicCodes/rooms/Edit.vue'),
        meta: {
          pageTitle: 'addRoom',
          Breadcrumb: 'rooms',
        },
      },
      {
        path: '/editRoom/:id',
        name: 'editRoom',
        component: () => import('@/views/pages/PublicCodes/rooms/Edit.vue'),
        meta: {
          pageTitle: 'editRoom',
          Breadcrumb: 'rooms',
        },
      },
    ],
  },
  {
    path: "/guest",
    children: [
      {
        path: '',
        name: 'guest',
        component: () => import('@/views/pages/PublicCodes/guests/List.vue'),
        meta: {
          pageTitle: 'guests',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addGuest',
        name: 'addGuest',
        component: () => import('@/views/pages/PublicCodes/guests/Edit.vue'),
        meta: {
          pageTitle: 'addGuest',
          Breadcrumb: 'guests',
        },
      },
      {
        path: '/editGuest/:id',
        name: 'editGuest',
        component: () => import('@/views/pages/PublicCodes/guests/Edit.vue'),
        meta: {
          pageTitle: 'editGuest',
          Breadcrumb: 'guests',
        },
      },
    ],
  },
  {
    path: "/source",
    children: [
      {
        path: '',
        name: 'sources',
        component: () => import('@/views/pages/PublicCodes/sources/List.vue'),
        meta: {
          pageTitle: 'sources',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addSource',
        name: 'addSource',
        component: () => import('@/views/pages/PublicCodes/sources/Edit.vue'),
        meta: {
          pageTitle: 'addSource',
          Breadcrumb: 'sources',
        },
      },
      {
        path: '/editSource/:id',
        name: 'editSource',
        component: () => import('@/views/pages/PublicCodes/sources/Edit.vue'),
        meta: {
          pageTitle: 'editSource',
          Breadcrumb: 'sources',
        },
      },
    ],
  },
  {
    path: '/cities',
    children: [
      {
        path: '',
        name: 'cities',
        component: () => import('@/views/pages/PublicCodes/cities/List.vue'),
        meta: {
          pageTitle: 'cities',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addCity',
        name: 'addCity',
        component: () => import('@/views/pages/PublicCodes/cities/Edit.vue'),
        meta: {
          pageTitle: 'addCity',
          Breadcrumb: 'cities',
        },
      },
      {
        path: '/editCity/:id',
        name: 'editCity',
        component: () => import('@/views/pages/PublicCodes/cities/Edit.vue'),
        meta: {
          pageTitle: 'editCity',
          Breadcrumb: 'cities',
        },
      },
    ],
  },
  {
    path: '/countries',
    children: [
      {
        path: '',
        name: 'countries',
        component: () => import('@/views/pages/PublicCodes/countries/List.vue'),
        meta: {
          pageTitle: 'countries',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addCountry',
        name: 'addCountry',
        component: () => import('@/views/pages/PublicCodes/countries/Edit.vue'),
        meta: {
          pageTitle: 'addCountry',
          Breadcrumb: 'countries',
        },
      },
      {
        path: '/editCountry/:id',
        name: 'editCountry',
        component: () => import('@/views/pages/PublicCodes/countries/Edit.vue'),
        meta: {
          pageTitle: 'editCountry',
          Breadcrumb: 'countries',
        },
      },
    ],
  },
  {
    path: '/discounts',
    children: [
      {
        path: '',
        name: 'discounts',
        component: () => import('@/views/pages/PublicCodes/discounts/List.vue'),
        meta: {
          pageTitle: 'discounts',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addDiscount',
        name: 'addDiscount',
        component: () => import('@/views/pages/PublicCodes/discounts/Edit.vue'),
        meta: {
          pageTitle: 'addDiscount',
          Breadcrumb: 'discounts',
        },
      },
      {
        path: '/editDiscount/:id',
        name: 'editDiscount',
        component: () => import('@/views/pages/PublicCodes/discounts/Edit.vue'),
        meta: {
          pageTitle: 'editDiscount',
          Breadcrumb: 'discounts',
        },
      },
    ],
  },
  {
    path: '/expenses',
    children: [
      {
        path: '',
        name: 'expenses',
        component: () => import('@/views/pages/PublicCodes/expenses/List.vue'),
        meta: {
          pageTitle: 'expenses',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addExpense',
        name: 'addExpense',
        component: () => import('@/views/pages/PublicCodes/expenses/Edit.vue'),
        meta: {
          pageTitle: 'addExpense',
          Breadcrumb: 'expenses',
        },
      },
      {
        path: '/editExpense/:id',
        name: 'editExpense',
        component: () => import('@/views/pages/PublicCodes/expenses/Edit.vue'),
        meta: {
          pageTitle: 'editExpense',
          Breadcrumb: 'expenses',
        },
      },
    ],
  },
  {
    path: '/suppliers',
    children: [
      {
        path: '',
        name: 'suppliers',
        component: () => import('@/views/pages/PublicCodes/suppliers/List.vue'),
        meta: {
          pageTitle: 'suppliers',
          Breadcrumb: 'publicCodes',
        },
      },
      {
        path: '/addSupplier',
        name: 'addSupplier',
        component: () => import('@/views/pages/PublicCodes/suppliers/Edit.vue'),
        meta: {
          pageTitle: 'addSupplier',
          Breadcrumb: 'suppliers',
        },
      },
      {
        path: '/editSupplier/:id',
        name: 'editSupplier',
        component: () => import('@/views/pages/PublicCodes/suppliers/Edit.vue'),
        meta: {
          pageTitle: 'editSupplier',
          Breadcrumb: 'suppliers',
        },
      },
    ],
  },
];
