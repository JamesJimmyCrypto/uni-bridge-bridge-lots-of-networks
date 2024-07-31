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

import arbToken from "~/assets/tokenlists/arb.json";
import avaxToken from "~/assets/tokenlists/avax.json";
import bnbToken from "~/assets/tokenlists/bnb.json";
import bscToken from "~/assets/tokenlists/bsc.json";
import ethToken from "~/assets/tokenlists/eth.json";
import btcToken from "~/assets/tokenlists/btc.json";
import ltcToken from "~/assets/tokenlists/ltc.json";
import bchToken from "~/assets/tokenlists/bch.json";
import dotToken from "~/assets/tokenlists/dot.json";
import dashToken from "~/assets/tokenlists/dash.json";
import kujiToken from "~/assets/tokenlists/kuji.json";
import mayaToken from "~/assets/tokenlists/maya.json";
import thorToken from "~/assets/tokenlists/thor.json";

import { acala, avalanche, arbitrum, dogechain, polygon, bsc, opBNB, mainnet } from "viem/chains";
import { createWalletClient, custom, publicActions } from "viem";
let allChainList = [
  {
    key: "arbitrum",
    icon: "token-branded:arbi",
    ...arbitrum,
    tokens: arbToken,
  },
  // {
  //   key: "acala",
  //   avatar: {
  //     src: "https://acala.network/assets/Acala%20Gradient-tyIktH2a.png",
  //   },
  //   ...acala,
  // },
  //  {
  //   key: "polygon",
  //   icon: "token-branded:polygon-pos",
  //   ...polygon,
  // },
  // {
  //   key: "dogechain",
  //   avatar: {
  //     src: "https://ugc.production.linktr.ee/tPCVQbdjQrCpobdIcJZp_ZZ28y10j9t75pLGN?io=true&size=avatar-v3_0",
  //   },
  //   ...dogechain,
  // },
  // {
  //   key: "arweave",
  //   label: "Arweave",
  //   icon: "token:ar",
  // },
  {
    key: "avalanche",
    icon: "token-branded:avax",
    ...avalanche,
    tokens: avaxToken,
  },
  {
    key: "bsc",
    icon: "token-branded:binance-smart-chain",
    ...bsc,
    tokens: bscToken,
  },
  {
    key: "bnb",
    icon: "cryptocurrency-color:bnb",
    ...opBNB,
    tokens: bnbToken,
  },
  {
    key: "eth",
    icon: "token-branded:eth",
    ...mainnet,
    tokens: ethToken,
  },
  {
    key: "btc",
    label: "BTC",
    icon: "token-branded:btc",
    tokens: btcToken,
  },
  {
    key: "bch",
    label: "BCH",
    icon: "token-branded:bch",
    tokens: bchToken,
  },
  {
    id: "dot",
    key: "dot",
    label: "DOT",
    icon: "token-branded:polkadot",
    tokens: dotToken,
  },
   {
    key: "dash",
    label: "DASH",
    icon: "token-branded:dash",
    tokens: dashToken,
  },
  {
    key: "kuji",
    label: "KUJI",
    icon: "token-branded:kujira",
    tokens: kujiToken,
  },
  {
    key: "ltc",
    label: "LTC",
    icon: "token-branded:ltc",
    tokens: ltcToken,
  },
  {
    key: "maya",
    label: "MAYA",
    avatar: {
      src: "https://storage.googleapis.com/token-list-swapkit-dev/images/maya.cacao.png",
    },
    tokens: mayaToken,
  },
  {
    key: "thor",
    label: "THOR",
    icon: "token-branded:thor",
    tokens: thorToken,
  },
];

