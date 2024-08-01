<script setup lang="ts">
import { parseGwei } from "viem";
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
  walletClient,
  erc20ABI,
  toToken,
  writeContract,
  toTokenBalance,
  doLoadFromTokenBalance,
  fromTokenBalance,
  isLoadingFromTokenBalance,
  swapDirection,
} = $(uniConnectorStore());

let { fromAmount, toAmount, isConnectorOpen } = $(uniConnectorStore());

const { addError, addSuccess } = $(notificationStore());
const { getQuote } = $(swapKitAPIStore());

let toAmountUSD = $ref(0);

const fromAmountInvalidate = $computed(() => {
  return isNull(fromAmount) || fromAmount === "" || fromAmount === 0;
});

let isQuoteLoading = $ref(false);
let quoteError = $ref("");
let approvalTarget = $ref("");
let approvalToken = $ref("");
let allowance = $ref(0n);
let transaction = $ref({});

const doQueryAllowance = async () => {
  allowance = await walletClient.readContract({
    address: fromToken.address,
    functionName: "allowance",
    abi: erc20ABI,
    args: [currentAccount, approvalTarget],
  });
};
watchEffect(async () => {
  const shouldIgnore = fromAmountInvalidate || isEmpty(fromToken) || isEmpty(toToken) || isEmpty(currentAccount) || isEmpty(toAddress);
  if (shouldIgnore) return;

  isQuoteLoading = true;
  quoteError = "";

  const rz = await getQuote(fromToken.identifier, toToken.identifier, fromAmount, currentAccount, toAddress);
  if (rz.quoteId) {
    const route = useGet(rz, "routes[0]");
    toAmount = route.expectedOutput;
    toAmountUSD = route.expectedOutputUSD;
    approvalTarget = route.approvalTarget;
    approvalToken = route.approvalToken;
    transaction = route.transaction;

    if (fromToken.address) {
      await doQueryAllowance();
    } else {
      allowance = BigInt(Number.MAX_SAFE_INTEGER);
    }
  } else {
    toAmount = 0;
    toAmountUSD = 0;
    quoteError = rz.error;
    approvalTarget = "";
    approvalToken = "";
    allowance = 0n;
    transaction = {};
  }
  isQuoteLoading = false;
});

let isApprovalLoading = $ref(false);
let isBridging = $ref(false);
const isSubmitBtnLoading = $computed(() => {
  return isQuoteLoading || isApprovalLoading || isBridging;
});

const isRequireApproval = $computed(() => {
  if (isEmpty(approvalToken)) return false;
  if (fromAmount === "") return false;

  const amount = parseUnits(fromAmount.toString(), fromToken.decimals);
  return isSameAddress(approvalToken, fromToken.address) && allowance < amount;
});

const submitBtnTxt = $computed(() => {
  if (isEmpty(currentAccount)) return "Connect wallet";
  if (isEmpty(fromToken)) return "Please select token in From area";
  if (fromAmountInvalidate) return "Please input a validate token amount";
  if (isEmpty(toAddress)) return "Please add address in To area";
  if (isEmpty(toChain)) return "Please select chain in To area";
  if (isEmpty(toToken)) return "Please select token in To area";
  if (isQuoteLoading) return `Fetching a quote for ${fromChain.key}.${fromToken.label} to ${toChain.key}.${toToken.label}`;
  if (quoteError) return quoteError;
  if (isRequireApproval) return "Approve Allowance";

  return "Do Bridge";
});
const isDisabled = $computed(() => {
  if (toAmount === 0) return true;
  if (isQuoteLoading) return true;
  if (isEmpty(fromToken)) return true;
  if (fromAmountInvalidate) return true;
  if (isEmpty(toAddress)) return true;
  if (isEmpty(toChain)) return true;
  if (isEmpty(toToken)) return true;
  if (quoteError) return true;

  return false;
});

const doApproveAllowance = async () => {
  isApprovalLoading = true;
  const amount = parseUnits(fromAmount.toString(), fromToken.decimals);
  try {
    const { tx, result } = await writeContract(approvalToken, erc20ABI, "approve", [approvalTarget, amount]);
    setTimeout(async () => {
      await doQueryAllowance();
    }, 4000);
  } catch (err) {
    addError("Error", err);
    console.log(`====> err :`, err?.message);
  }

  isApprovalLoading = false;
};

const doSubmit = async () => {
  if (isDisabled || isQuoteLoading) return;

  if (submitBtnTxt === "Connect wallet") {
    isConnectorOpen = true;
    return;
  }
  if (submitBtnTxt === "Approve Allowance") {
    await doApproveAllowance();
    return;
  }

  isBridging = true;
  try {
    const data = usePick(transaction, ["data", "to", "gasPrice", "value"]);
    const hash = await walletClient.sendTransaction(data);
    const tx = await walletClient.waitForTransactionReceipt({
      hash,
    });
    if (tx.status !== "success") {
      addError("Do Bridge Error", tx);
      throw new Error(tx);
    }
    addSuccess("Do Bridge Success");
  } catch (err) {
    console.log(`====> err :`, err);
    addError(err?.message);
  }
  isBridging = false;
  setTimeout(async () => {
    await doLoadFromTokenBalance();
  }, 4000);
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
    <UButton :disabled="isDisabled" block :loading="isSubmitBtnLoading" size="xl" :color="isDisabled ? 'red' : 'lime'" @click="doSubmit">{{
      submitBtnTxt
    }}</UButton>
  </div>
</template>
