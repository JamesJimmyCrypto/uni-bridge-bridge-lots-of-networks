<script setup lang="ts">
import { useStorage } from "@vueuse/core";

definePageMeta({
  colorMode: "dark",
});
</script>

<template>
  <UMain class="flex justify-center items-top">
    <UContainer>
      <ULandingSection
        headline="Stay tuned, coming soon"
        description="From one chain to anyother chain, whatever, whereever you want."
        :links="[{ label: 'Bridge', color: 'lime', trailingIcon: 'i-heroicons-arrow-right', size: 'lg', to: '/bridge' }]"
      >
        <template #title> The <span class="text-rainbow animate-pulse uppercase">freedom</span> to moving your assets </template>
      </ULandingSection>
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-material-symbols-light-dynamic-feed-rounded"
          title="Chain agnosticism"
          description="No matter what chain, you can bridge."
        />
        <ULandingCard class="col-span-6 row-span-4" icon="i-material-symbols-speed" title="Super fast" description="Extreme speed, no lag time" />
        <ULandingCard class="col-span-6 row-span-4" title="Build via AO " description="Full support for AO, full stack AO">
          <template #icon>
            <NuxtImg class="h-8 text-gray-900 w-8 dark:text-white" src="/ao.svg" />
          </template>
        </ULandingCard>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-icon-park-outline-many-to-many"
          title="Any assets"
          description="ERC20, ERC721, ERC1155, any token, any NFT."
        />
      </ULandingGrid>
    </UContainer>
  </UMain>
</template>
