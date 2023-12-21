import './App.css';
import { RecoilRoot } from 'recoil';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './Hooks/WagmiConfig';
import { LoginPage } from './pages/Web3auth/LoginPage';

function App() {
  return (
    <RecoilRoot>
      <WagmiConfig config={wagmiConfig}>
        <LoginPage />
      </WagmiConfig>
    </RecoilRoot>
  );
}

export default App;
