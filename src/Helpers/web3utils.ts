import { ContractFunctionExecutionError } from 'viem';

export const formatAddress = (ads) => {
  if (!ads) return 'Connect Wallet';
  return ads.substr(0, 4) + '....' + ads.substr(-4);
};

export const formatError = (e) => {
  const shortMessage = (
    e as ContractFunctionExecutionError
  )?.shortMessage.split('the following reason:')?.[1];
  return shortMessage || e.shortMessage || e.message;
};
