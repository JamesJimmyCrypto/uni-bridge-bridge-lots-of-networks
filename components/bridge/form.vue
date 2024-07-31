<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const { getSupportedChains } = $(swapKitAPIStore());

let tabs = $(useStorage("bridge-tabs", []));

onMounted(async () => {
  const chainsList = await getSupportedChains();
  tabs = useMap(chainsList, (value, key) => {
    return {
      label: key,
      value,
    };
  });
});

const allChainList = useSortBy(
  [
    {
      id: "arb",
      label: "ARB",
      icon: "token-branded:arbi",
    },
    {
      id: "avax",
      label: "AVAX",
      icon: "token-branded:avax",
    },
    {
      id: "arweave",
      label: "Arweave",
      icon: "token:ar",
    },
    {
      id: "btc",
      label: "BTC",
      icon: "token-branded:btc",
    },
    {
      id: "bch",
      label: "BCH",
      icon: "token-branded:bch",
    },
    {
      id: "bsc",
      label: "BSC",
      icon: "token-branded:binance-smart-chain",
    },
    // {
    //   id: "dash",
    //   label: "DASH",
    //   icon: "token-branded:dash",
    // },
    {
      id: "doge",
      label: "DOGE",
      icon: "token-branded:doge",
    },
    {
      id: "dot",
      label: "DOT",
      icon: "token-branded:polkadot",
    },
    {
      id: "eth",
      label: "ETH",
      icon: "token-branded:eth",
    },
    {
      id: "kuji",
      label: "KUJI",
      icon: "token-branded:kujira",
    },
    {
      id: "ltc",
      label: "LTC",
      icon: "token-branded:ltc",
    },
    {
      id: "maya",
      label: "MAYA",
      avatar: {
        src: "https://storage.googleapis.com/token-list-swapkit-dev/images/maya.cacao.png",
      },
    },
    {
      id: "thor",
      label: "THOR",
      icon: "token-branded:thor",
    },
  ],
  "id"
);

const { fromChainList, fromChain, fromTokenList, setMaxAmount, isLoading, fromToken, fromTokenBalance, fromAmount } = $(uniConnectorStore());

const toChainList = [...allChainList];

let toChain = $ref();

const fromWalletAddressList = ["0xd319905AFEa8401f1eb56fBFD0754853B6B79816", "pSQc9tmQKpw1mqDIOisGL2mXYdRjfldmoLZKkqFhuj4"];
const fromWalletAddress = $ref();

const swapDirection = () => {
  // TOOD
};

const submitBtnTxt = $computed(() => {
  return "Switch network";
});
const doSubmit = async () => {
  console.log(`====> submitBtnTxt :`, submitBtnTxt);
};

const doConnect = async () => {
  if (fromWalletApp.id === "metamask") {
    // Do connect action
  }
};
</script>

<template>
  <div class="space-y-4 min-w-80">
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="flex-bc">
        <div class="font-bold">FROM</div>
        <UniConnector uuid="bridge" />
      </div>
      <div class="flex-bc">
        <BridgeInputMenu :items="fromChainList" v-model="fromChain" placeholder="Select source chain" />
        <BridgeInputMenu :items="fromTokenList" v-model="fromToken" placeholder="Token" />
      </div>
      <div class="rounded-md flex-bc dark:bg-gray-900">
        <UInput class="flex-auto" variant="none" type="number" size="xl" v-model="fromAmount" placeholder="Please input token amount"></UInput>
      </div>

      <div class="flex-ec px-3">
        <div class="flex-bc space-x-2 text-sm">
          <div>Balance:</div>
          <Loading :isLoading="isLoading" class="flex-bc">
            <div>{{ formatUnits(fromTokenBalance, fromToken.decimals, 4) || 0 }} {{ fromToken.label }}</div>
            <UButton variant="link" @click="setMaxAmount">Max</UButton>
          </Loading>
        </div>
        <!-- <div>$1223.222</div> -->
      </div>
    </div>
    <div class="flex-cc py-2">
      <UButton @click="swapDirection" size="lg" icon="material-symbols:arrow-downward" color="lime" class="transition hover:rotate-180" />
    </div>
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="font-bold">To</div>
      <div class="flex-bc space-x-10">
        <BridgeInputMenu :items="toChainList" v-model="toChain" placeholder="Select target chain" />
        <!-- <BridgeInputMenu :items="toTokenList" v-model="toToken" placeholder="Select target token" /> -->
      </div>
      <!-- <div class="">
        {{ toAmount }}
      </div> -->
      <div class="flex-bc text-sm px-3">
        <div>Balance: 0.01233 ETH</div>
        <div>$1223.222</div>
      </div>
    </div>
    <UButton block size="xl" color="lime" @click="doSubmit">{{ submitBtnTxt }}</UButton>
  </div>
</template>
