import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';

const Onboarding: React.FC<any> = ({}) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [item, setItem] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem('user');
    console.log(`Onboarding-item: `, item);
    setItem(item);
  }, []);
  useEffect(() => {
    if (!address) {
      navigate('/');
    }
  }, [address]);
  return (
    <div>
      Welcome to app
      <div>{JSON.stringify(item)}</div>
      <button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </button>
    </div>
  );
};

export { Onboarding };
