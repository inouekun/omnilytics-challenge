// 26 bytes - Letters only
// 36 bytes - Alphanumerics
export const genAlphas = (lettersOnly) => {
  const randomLetters = 'abcdefghijklmnopqrstuvwxyz';
  const randomAlphanumerics = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let result = '';

  if (lettersOnly) {
    for (var i = 0; i < randomLetters.length; i++) {
      result += randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
    }
  } else {
    for (var j = 0; j < randomAlphanumerics.length; j++) {
      result += randomAlphanumerics.charAt(Math.floor(Math.random() * randomAlphanumerics.length));
    }
  }
  return result;
};

// 5 bytes - Whole numbers
// 7 bytes - Integers
export const genNumbers = (decimal) => {
  const result = Math.floor(Math.random() * 5000) + 1000; // Math.floor(Math.random() * (max - min + 1)) + min;
  const precision = 100; // 2 decimals
  const resultWithDecimal = Math.floor(Math.random() * (5000 * precision - 1 * precision) + 1000 * precision) / (1 * precision);

  return decimal ? resultWithDecimal : result;
};
