export default [
  {
    dependancies: [],
    name: 'banks',
    title: 'banks',
    roles: [
      {
        arabicName: 'عرض',
        englishName: ' View',
        id: 'viewBanks',
      },
      {
        arabicName: 'إضافة',
        englishName: ' Add',
        id: 'addBanks',
      },
      {
        arabicName: 'تعديل',
        englishName: ' Edit',
        id: 'editBanks',
      },
      {
        arabicName: 'حذف',
        englishName: ' Delete',
        id: 'deleteBanks',
      },
    ],
  },
  {
    dependancies: [],
    name: 'paymentMethods',
    roles: [
      { arabicName: 'عرض', englishName: ' View', id: 'viewPaymentMethods' },
      { arabicName: 'إضافة', englishName: ' Add', id: 'addPaymentMethods' },
      { arabicName: 'تعديل', englishName: ' Edit', id: 'editPaymentMethods' },
      { arabicName: 'حذف', englishName: ' Delete', id: 'deletePaymentMethods' },
    ],
    title: 'PaymentMethods',
  },
];
