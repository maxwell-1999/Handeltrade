type BuySellActivity = {
  type: string;
  blockTimestamp: string;
  creatorFee: string;
  dividendsAdded: string;
  marketId: string;
  newSupply: string;
  ownerFee: string;
  priceReceived?: string;
  pricePaid?: string;
  protocolFee: string;
  qty: string;
  reflectionFee: string;
  rewardFee: string;
};

type BuySellActivityForMarket = {
  type: string;
  blockTimestamp: string;
  buyer?: string;
  seller?: string;
  creatorFee: string;
  newSupply: string;
  ownerFee: string;
  priceReceived?: string;
  pricePaid?: string;
  protocolFee: string;
  qty: string;
  reflectionFee: string;
  rewardFee: string;
};
