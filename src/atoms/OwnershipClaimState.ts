// "not claimed"

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { persistAtomEffect } from './SlipageState';

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
      code: string;
    }
  | {
      type: 'IDLE';
    };
const ownershipClaimStateAtom = atom<OwnershipClaimState>({
  default: { type: 'IDLE' },
  key: 'OwnershipClaimStateAtom',
});
const useOwnershipClaimManager = () => {
  const ownershipClaimState = useRecoilValue(ownershipClaimStateAtom);
  console.log(`ownershipClaimState: `, ownershipClaimState);
  const setOwnershipClaimState = useSetRecoilState(ownershipClaimStateAtom);
  const startOwnershipClaim = (market: Market) => {
    setOwnershipClaimState({ type: 'CLAIM-STARTED', market });
  };

  const claimCodeRecieved = (code: string, marketId: string) => {
    setOwnershipClaimState({ type: 'CLAIM-CODE-RECIEVED', code, marketId });
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
