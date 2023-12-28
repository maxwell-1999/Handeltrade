export const formatAddress = (ads) => {
  if (!ads) return 'Connect Wallet';
  return ads.substr(0, 4) + '....' + ads.substr(-4);
};
