import '../styles/globals.css'
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { MoralisProvider } from 'react-moralis';

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [publicProvider()]);

const { connectors } = getDefaultWallets ({
  appName: 'My RainbowKit App',
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors,
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitProvider chains={chains}>
          <MoralisProvider appId="7vk3O4Ke35iRFGc0isJcEnOESntyyGGo83EM0ADD" serverUrl="https://ryonne1s1k1t.usemoralis.com:2053/server">
         <Component {...pageProps} />
         </MoralisProvider>
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
