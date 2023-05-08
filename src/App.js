import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Home from './pages/Home';


const { chains, provider } = configureChains(
  [bsc],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Bnbomb',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function App() {


  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: "#141414"
      })}>
        <Home />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
