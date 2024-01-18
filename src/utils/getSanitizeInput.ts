export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
// sanitize the string from unwanted characters

export const getSanitizedInput = (ip: string, decimal = 4) => {
  if (ip.length > 8) return ip.substring(0, 8);
  if (inputRegex.test(escapeRegExp(ip))) {
    console.log(`ip: `, ip);

    let newValue = ip;
    // Check if newValue has more than 3 decimal places
    const decimalPart = newValue.split('.')[1];
    if (decimalPart && decimalPart.length > decimal) {
      // If yes, limit it to 3 decimal places
      newValue = parseFloat(newValue).toFixed(decimal);
    }
    return newValue;
  }
  return '';
};
