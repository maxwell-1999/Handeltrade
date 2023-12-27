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

const toe18 = (a: number | string) => BigInt(a) * BigInt(10 ** 18);
const view = (a: bigint | string, decimals = 3) => {
  if (a == undefined) return 0;
  if (a == null) return 0;
  return Number((BigInt(a) * BigInt(10 ** decimals)) / E18) / 10 ** decimals;
};

const renderShares = (a: bigint | string) => {
  if (a == undefined) return 'Fetching...';
  const shares = view(a, 0);
  if (shares == 0) return 'No Shares';
  return shares > 1 ? shares + ' Shares' : shares + ' Share';
};

export { bigIntMin, bigIntMax, bigIntMinAndMax, toe18, view, renderShares };
