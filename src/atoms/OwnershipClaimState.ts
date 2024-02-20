// "not claimed"

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// "CLAIMING-STARTED"
// redirect to oauth url & set persisted state to "CLAIMING-STARTED" with market-id
// "CLAIMING-FAILED"
// "CLAIMING-SUCCESSFUL"

type OwnershipClaimState =
  | {
    type: 'CLAIM-STARTED';
    market: Market;
  }
  | {
    type: 'CLAIM-CODE-RECIEVED';
    marketId: string;
    platform: string | null;
    challange: string | null;
    code: string;
    market: Market;
  }
  | {
    type: 'IDLE';
  };
const ownershipClaimStateAtom = atom<OwnershipClaimState>({
  default: { type: 'IDLE' },
  key: 'OwnershipClaimStateAtom',
  effects: [persistAtom],
});
const useOwnershipClaimManager = () => {
  const ownershipClaimState = useRecoilValue(ownershipClaimStateAtom);
  console.log(`ownershipClaimState: `, ownershipClaimState);
  const setOwnershipClaimState = useSetRecoilState(ownershipClaimStateAtom);
  const startOwnershipClaim = (market: Market) => {
    setOwnershipClaimState({ type: 'CLAIM-STARTED', market });
  };

  const claimCodeRecieved = (code: string, marketId: string, platform: string, challange: string, market: Market) => {
    setOwnershipClaimState({ type: 'CLAIM-CODE-RECIEVED', code, marketId, platform, challange, market });
  };
  const finishOwnershipClaim = () => {
    setOwnershipClaimState({ type: 'IDLE' });
  };
  return {
    startOwnershipClaim,
    claimCodeRecieved,
    finishOwnershipClaim,
    ...ownershipClaimState,
  };
};

export { useOwnershipClaimManager };
