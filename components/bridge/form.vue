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
  <div>
    <BridgeStepList />
    <BridgeSource class="mt-10" />
    <BridgeTarget />
  </div>
</template>
