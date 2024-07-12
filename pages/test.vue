<script setup lang="ts">
// const { connectWallet, fetchWalletBalances } = $(swapKitStore());
// const wallet = ref(null);
import { createSwapKit } from "@swapkit/sdk";

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
</script>

<template>
  <div>
    {{ client }}
    <!-- <UButton @click="connectWallet" :disabled="!wallet">Connect Wallet</UButton> -->
  </div>
</template>
