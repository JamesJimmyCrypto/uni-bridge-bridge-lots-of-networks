<script setup lang="ts">
const { getSupportedChains, getSupportedProviders, getQuote } = $(swapKitAPIStore());

const rz = await getSupportedChains();
const rz1 = await getSupportedProviders();

const sellAsset = "BTC/BTC";
const buyAsset = "BTC.BTC";
const sellAmount = 0.01;
const senderAddress = "3Erb1kfcCZrfDAJGaWfxL6GcyhaU6jiTJ3"; // BTC_WALLET_ADDRESS;
const recipientAddress = "3Erb1kfcCZrfDAJGaWfxL6GcyhaU6jiTJ3"; // ETH_WALLET_ADDRESS;

const quote = await getQuote(sellAsset, buyAsset, sellAmount, senderAddress, recipientAddress);
console.log(`====> rz :`, quote);
</script>

<template>
  <div>
    <!-- <UButton @click="connectWallet" :disabled="!wallet">Connect Wallet</UButton> -->
  </div>
</template>
