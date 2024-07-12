<script setup lang="ts">
const { connectWallet, fetchWalletBalances } = $(swapKitStore());
const wallet = $ref(null);
</script>

<template>
  <div>
    <UButton @click="connectWallet" :disabled="!wallet">Connect Wallet</UButton>
  </div>
</template>
