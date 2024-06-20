import { camelCase } from 'lodash-es';
import { hardhat, mantleTestnet, polygonAmoy, goerli, polygon, avalancheFuji, optimismGoerli, moonbaseAlpha, bscTestnet } from 'viem/chains'
import _ from 'lodash'
import { defineChain, http } from 'viem'

moonbaseAlpha.bridgeLink = 'https://faucet.moonbeam.network/'
polygonAmoy.bridgeLink = 'https://www.alchemy.com/faucets/polygon-amoy'
bscTestnet.bridgeLink = 'https://www.bnbchain.org/en/testnet-faucet'

export const miniGasMap = {
  bevmCanaryTestnet: "0.00009",
  bevmTestnet: "0.00009",
  hardhat: "0.1",
  binanceSmartChainTestnet: "0.01",
};

const bevmCanary = defineChain({
  id: 1501,
  name: 'BEVM Canary',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-canary-1.bevm.io'],
      webSocket: ['wss://rpc-canary-1.bevm.io/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://scan-canary.bevm.io' },
  },
  contracts: {},
  bridgeLink: 'https://www.bevm.io/bridge',
})

const bevmCanaryTestnet = defineChain({
  id: 1502,
  name: 'BEVM Canary Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://canary-testnet.bevm.io'],
      webSocket: ['wss://canary-testnet.bevm.io/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://scan-canary-testnet.bevm.io' },
  },
  contracts: {},
  bridgeLink: 'https://discord.gg/gRJ72RcrNK',
})

const bevmTestnet = defineChain({
  id: 11503,
  name: 'BEVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.bevm.io'],
      webSocket: ['wss://testnet.bevm.io/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://scan-testnet.bevm.io' },
  },
  contracts: {},
  bridgeLink: 'https://bevm-testnet-faucet-alpha.vercel.app/',
})

const allChains = {
  'binanceSmartChainTestnet': bscTestnet,
  hardhat, mantleTestnet, goerli, polygon, avalancheFuji, optimismGoerli, polygonAmoy, moonbaseAlpha, bevmCanary, bevmCanaryTestnet, bevmTestnet
}

export const chainsMap = _.keyBy(allChains, item => _.camelCase(item.name))

export const getTransport = (network: String) => {
  let rpcUrl = _.get(chainsMap[network], 'rpcUrls.default.http[0]')
  if (network === 'moonbaseAlpha') {
    rpcUrl = 'https://moonbaseAlpha.public.blastapi.io'
  }

  return http(rpcUrl)
}

export const chainMapById =  _.keyBy(allChains, 'id')
