import { ContractFunctionExecutionError } from 'viem';

export const formatAddress = (ads) => {
  if (!ads) return 'Connect Wallet';
  return ads.substr(0, 4) + '....' + ads.substr(-4);
};

export const formatError = (e) => {
  const shortMessage = (
    e as ContractFunctionExecutionError
  )?.shortMessage.split('the following reason:')?.[1];
  const message =
    shortMessage || e.shortMessage || e.message || 'Error Occured!';
  return message.replace(/(\r\n|\n|\r)/gm, '');
};
