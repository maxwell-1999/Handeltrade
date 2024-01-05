type Market = {
  id: number;
  rank?: number;
  market_id: string;
  social_platform: string;
  social_handle: string;
  creator_addr: string;
  img_url: string;
  name: string;
  description: string;
  on_chain: boolean;
  created_at: string;
  updated_at: string;
  buyPrice: string;
  lastUpdated: string;
  sellPrice: string;
  shares: string;
};

type MarketIdMap = {
  [key: string]: Market;
};
