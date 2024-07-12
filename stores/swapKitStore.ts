import { AssetAmount, Chain, createSwapKit, WalletOption } from "@swapkit/sdk";

export const swapKitStore = defineStore("swapKitStore", () => {
  const client = createSwapKit({
    config: {
      // stagenet: true,

      /**
       * @required for ETH
       */
      // ethplorerApiKey: "xxxx",
      // /**
      //  * @required for AVAX & BSC
      //  */
      // covalentApiKey?: string;
      // /**
      //  * @required for BTC, LTC, DOGE & BCH
      //  */
      // utxoApiKey?: string;
      // /**
      //  * @required for Walletconnect
      //  */
      // walletConnectProjectId?: string;
      // /**
      //  * @optional for Trezor config
      //  */
      // trezorManifest?: {
      //     email: string;
      //     appUrl: string;
      // }
    },
  });

  const connectChains = [Chain.Ethereum, Chain.Bitcoin, Chain.THORChain];

  const connectWallet = (walletOption: WalletOption) => {
    switch (walletOption) {
      case WalletOption.KEYSTORE: {
        return client.connectKeystore(connectChains, phrase);
      }

      case WalletOption.XDEFI:
        return client.connectXDEFI(connectChains);

      case WalletOption.WALLETCONNECT:
        return client.connectWalletconnect(connectChains);

      case WalletOption.METAMASK:
        return client.connectEVMWallet(connectChains, WalletOption.METAMASK);

      case WalletOption.WALLETCONNECT:
        return client.connectWalletconnect(connectChains);

      default:
        break;
    }
  };

  const fetchWalletBalances = async () => {
    const wallets = await Promise.all(connectChains.map(client.getWalletByChain));

    console.log(wallets);
    // [{ balance: AssetAmount[]; address: string; walletType: WalletOption }]
  };

  return $$({ connectWallet, fetchWalletBalances });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(swapKitStore, import.meta.hot));
