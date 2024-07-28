<script setup lang="ts">
import { useStorage } from "@vueuse/core";

definePageMeta({
  colorMode: "dark",
});
</script>

<template>
  <UMain class="flex pt-10 justify-center">
    <UContainer>
      <BridgeWrap />
    </UContainer>
  </UMain>
</template>
