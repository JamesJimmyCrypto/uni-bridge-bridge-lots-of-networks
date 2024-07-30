declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

interface EIP6963ProviderInfo {
  rdns: string;
  uukey: string;
  name: string;
  icon: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo;
    provider: Readonly<EIP1193Provider>;
  };
};

interface EIP1193Provider {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string; params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void;
  send?: (request: { method: string; params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void;
  request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>;
}

import { acala, avalanche, arbitrum, dogechain, polygon, bsc, opBNB, mainnet } from 'viem/chains'
let allChainList =  [
    {
      key: "arbitrum",
      icon: "token-branded:arbi",
      ...arbitrum,
    },
    {
      key: 'acala',
      avatar: {
        src: 'https://acala.network/assets/Acala%20Gradient-tyIktH2a.png'
      },
      ...acala,
    },
    {
      key: "avalanche",
      icon: "token-branded:avax",
      ...avalanche,
    },
    {
      key: "polygon",
      icon: "token-branded:polygon-pos",
      ...polygon,
    },
    {
      key: "bsc",
      icon: "token-branded:binance-smart-chain",
      ...bsc,
    },
    {
      key: "bnb",
      icon: "cryptocurrency-color:bnb",
      ...opBNB,
    },
    {
      key: "dogechain",
      avatar: {
        src: 'https://ugc.production.linktr.ee/tPCVQbdjQrCpobdIcJZp_ZZ28y10j9t75pLGN?io=true&size=avatar-v3_0'
      },
      ...dogechain
   },
   {
      key: "eth",
      icon: "token-branded:eth",
      ...mainnet,
    },
    // not done
    {
      key: "arweave",
      label: "Arweave",
      icon: "token:ar",
    },
    {
      key: "btc",
      label: "BTC",
      icon: "token-branded:btc",
    },
    {
      key: "bch",
      label: "BCH",
      icon: "token-branded:bch",
    },
  
    // {
    //   key: "dash",
    //   label: "DASH",
    //   icon: "token-branded:dash",
    // },
  
    {
      id: 'dot',
      key: "dot",
      label: "DOT",
      icon: "token-branded:polkadot",
    },
    
    {
      key: "kuji",
      label: "KUJI",
      icon: "token-branded:kujira",
    },
    {
      key: "ltc",
      label: "LTC",
      icon: "token-branded:ltc",
    },
    {
      key: "maya",
      label: "MAYA",
      avatar: {
        src: "https://storage.googleapis.com/token-list-swapkit-dev/images/maya.cacao.png",
      },
    },
    {
      key: "thor",
      label: "THOR",
      icon: "token-branded:thor",
    },
]

allChainList = useMap(
  allChainList,
  item => {
    return {
      ...item,
      label: item.name || item.label
    }
  }
);
allChainList = useSortBy(
  allChainList,
  "key"
);

const allWalletList = [
    {
      rdns: "arconnect",
      label: "ArConnect",
      avatar: {
        src: "https://www.arconnect.io/_next/image?url=%2Flogo.png&w=640&q=75",
      },
      url: "https://www.arconnect.io/",
      tags: ["ar"],
    },
    {
      rdns: "io.metamask",
      label: "MetaMask",
      icon: "logos:metamask-icon",
      url: "https://metamask.io/",
      tags: ["evm"],
    },
    {
      rdns: "io.metamask.flask",
      label: "MetaMask Flask",
      avatar: {
        src: "/assets/logo/metamask-flask.png",
      },
      url: "https://docs.metamask.io/snaps/get-started/install-flask/",
      tags: ["evm"],
    },
  ];
  


export const uniConnectorStore = defineStore("uniConnectorStore", () => {
  let isLoading = $ref(false);
  let isOpen = $ref(true);
  let isConnected = $ref(false);
  let address = $ref("");
  let providers = $ref([]);
  let currentAccount = $ref("");
  let currentWallet = $ref("");

  const fromChainList = [...allChainList];
  let fromChain = $ref();

  let fromWalletApp = $ref();
  

  const fromWalletAppList = $computed(() => {
    if (!fromChain) {
      return [];
    }

    let tag = "evm";
    let walletAppMap = {};

    if (fromChain.key === "arweave") {
      tag = "ar";
    }

    walletAppMap = useKeyBy(
      useFilter(allWalletList, (wallet) => {
        return wallet.tags.includes(tag);
      }),
      "rdns"
    );

    useForEach(providers, ({ provider, info }) => {
      if (!walletAppMap[info.rdns]) return;
      walletAppMap[info.rdns].isInstalled = true;
      walletAppMap[info.rdns].provider = provider;
    });
    return useSortBy(walletAppMap, "id");
  });


  function listProviders() {
    if (providers.length > 0) return;
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      console.log(`====> event.detail :`, event.detail);
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) return;

      providers = [...providers, event.detail];
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    // Notify event listeners and other parts of the dapp that a provider is requested.
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }

  const forceSwitchChain = async (chain, wallet) => {
    console.log(`====> chain, wallet :`, chain, wallet)
  }
  // Connect to the selected provider using eth_requestAccounts.
  const connectWithProvider = async (wallet: EIP6963AnnounceProviderEvent["detail"]) => {
    try {
      const accounts = await wallet.provider.request({ method: "eth_requestAccounts" });
      let chainId = await wallet.provider.request({ method: "eth_chainId" });
      chainId = Number(chainId)
      console.log(`====> chainId :`, chainId)
      currentAccount = accounts[0];
      currentWallet = wallet;
      isOpen = false

      // await forceSwitchChain(fromChain, currentWallet)
      console.log(`====> currentWallet :`, currentWallet)
    } catch (error) {
      // TODO: show error message to user
      console.error("Failed to connect to provider:", error);
    }
  };

  const connectOrJump = async rdns => {
    const walletAppMap = useKeyBy(fromWalletAppList, "rdns");
    if (walletAppMap[rdns]?.isInstalled) {
      return connectWithProvider(walletAppMap[rdns])
    }
    // do jump
    const url = walletAppMap[rdns].url;
    if (url) {
      window.open(url, "_blank");
    }
  }

  return $$({ isLoading, currentAccount, currentWallet, listProviders, connectOrJump, providers, isConnected, address, isOpen, fromChainList, fromWalletAppList, fromChain, fromWalletApp });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(uniConnectorStore, import.meta.hot));