allChainList = useMap(allChainList, (item) => {
  return {
    ...item,
    label: item.name || item.label,
  };
});
allChainList = useSortBy(allChainList, "id");

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
  const { addError, addSuccess } = $(notificationStore());
  let isLoading = $ref(false);
  let isConnectorOpen = $ref(false);
  let isAddressBookOpen = $ref(false);
  let isConnected = $ref(false);
  let address = $ref("");
  let providers = $ref([]);
  let currentChainId = $ref("");
  let currentAccount = $ref("");
  let currentWallet = $ref("");
  let walletClient = $ref();
  let currentRdns = $(useLocalStorage('uni-current-rdns', ''))
  let fromChainId = $(useLocalStorage('uni-from-chain-id', 0))

  // from
  const fromChainList = [...allChainList];
  let fromChain = $ref();
  let fromWalletApp = $ref();
  const fromTokenList = $computed(() => {
    return fromChain?.tokens || [];
  });
  let fromToken = $ref({});
  let fromTokenBalance = $ref(0);
  let fromAmount = $ref(0);

  const setMaxAmount = () => {
    fromAmount = formatUnits(fromTokenBalance, fromToken.decimals, fromToken.decimals);
  };
  let isLoadingFromTokenBalance = $ref(false);
  watch($$(fromChain), () => {
    // fromToken = {};
    fromTokenBalance = 0
    // fromAmount = 0
  })


  const isWrongNetwork = $computed(() => {
    if (!fromChain) return false;
    return fromChain.id !== currentChainId;
  });

  watchEffect(async () => {
    if (isWrongNetwork) return;
    if (isEmpty(fromToken)) return;

    fromTokenBalance = 0;
    isLoadingFromTokenBalance = true;
    if (!fromToken.address) {
      fromTokenBalance = await walletClient.getBalance({
        address: currentAccount,
      });
      isLoadingFromTokenBalance = false;
      return;
    }

    fromTokenBalance = await walletClient.readContract({
      address: fromToken.address,
      functionName: "balanceOf",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      args: [currentAccount],
    });
    isLoadingFromTokenBalance = false;
  });

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

  // to
  const toChainList = [...allChainList];
  // $computed(() => {
  //   return fromChainList.filter((item) => {
  //     if (fromChain?.key === item.key) return false;
  //     return true;
  //   });
  // });
  let toChain = $ref();
  const toTokenList = $computed(() => {
    return toChain?.tokens || [];
  });
  let toToken = $ref({});
  let toAmount = $ref(0);
  let toTokenBalance = $ref(0);

  // TODO: after cross chain hackathon
  // let isLoadingToTokenBalance = $ref(false);
  // watchEffect(async () => {
  //   if (isEmpty(toToken)) return;

  //   toTokenBalance = 0;
  //   isLoadingToTokenBalance = true;
  //   if (!toToken.address) {
  //     toTokenBalance = await walletClient.getBalance({
  //       address: currentAccount,
  //     });
  //     isLoadingToTokenBalance = false;
  //     return;
  //   }

  //   toTokenBalance = await walletClient.readContract({
  //     address: toToken.address,
  //     functionName: "balanceOf",
  //     abi: [
  //       {
  //         inputs: [
  //           {
  //             internalType: "address",
  //             name: "account",
  //             type: "address",
  //           },
  //         ],
  //         name: "balanceOf",
  //         outputs: [
  //           {
  //             internalType: "uint256",
  //             name: "",
  //             type: "uint256",
  //           },
  //         ],
  //         stateMutability: "view",
  //         type: "function",
  //       },
  //     ],
  //     args: [currentAccount],
  //   });
  //   isLoadingToTokenBalance = false;
  // });

  function listProviders() {
    if (providers.length > 0) return;
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) return;

      providers = [...providers, event.detail];
      const { rdns } = event.detail.info;
      
      if (currentRdns === rdns && fromChainId !== 0) {
        fromChain = fromChainList.find((item) => item.id === fromChainId);
        connectOrJump(currentRdns)
      }
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    // Notify event listeners and other parts of the dapp that a provider is requested.
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }

  const forceSwitchChain = async (chain, wallet) => {
    const chainId = `0x${chain.id.toString(16)}`;

    try {
      await wallet.provider // Or window.ethereum if you don't support EIP-6963.
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          const data = {
            chainId,
            chainName: chain.name,
            nativeCurrency: { ...chain.nativeCurrency },
            rpcUrls: [useGet(chain, "rpcUrls.default.http[0]")],
            blockExplorerUrls: [useGet(chain, "blockExplorers.default.url")],
          };
          await wallet.provider // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: "wallet_addEthereumChain",
              params: [data],
            });
          return true;
        } catch (errMsg) {
          // Handle "add" error.
          console.log(`====> errMsg :`, errMsg);
          addError(errMsg.message);
          return false;
        }
      }
      console.log(`====> switchError :`, switchError);
      addError(switchError.message);
    }
    return false;
  };
  // Connect to the selected provider using eth_requestAccounts.
  const connectWithProvider = async (wallet: EIP6963AnnounceProviderEvent["detail"]) => {
    try {
      const accounts = await wallet.provider.request({ method: "eth_requestAccounts" });
      const chainId = await wallet.provider.request({ method: "eth_chainId" });
      wallet.provider.on("chainChanged", (chainId) => {
        currentChainId = Number(chainId);
      });
      currentChainId = Number(chainId);
      if (currentChainId !== fromChain?.id) {
        const rz = await forceSwitchChain(fromChain, wallet);
        if (!rz) {
          return;
        }
      }
      currentAccount = accounts[0];
      currentWallet = wallet;
      isConnectorOpen = false;
      walletClient = createWalletClient({
        account: currentAccount,
        chain: fromChain,
        transport: custom(wallet.provider),
      }).extend(publicActions);
      return true
    } catch (error) {
      // TODO: show error message to user
      console.error("Failed to connect to provider:", error);
      return false
    }
  };

  const connectOrJump = async (rdns) => {
    const walletAppMap = useKeyBy(fromWalletAppList, "rdns");
    if (walletAppMap[rdns]?.isInstalled) {
      const rz = connectWithProvider(walletAppMap[rdns]);
      if (rz) {
        currentRdns = rdns
        fromChainId = fromChain.id
      }
      return
    }
    // do jump
    const url = walletAppMap[rdns].url;
    if (url) {
      window.open(url, "_blank");
    }
  };

  let toAddress = $(useLocalStorage("uni-toAddress", "", {initOnMounted: true}));

  const swapDirection = () => {
    [fromToken, toToken] = [toToken, fromToken];
    [fromChain, toChain] = [toChain, fromChain];
    [fromAmount, toAmount] = [toAmount, fromAmount];
  };
  
  return $$({
    swapDirection,
    toAddress,
    isLoading,
    currentChainId,
    forceSwitchChain,
    setMaxAmount,
    fromAmount,
    isWrongNetwork,
    currentAccount,
    currentWallet,
    toTokenList,
    toToken,
    listProviders,
    connectOrJump,
    providers,
    isConnected,
    address,
    isConnectorOpen,
    isAddressBookOpen,
    fromChainList,
    toChain,
    toChainList,
    fromWalletAppList,
    toAmount,
    isLoadingFromTokenBalance,
    toTokenBalance,
    fromChain,
    fromWalletApp,
    fromTokenList,
    fromToken,
    fromTokenBalance,
  });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(uniConnectorStore, import.meta.hot));
