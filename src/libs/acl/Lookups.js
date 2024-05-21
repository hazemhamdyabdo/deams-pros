const genders = [
  {
    id: "male",
    arabicName: "ذكر",
    englishName: "male",
  },
  {
    id: "female",
    arabicName: "أنثي",
    englishName: "female",
  },
];

const guestTypes = [
  {
    id: "citizen",
    arabicName: "مواطن",
    englishName: "citizen",
  },
  {
    id: "resident",
    arabicName: "مقيم",
    englishName: "resident",
  },
  {
    id: "other",
    arabicName: "أخري",
    englishName: "other",
  },
];

const identityTypes = [
  {
    id: "nationalIdentity",
    arabicName: "هوية وطنية",
    englishName: "national Identity",
  },
  {
    id: "citizenOfTheGulfCooperationCouncil",
    arabicName: "مواطن مجلس التعاون لدول الخليج",
    englishName: "citizen Of The Gulf Cooperation Council",
  },
  {
    id: "residency",
    arabicName: "إقامة",
    englishName: "residency",
  },
  {
    id: "passport",
    arabicName: "جواز سفر",
    englishName: "passport",
  },
  {
    id: "visitor",
    arabicName: "زائر",
    englishName: "visitor",
  },
  {
    id: "familyCard",
    arabicName: "بطاقة عائلة",
    englishName: "family Card",
  },
];

const bookingType = [
  { id: "Families", arabicName: "العوائل", englishName: "Families" },
  { id: "Singles", arabicName: "عزاب", englishName: "Singles" },
];

const messageTypes = [
  {
    id: "newReservation",
    arabicName: "حجز جديد",
    englishName: "new Reservation",
  },
  {
    id: "confirmReservation",
    arabicName: "تأكيد حجز",
    englishName: "confirm Reservation",
  },
  {
    id: "confirmArrive",
    arabicName: "تأكيد الوصول",
    englishName: "confirm Arrive",
  },
  {
    id: "confirmLeave",
    arabicName: "تأكيد الخروج",
    englishName: "confirm Leave",
  },
];
const dateFormats = [
  {
    id: "yyyymmdd",
    arabicName: "yyyy/mm/dd",
    englishName: "yyyy/mm/dd",
  },
];

const timeFormulas = [
  {
    id: "twentyfour",
    arabicName: "24",
    englishName: "24",
  },
  {
    id: "twelve",
    arabicName: "12",
    englishName: "12",
  },
];

export {
  genders,
  bookingType,
  guestTypes,
  identityTypes,
  messageTypes,
  timeFormulas,
  dateFormats,
};
