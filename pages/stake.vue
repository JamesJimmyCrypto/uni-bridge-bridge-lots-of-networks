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

const isYearly = ref(false);

const buttonMap = $computed(() => {
  return {
    0: { label: "Stake", color: "white" },
    1: { label: "Stake", color: "primary" },
    2: { label: "Stake", color: "white" },
  };
});
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero" class="!py-40">
      <template #links>
        <div class="max-w-2xl">Not just farm AO, but also farm the $UB of the uni-bridge platform.</div>
      </template>
    </UPageHero>

    <UContainer>
      <UPricingGrid>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :title="`Stake ${plan.price} stETH`"
          :price="` ${plan.veAmount} $veUB`"
          :button="buttonMap[index]"
        />
      </UPricingGrid>
    </UContainer>

    <ULandingSection v-if="false">
      <ULandingLogos>
        <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon" class="flex-shrink-0 h-12 text-gray-500 w-12 dark:text-gray-400" />
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection v-if="false" :title="page.faq.title" :description="page.faq.description" class="mt-20">
      <ULandingFAQ :items="page.faq.items" multiple default-close class="mx-auto max-w-4xl" />
    </ULandingSection>
  </div>
</template>
