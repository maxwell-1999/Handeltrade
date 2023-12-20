import { useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES, UserAuthInfo } from "@web3auth/base";
import { Web3 } from "web3";

// The very first page that the user sees when they visit the app
// Doing POC with web3auth.io
export default function LoginPage() {
  const [userInfo, setUserInfo] = useState<Partial<UserAuthInfo>>();

  const web3auth = new Web3Auth({
    clientId: "BER2IPJpbBvpJSNy1ci79ranyQNfS3a4kYKK9-Ebl0uGKHFWToZhEVu0e72RnXXGwNo6WbUJOJ5Fn86L_utcsFE",
    web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x66EED", // arbitrum-goerli testnet
      rpcTarget: "https://arbitrum-goerli.publicnode.com",
    },
    uiConfig: {
      appName: "W3A Heroes",
      mode: "dark", // light, dark or auto
      loginMethodsOrder: ["apple", "google", "twitter", "github"],
      logoLight: "https://web3auth.io/images/web3auth-logo.svg",
      logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      loginGridCol: 3,
      primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
    },
  });

  let init = async () => {
    await web3auth.initModal();
  };

  useEffect(() => { init(); }, []);

  let getLogin = async () => {

    const web3authProvider = await web3auth.connect();

    const userInfo = await web3auth.getUserInfo();

    console.log(userInfo);
    setUserInfo(userInfo);

    // @ts-ignore
    const web3 = new Web3(web3authProvider);

    const userAccounts = await web3.eth.getAccounts();
    console.log(userAccounts);

    const privateKey = web3auth ? await web3auth?.provider?.request({
      method: "private_key"
    }) : "";
    console.log("privateKey:", privateKey);

  };

  let getLogout = async () => {
    web3auth.clearCache();
  };

  const name = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

  return (
    <div className=''>
      {name}
      <p>
        Login Page
      </p>
      {!userInfo && <button className='border-2 p-2 bg-pink-200 hover:bg-pink-400 '
        onClick={() => getLogin()}
      >Login</button>}

      <p>
        {userInfo && JSON.stringify(userInfo)}
      </p>

      {userInfo && <button className='border-2 p-2 bg-pink-200 hover:bg-pink-400 '
        onClick={() => getLogout()}
      >Logout</button>}
    </div>
  );
}
