<script setup lang="ts">
const {
  fromChainList,
  fromChain,
  toChainList,
  toChain,
  fromTokenList,
  setMaxAmount,
  isLoading,
  fromToken,
  currentAccount,
  toAddress,
  toTokenList,
  toToken,
  toTokenBalance,
  fromTokenBalance,
  fromAmount,
  isLoadingFromTokenBalance,
  swapDirection,
} = $(uniConnectorStore());

let { toAmount } = $(uniConnectorStore());

const { getQuote } = $(swapKitAPIStore());

let toAmountUSD = $ref(0);

watchEffect(async () => {
  const shouldIgnore =
    isNull(fromAmount) ||
    fromAmount === "" ||
    fromAmount === 0 ||
    isEmpty(fromToken) ||
    isEmpty(toToken) ||
    isEmpty(currentAccount) ||
    isEmpty(toAddress);
  if (shouldIgnore) return;

  const rz = await getQuote(fromToken.identifier, toToken.identifier, fromAmount, currentAccount, toAddress);
  if (rz.quoteId) {
    const route = useGet(rz, "routes[0]");
    toAmount = route.expectedOutput;
    toAmountUSD = route.expectedOutputUSD;
  }
});
const submitBtnTxt = $computed(() => {
  return "Switch network";
});
const doSubmit = async () => {
  console.log(`====> submitBtnTxt :`, submitBtnTxt);
};
</script>

<template>
  <div class="space-y-4 min-w-80">
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="flex-bc">
        <div class="font-bold">From</div>
        <UniConnector />
      </div>
      <div class="flex-bc">
        <BridgeInputMenu :items="fromChainList" v-model="fromChain" placeholder="Select chain" />
        <BridgeInputMenu :items="fromTokenList" v-model="fromToken" placeholder="Select token" />
      </div>
      <UInput class="flex-auto" type="number" size="xl" v-model="fromAmount" placeholder="Please input token amount"></UInput>
      <div class="flex-ec px-3">
        <div class="flex-bc space-x-2 text-sm">
          <div>Balance:</div>
          <Loading :isLoading="isLoadingFromTokenBalance" class="flex-bc">
            <div>{{ formatUnits(fromTokenBalance, fromToken.decimals, 4) || 0 }} {{ fromToken.label }}</div>
            <UButton variant="link" @click="setMaxAmount">Max</UButton>
          </Loading>
        </div>
      </div>
    </div>
    <div class="flex-cc py-2">
      <UButton @click="swapDirection" size="lg" icon="material-symbols:arrow-downward" color="lime" class="transition hover:rotate-180" />
    </div>
    <div class="rounded-lg space-y-2 bg-gray-600 p-4">
      <div class="flex-bc">
        <div class="font-bold">To</div>
        <UniAddressBook />
      </div>
      <div class="flex-bc space-x-10">
        <BridgeInputMenu :items="toChainList" v-model="toChain" placeholder="Select chain" />
        <BridgeInputMenu :items="toTokenList" v-model="toToken" placeholder="Select token" />
      </div>
      <UInput class="flex-auto" type="number" size="xl" v-model="toAmount" placeholder="Please input token amount"></UInput>
      <div class="flex-ec px-3">
        <div class="">
          <div v-if="toAmountUSD !== 0">${{ toAmountUSD }}</div>
        </div>
        <div class="flex-bc space-x-2 text-sm" v-if="false">
          <div>Balance:</div>
          <Loading :isLoading="isLoading" class="flex-bc">
            <div>{{ formatUnits(toTokenBalance, toToken.decimals, 4) || 0 }} {{ toToken.label }}</div>
          </Loading>
        </div>
      </div>
    </div>
    <UButton block size="xl" color="lime" @click="doSubmit">{{ submitBtnTxt }}</UButton>
  </div>
</template>
