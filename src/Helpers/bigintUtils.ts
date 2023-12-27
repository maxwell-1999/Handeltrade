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
const view = (a: bigint, decimals = 3) => {
  if (a == undefined) return 0;
  if (a == null) return 0;
  Number((a * BigInt(10 ** decimals)) / E18) / 10 ** decimals;
};

export { bigIntMin, bigIntMax, bigIntMinAndMax, toe18, view };
