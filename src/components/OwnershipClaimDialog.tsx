import { useOwnershipClaimManager } from '@/atoms/OwnershipClaimState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PrimaryBtn, SecondaryBtn, SecondaryButton } from './Buttons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserState from '@/atoms/userState';
import { useSearchParams } from 'react-router-dom';
import { Platform } from '@/atoms/platformState';
// const redirect_url = 'https://handel.network';
const redirect_url = 'https://handel.network';

const OwnershipClaimDialog: React.FC<any> = ({ }) => {
  const ownershipManager = useOwnershipClaimManager();
  let stateValue = '';
  if (ownershipManager.market) {
    stateValue = `${ownershipManager?.market?.market_id}!!${ownershipManager?.market?.social_platform}`;
  }
  console.log(`OwnershipClaimDialog-stateValue: `, stateValue);

  const googleClientId =
    '784619188209-a1cmllig1omc0amcudtb69o5ro0njv86.apps.googleusercontent.com';
  const googleOAuthURL = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&access_type=offline&redirect_uri=${redirect_url}&client_id=${googleClientId}&state=${stateValue}`;

  const instagramClientId = '3368802966744481';
  const instagramOAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${instagramClientId}&redirect_uri=${redirect_url}&response_type=code&scope=user_profile&state=${stateValue}`;

  const githubClientId = 'Iv1.5ca66625f9d1b831';
  const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_url}&scope=repo&state=${stateValue}`;

  const twitterClientId = 'eWlQUy1ONGdrT3RQUUpmbkhHTEg6MTpjaQ';
  const twitterOAuthURL = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirect_url}&state=${stateValue}&scope=users.read&code_challenge=challenge&code_challenge_method=plain`;

  const [loading, setLoading] = useState(false);
  const [userState] = useUserState();
  const [searchParam, setSearchParam] = useSearchParams();
  const [claimed, setClaimed] = useState(false);
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
          auth_code: decodeURI(ownershipManager.code),
          platform: ownershipManager?.platform ?? null,
          challange: ownershipManager?.challange ?? null,
          market_id: ownershipManager.marketId,
          redirect_uri: redirect_url,
        },
        { headers: { 'session-id': sessionId ?? '' } }
      );
      console.log(`deb - claiming5.data: `, res.data);
      if (res.data?.error) {
        toast.error(res.data.error);
        ownershipManager.finishOwnershipClaim();
      } else {
        if (ownershipManager?.market?.social_platform == Platform.Twitter) {

        }
        toast.success('Ownership claimed successfully!');
        setClaimed(true);
      }
    };
    console.log(
      'deb-claiming2.5:',
      ownershipManager.type,
      userState?.session_id
    );
    if (
      ownershipManager.type == 'CLAIM-CODE-RECIEVED' &&
      userState?.session_id &&
      !loading
    ) {
      setLoading(true);
      claimHandler(userState?.session_id).finally(() => {
        setLoading(false);
        setSearchParam((p) => {
          p.delete('code');
          return { ...p };
        });
      });
    }
  }, [ownershipManager.type, userState?.session_id]);

  return (
    <Dialog
      onOpenChange={(c) => {
        if (!c) {
          ownershipManager.finishOwnershipClaim();
        }
      }}
      open={
        ownershipManager.type == 'CLAIM-STARTED' ||
        ownershipManager.type == 'CLAIM-CODE-RECIEVED'
      }
    >
      <DialogContent className="p-9">
        <DialogHeader>
          <DialogTitle>Claim Ownership</DialogTitle>

          {ownershipManager?.market?.market_id == 0 && ownershipManager?.market?.id == 0 ?
            <DialogDescription className="text-left !my-4">
              Login with Twitter and create your own market and earn 20% 🤑 of the trading volume on this market.
            </DialogDescription> :
            <DialogDescription className="text-left !my-4">
              Verify that you are owner of this
              {ownershipManager?.market?.social_platform == Platform.Instagram ? ' Instagram Profile ' :
                ownershipManager?.market?.social_platform == Platform.Twitter ? ' Twitter Profile ' :
                  ownershipManager?.market?.social_platform == Platform.Github ? ' Github Profile ' :
                    " YT channel "}
              and earn 20% of the
              trading volume on this market
            </DialogDescription>}

          <SecondaryButton
            className="flex !text-2 !bg-[#f6f7fc] shadow-bottom items-center justify-center gap-3 py-3 text-f12"
            onClick={() => {
              if (loading) return;
              if (claimed) {
                ownershipManager.finishOwnershipClaim();
              } else window.location.href = (ownershipManager?.market?.social_platform == Platform.Instagram ? instagramOAuthURL :
                ownershipManager?.market?.social_platform == Platform.Twitter ? twitterOAuthURL :
                  ownershipManager?.market?.social_platform == Platform.Github ? githubOAuthURL :
                    googleOAuthURL);
            }}
          >
            <img
              src={claimed ? '/ClaimSuccess.png' :
                (ownershipManager?.market?.social_platform == Platform.Instagram ? '/img/instagram.png' :
                  ownershipManager?.market?.social_platform == Platform.Twitter ? '/img/twitter.png' :
                    ownershipManager?.market?.social_platform == Platform.Github ? '/img/github.png' :
                      '/Google.png')}

              className="w-7 h-7"
            />{' '}
            {ownershipManager?.market?.social_platform == Platform.Instagram ? 'Verify with Instagram' :
              ownershipManager?.market?.social_platform == Platform.Twitter ? 'Verify with Twitter' :
                ownershipManager?.market?.social_platform == Platform.Github ? 'Verify with Github' :
                  "Verify with Google"}
          </SecondaryButton>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { OwnershipClaimDialog };;
