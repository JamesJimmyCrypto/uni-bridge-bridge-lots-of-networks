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
  console.log(`====> tabs :`, tabs);
});
</script>

<template>
  <div class="space-y-4 min-w-80">
    <div class="flex justify-between items-center">
      <div class="font-bold">From</div>
      <div class="rounded-lg bg-gray-600 py-2 px-4">0xd31...888</div>
    </div>
    <div class="rounded-lg bg-gray-600 p-4">
      <BridgeInputMenu />
    </div>
  </div>
</template>
