import LoginPage from './pages/LoginPage';
import './App.css';
import { Web3AuthWithWagmi } from './pages/Web3auth/Web3AuthWithWagmi';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Web3AuthWithWagmi />
      <Toaster />
    </>
  );
}

export default App;
