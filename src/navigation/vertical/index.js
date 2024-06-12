export default [
  {
    title: 'publicCodes',
    icon: 'server',
    children: [
      {
        title: 'Nationalities',
        route: 'nationality',
        permission: 'viewNationality',
        isFav: false,
      },
      {
        title: 'banks',
        route: 'banks',
        permission: 'viewBanks',
        isFav: false,
      },
      {
        title: 'paymentMethods',
        route: 'paymentmethods',
        permission: 'viewPaymentMehtod',
        isFav: false,
      },
      {
        title: 'RentTypes',
        route: 'rentType',
        permission: 'viewRentType',
        isFav: false,
      },
      {
        title: 'discounts',
        route: 'discounts',
        permission: 'viewDiscounts',
        isFav: false,
      },
      {
        title: 'expenses',
        route: 'expenses',
        permission: 'viewExpenses',
        isFav: false,
      },
      {
        title: 'suppliers',
        route: 'suppliers',
        permission: 'viewSuppliers',
        isFav: false,
      },
      {
        title: 'sources',
        route: 'sources',
        permission: 'viewSources',
        isFav: false,
      },
      {
        title: 'cities',
        route: 'cities',
        permission: 'viewCities',
        isFav: false,
      },
      {
        title: 'countries',
        route: 'countries',
        permission: 'viewCountries',
        isFav: false,
      },
    ],
  },
  {
    title: 'hotelData',
    icon: 'layers',
    children: [
      {
        title: 'buildings',
        route: 'building',
        permission: 'viewBuliding',
        isFav: false,
      },
      {
        title: 'floors',
        route: 'floor',
        permission: 'viewFloor',
        isFav: false,
      },
      {
        title: 'KitchensTypes',
        route: 'kitchenType',
        permission: 'viewKitchenType',
        isFav: false,
      },
      {
        title: 'loungesTypes',
        route: 'loungesTypes',
        permission: 'viewLoungesTypes',
        isFav: false,
      },
      {
        title: 'roomStatuses',
        route: 'roomStatus',
        permission: 'viewRoomStatus',
        isFav: false,
      },
      {
        title: 'roomTypes',
        route: 'roomTypes',
        permission: 'viewRoomTypes',
        isFav: false,
      },
      {
        title: 'rooms',
        route: 'rooms',
        permission: 'viewRooms',
        isFav: false,
      },
      {
        title: 'guests',
        route: 'guest',
        permission: 'viewGuests',
        isFav: false,
      },
      {
        title: 'messages',
        route: 'messages',
        permission: 'viewMessages',
        isFav: false,
      },
      {
        title: 'clientsCategories',
        route: 'clientsCategories',
        permission: 'viewClientsCategories',
        isFav: false,
      },
      {
        title: 'seasonUnitesPrices',
        route: 'seasonUnitesPrices',
        permission: 'viewSeasonUnitesPrices',
        isFav: false,
      },
      {
        title: 'unitesPrices',
        route: 'unitesPrices',
        permission: 'viewUnitesPrices',
        isFav: false,
      },
      {
        title: 'accommodations',
        route: 'accommodations',
        permission: 'viewAccommodations',
        isFav: false,
      },
      {
        title: 'insurances',
        route: 'insurances',
        permission: 'viewInsurances',
        isFav: false,
      },
    ],
  },
  {
    title: 'financialTransactions',
    icon: 'dollar-sign',
    children: [
      {
        title: 'collectionVouchers',
        route: 'collectionVouchers',
        permission: 'viewCollectionVouchers',
        isFav: false,
      },
      {
        title: 'paymentVouchers',
        route: 'paymentVouchers',
        permission: 'viewPaymentVouchers',
        isFav: false,
      },
    ],
  },
  {
    title: 'settings',
    icon: 'settings',
    children: [
      {
        title: 'facilitySetting',
        route: 'facilitySetting',
        permission: 'viewfacility',
        isFav: false,
      },
      {
        title: 'users',
        route: 'user',
        permission: 'viewuser',
        isFav: false,
      },
    ],
  },
];
