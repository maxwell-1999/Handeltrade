export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
// sanitize the string from unwanted characters
const str = '123.456.789';

export const getSanitizedInput = (ip: string) => {
  if (inputRegex.test(escapeRegExp(ip))) {
    let newValue = ip;
    // Check if newValue has more than 3 decimal places
    const decimalPart = newValue.split('.')[1];
    if (decimalPart && decimalPart.length > 4) {
      // If yes, limit it to 3 decimal places
      newValue = parseFloat(newValue).toFixed(4);
    }
    return newValue;
  }
  return '';
};
