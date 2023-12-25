import { Web3Auth } from '@web3auth/modal';
import axios from 'axios';
type User = {};

const getUserData = async (address: `0x${string}`) => {
  try {
    const userInfo = await axios.get(
      `https://api-production-4b67.up.railway.app/user/address/${address}`
    );
    return userInfo;
  } catch (e) {
    return null;
  }
};
const registerUser = async (connector: any, address: `0x${string}`) => {
  if (!connector) return null;

  const userInfo = await connector.web3AuthInstance.getUserInfo();
  console.log(`userInfo: `, userInfo);
  const registerPayload = {
    first_name: userInfo.name,
    last_name: userInfo.name,
    email: userInfo.email,
    img_url: userInfo.profileImage,
    password: 'not-needed',
    third_party_verifier: userInfo.verifier,
    third_party_id: userInfo.verifierId,
    public_address: address,
  };

  const res = await axios.put(
    `https://api-production-4b67.up.railway.app/user/create`,
    registerPayload,
    { headers: { Authorization: `Bearer ${userInfo.idToken}` } }
  );
  if (res.error) {
    throw new Error('User info not found');
  }
  //   console.log(`res: `, res);

  return res;
};

export { registerUser, getUserData };
