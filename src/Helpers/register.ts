import { Web3Auth } from '@web3auth/modal';
import axios from 'axios';
type User = {};

const getUserData = async (address: `0x${string}`) => {
  try {
    const userInfo = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/address/${address}`
    );
    return userInfo.data;
  } catch (e) {
    return null;
  }
};
const registerUser = async (connector: any, address: `0x${string}`) => {
  if (!connector) return null;

  const userInfo = await connector.web3AuthInstance.getUserInfo();
  console.log(`user-state-deb userInfo: `, userInfo);
  const registerPayload = {
    first_name: userInfo.name,
    last_name: '',
    email: userInfo.email,
    img_url: userInfo.profileImage,
    password: 'not-needed',
    third_party_verifier: userInfo.verifier,
    third_party_id: userInfo.verifierId,
    public_address: address,
    country: '',
    timezone: '',
    gender: 0,
  };

  const res = await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}/user/create`,
    registerPayload,
    {
      headers: {
        Authorization: `Bearer ${userInfo.idToken}`
      },
      withCredentials: true,
    }
  );
  if (res.data.error) {
    throw new Error('User info not found');
  }
  //   console.log(`res: `, res);

  return res.data;
};

export { registerUser, getUserData };
