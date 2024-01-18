import { E18 } from './constants';

const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => (e < m ? e : m));

const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => (e > m ? e : m));
const bigIntMinAndMax = (...args: bigint[]) => {
  return args.reduce(
    ([min, max], e) => {
      return [e < min ? e : min, e > max ? e : max];
    },
    [args[0], args[0]]
  );
};
// fetch latest eth price

const toe18 = (a: number | string) => BigInt(a) * BigInt(10 ** 18);
const view = (a: bigint | string, decimals = 10) => {
  if (a == undefined) return 0;
  if (a == null) return 0;
  const result =
    Number((BigInt(a) * BigInt(10 ** decimals)) / E18) / 10 ** decimals;
  return parseFloat(result.toFixed(5));
};
const viewDec = (a: bigint, decimals = 10) => {
  const number =
    Number((BigInt(a) * BigInt(10 ** decimals)) / E18) / 10 ** decimals;
  return number.toFixed(10).replace(/\.?0+$/, '');
};
const absoluteInt = (a: bigint, factor = 8) => {
  const exponent = BigInt(10 ** factor);
  const decimals = 3;
  const number =
    Number((BigInt(a) * BigInt(10 ** decimals)) / exponent) / 10 ** decimals;
  return +number.toFixed(10).replace(/\.?0+$/, '');
};
const renderShares = (a: bigint | string) => {
  if (a == undefined) return 'Fetching...';
  const shares = viewDec(a, 0);
  console.log(`deb-shares: `, shares);
  if (shares == '0') return 'No Shares';
  return shares > '1' ? shares + ' Shares' : shares + ' Share';
};

const bigIntToStringWithDecimal = (
  bigintValue: BigInt,
  decimalPlaces: number
): string => {
  // Convert the BigInt to a string
  let stringValue = bigintValue.toString();

  // Pad the string with zeros if it's shorter than the decimal places
  while (stringValue.length <= decimalPlaces) {
    stringValue = '0' + stringValue;
  }

  // Insert the decimal point at the correct position
  const decimalPointIndex = stringValue.length - decimalPlaces;
  stringValue =
    stringValue.substring(0, decimalPointIndex) +
    '.' +
    stringValue.substring(decimalPointIndex);

  // Remove any unnecessary leading zeros
  return stringValue.replace(/^0+(?!\.|$)/, '');
};

export {
  bigIntMin,
  bigIntMax,
  bigIntMinAndMax,
  toe18,
  view,
  renderShares,
  viewDec,
  bigIntToStringWithDecimal,
  absoluteInt,
};
export const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
});
