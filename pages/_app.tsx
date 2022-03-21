import React from 'react'
import 'antd/dist/antd.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import Moralis from 'moralis'
import { Provider } from 'wagmi'
import { MoralisProvider } from 'react-moralis'
import Layout from '../components/Layout'

const ethers = Moralis.web3Library
const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const MORALIS_SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
const provider = ({ chainId }) => new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <Provider provider={provider}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MoralisProvider>
  )
}
export default MyApp
