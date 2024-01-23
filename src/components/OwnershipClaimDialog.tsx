import { useOwnershipClaimManager } from '@/atoms/OwnershipClaimState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PrimaryBtn, SecondaryBtn, SecondaryButton } from './Buttons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserState from '@/atoms/userState';
const OwnershipClaimDialog: React.FC<any> = ({}) => {
  const ownershipManager = useOwnershipClaimManager();
  let stateValue = '';
  if (ownershipManager.market) {
    stateValue = ownershipManager.market.market_id;
  }
  console.log(`OwnershipClaimDialog-stateValue: `, stateValue);
  const clientId =
    '784619188209-a1cmllig1omc0amcudtb69o5ro0njv86.apps.googleusercontent.com';
  const url = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&access_type=offline&redirect_uri=https://handel.network&client_id=${clientId}&state=${stateValue}`;
  const [loading, setLoading] = useState(false);
  const [userState] = useUserState();
  useEffect(() => {
    const claimHandler = async (sessionId: string) => {
      setLoading(true);
      console.log(
        'deb-claiming3:',
        ownershipManager.code,
        ownershipManager.marketId,
        sessionId
      );

      const res = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/market/claim`,
        {
          token: ownershipManager.code,
          market_id: ownershipManager.marketId,
        },
        { headers: { Authorization: sessionId ?? '' } }
      );
      console.log('deb-claiming4:', res);
    };
    if (
      ownershipManager.type == 'CLAIM-CODE-RECIEVED' &&
      userState?.session_id
    ) {
      console.log(
        `OwnershipClaimDialog-userState?.session_id: `,
        userState?.session_id
      );
      claimHandler(userState?.session_id)
        .then((e) => {
          setLoading(false);
          toast.success('Ownership claimed successfully');
        })
        .catch((e) => {
          console.log('deb-claiming4:', e);
          toast.error('Ownership claiming failed');
        });
    }
  }, [ownershipManager.type]);
  return (
    <Dialog
      open={
        ownershipManager.type == 'CLAIM-STARTED' ||
        ownershipManager.type == 'CLAIM-CODE-RECIEVED'
      }
    >
      <DialogContent className="p-9">
        <DialogHeader>
          <DialogTitle>Claim Ownership</DialogTitle>
          <DialogDescription className="text-left !my-4">
            Verify that you are owner of this YT channel and earn 20% of the
            trading volume on this market
          </DialogDescription>
          <SecondaryButton
            className="flex !text-2 !bg-[#f6f7fc] shadow-bottom items-center justify-center gap-3 py-3 text-f12"
            onClick={() => (window.location.href = url)}
          >
            <img src="/public/Google.png" className="w-6 h-6" /> Verfiy with
            google
          </SecondaryButton>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { OwnershipClaimDialog };