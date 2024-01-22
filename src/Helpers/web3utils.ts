import { ContractFunctionExecutionError } from 'viem';

export const formatAddress = (ads) => {
  if (!ads) return 'Connect Wallet';
  return ads.substr(0, 4) + '....' + ads.substr(-4);
};

export const formatError = (e) => {
  const shortMessage = (e as ContractFunctionExecutionError)?.shortMessage;
  const message =
    shortMessage || e.shortMessage || e.message || 'Error Occured!';
  console.log(`Txn-error: `, shortMessage);
  const finalMessage = message.replace(/(\r\n|\n|\r)/gm, '');
  if (finalMessage.includes('An internal error was received'))
    return 'Gas + Transaction Fee is exceeds balance!';
  return message.replace(/(\r\n|\n|\r)/gm, '');
};

export const areAdsEqual = (ad1?: string, ad2?: string) => {
  if (!ad1 || !ad2) return false;
  if (ad1.toLowerCase() === ad2.toLowerCase()) return true;
  return false;
};
