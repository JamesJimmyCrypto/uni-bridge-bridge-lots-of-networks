<script setup lang="ts">
const { data: page } = await useAsyncData("stake", () => queryContent("/stake").findOne());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

definePageMeta({
  colorMode: "dark",
});

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

defineOgImage({
  component: "Saas",
  title: page.value.title,
  description: page.value.description,
});

const buttonMap = $computed(() => {
  return {
    0: { label: "Stake", color: "white" },
    1: { label: "Stake", color: "primary" },
    2: { label: "Stake", color: "white" },
  };
});

// const stakeS1Time = "2024-06-18T06:17Z";
const stakeS1Time = "2024-08-01T00:00Z";
</script>

<template>
  <div v-if="page" class="pb-40">
    <UPageHero v-bind="page.hero" class="!py-40">
      <template #title>
        Stake to farm <span class="text-rainbow animate-ping">AO</span> and <span class="text-rainbow animate-ping">$UB</span>
      </template>
      <template #links>
        <div class="font-bold max-w-2xl">Not just farm AO, but also farm the $UB of the uni-bridge platform.</div>
      </template>
    </UPageHero>

    <UContainer>
      <div class="space-y-5 mb-20">
        <div class="font-bold text-center text-primary animate-bounce text-2xl">Staking S1 closed in</div>
        <CountDown :end-time="stakeS1Time" class="text-rainbow" />
        <p class="mx-auto max-w-xl text-sm text-center w-full text-gray-500">
          After S1 ends, the $veUB mining speed of S2 will decrease. <br />So, participating in staking as earlier as you can!
        </p>
      </div>

      <UPricingGrid>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :title="`Stake ${plan.price} stETH`"
          :price="` ${plan.veAmount} $veUB / Day`"
          :button="buttonMap[index]"
        />
      </UPricingGrid>
    </UContainer>

    <ULandingSection v-if="false">
      <ULandingLogos>
        <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon" class="flex-shrink-0 h-12 text-gray-500 w-12 dark:text-gray-400" />
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection v-if="true" :title="page.faq.title" :description="page.faq.description" class="mt-20">
      <ULandingFAQ :items="page.faq.items" multiple default-close class="mx-auto max-w-4xl" />
    </ULandingSection>
  </div>
</template>
