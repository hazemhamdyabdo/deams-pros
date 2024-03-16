export function isStringOnly(input) {
  input = input || ''
  const regex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/;
  return regex.test(input);
}

export function isNumericOnly(input) {
  input = input || ''
  const regex = /^[0-9]+$/;
  return regex.test(input);
}