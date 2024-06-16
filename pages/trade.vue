<script setup lang="ts">
definePageMeta({
  colorMode: "dark",
});
</script>

<template>
  <UMain class="flex justify-center items-center">
    <UContainer>
      <ULandingSection
        headline="Stay tuned, coming soon"
        description="Trading your AO even before it is unlocked. Including perpetual swaps, earn $UB by trading and build the future of DeFi on AO."
      >
        <template #title> The <span class="text-rainbow animate-pulse uppercase"> PERPETUAL PROTOCOL </span> on AO</template>
      </ULandingSection>
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-emojione-monotone-wrapped-gift"
          title="Trade $wrapAO"
          description="AO is not unlocked yet, we provide $wrapAO for you to trade."
        />
        <ULandingCard class="col-span-6 row-span-4" icon="i-material-symbols-speed" title="Super fast" description="Extreme speed, no lag time" />
        <ULandingCard class="col-span-6 row-span-4" title="Write in AO" description="The protocol will be written in AO, Of course!">
          <template #icon>
            <NuxtImg class="h-8 text-gray-900 w-8 dark:text-white" src="/ao.svg" />
          </template>
        </ULandingCard>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-icon-park-outline-many-to-many"
          title="Trading anything"
          description="ERC20, ERC721, ERC1155, any token, any NFT can be traded here."
        />
      </ULandingGrid>
    </UContainer>
  </UMain>
</template>
