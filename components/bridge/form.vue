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
      id: "eth",
      label: "ETH",
      icon: "token-branded:eth",
    },
    {
      id: "thor",
      label: "THOR",
      icon: "token-branded:thor",
    },
    {
      id: "polygon",
      label: "Polygon",
      icon: "token-branded:polygon-zkevm",
    },
    {
      id: "polkadot",
      label: "Polkadot",
      icon: "token-branded:polkadot",
    },
  ],
  "id"
);

const fromChainList = [...allChainList];
let fromChain = $ref();

const fromTokenList = [
  {
    id: "eth",
    label: "ETH",
    icon: "token-branded:eth",
  },

  {
    id: "arweave",
    label: "AR",
    icon: "token:ar",
  },
];

let fromToken = $ref(null);
let amount = $ref();

const fromWalletAppList = $computed(() => {
  const walletAppList = [
    {
      id: "metamask",
      label: "MetaMask",
      icon: "logos:metamask-icon",
    },
    {
      id: "arconnect",
      label: "ArConnect",
      avatar: {
        src: "https://www.arconnect.io/_next/image?url=%2Flogo.png&w=640&q=75",
      },
    },
  ];
  // TODO: filter out wallet app that not match with current chain
  return useSortBy(walletAppList, "id");
});

const fromWalletApp = $ref();

const fromWalletAddressList = ["0xd319905AFEa8401f1eb56fBFD0754853B6B79816", "pSQc9tmQKpw1mqDIOisGL2mXYdRjfldmoLZKkqFhuj4"];
const fromWalletAddress = $ref();

const swapDirection = () => {
  // TOOD
};
</script>

<template>
  <div class="space-y-4 min-w-80">
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="font-bold">FROM</div>
      <div class="flex-bc space-x-10">
        <BridgeInputMenu :items="fromChainList" v-model="fromChain" placeholder="Select source chain" />
        <BridgeInputMenu :items="fromWalletAppList" v-model="fromWalletApp" placeholder="Select wallet app" />
      </div>
      <UInputMenu v-model="fromWalletAddress" size="xl" :options="fromWalletAddressList" placeholder="Please select your wallet address" />
      <div class="flex-bc">
        <UInput class="flex-1" type="number" size="xl" v-model="amount" placeholder="Please input token amount"></UInput>
        <BridgeInputMenu :items="fromTokenList" v-model="fromToken" size="xl" />
      </div>

      <div class="flex-bc px-3">
        <div>$1223.222</div>
        <div>Balance: 0.01233 ETH</div>
      </div>
    </div>
    <div class="flex-cc py-2">
      <UButton @click="swapDirection" size="lg" icon="material-symbols:arrow-downward" color="lime" class="transition hover:rotate-180" />
    </div>
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="font-bold">To</div>
      <div class="flex-bc space-x-10">
        <BridgeInputMenu :items="fromChainList" v-model="fromChain" />
        <BridgeInputMenu :items="fromTokenList" v-model="fromToken" />
      </div>
      <UInput type="number" size="xl" v-model="amount" placeholder="Please input token amount" />
      <div class="flex-bc px-3">
        <div>$1223.222</div>
        <div>Balance: 0.01233 ETH</div>
      </div>
    </div>
  </div>
</template>
