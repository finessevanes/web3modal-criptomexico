import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
} from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import SignMessage from "./components/SignMessage";

const chains = [mainnet, polygon];
const projectId = "PROJECT_ID";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <h1>CriptoMexico 2023</h1>
        <Web3Button />
        {isConnected && <SignMessage />}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
