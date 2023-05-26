# Web3Modal | CriptoMexico

## Create a new project

In your terminal run:

```bash
npm create vite@latest
```

Name your project, select React, and then TypeScript as the options in the terminal. Next, open your project and install the Web3Modal dependencies.

```bash
cd EXAMPLE_PROJECT
npm install
npm install @web3modal/ethereum @web3modal/react wagmi viem
npm run dev
```

## Create a Project ID

Go to [cloud.walletconnect.com](cloud.walletconnect.com) and sign up. Create a new project. Keep this Project ID handy.

Go into your `App.tsx` file and replace the existing code with the following:
```typescript
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {  mainnet, polygon } from 'wagmi/chains'

const chains = [ mainnet, polygon]
const projectId = 'YOUR_PROJECT_ID'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <h1>CriptoMexico 2023</h1>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App;
```

Replace `YOUR_PROJECT_ID` with your Project ID.

Go back to your terminal and run your project. You should see a header tag with `CriptoMexico 2023`.

```bash
npm run dev
```

## Add Connect Button

Import `Web3Button` from `@web3modal/react` like this:

```typescript
import { Web3Modal, Web3Button } from '@web3modal/react'
```

Add the component under the header:

```typescript
// ... 

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <h1>CriptoMexico 2023</h1>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

// ...
```

## Add Sign Message

In order to sign a message, you will use the `useSignMessage` wagmi hook. Create a new folder called components and inside create a new file. Name this new file `SignMessage.tsx`. Add the following code:

```typescript
import { useSignMessage } from "wagmi";

function SignMessage() {
  const { data, signMessage, isSuccess } = useSignMessage({
    message: "gm wagmi frens",
  });

  return (
    <div>
      <button onClick={() => signMessage()}>Sign Message</button>
      {isSuccess && <div>Signature: {data}</div>}
    </div>
  );
}

export default SignMessage;
```

## Connection Status

Using the `useAccount` hook from wagmi, destructure the `isConnected` value. Update your `App` function.

```typescript
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
```
