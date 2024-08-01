<script setup lang="ts">
definePageMeta({
  colorMode: "dark",
});

const { data: page } = await useAsyncData("home", () => queryContent("/").where({ title: "UNI Bridge for All BlockChains" }).findOne());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}
</script>

<template>
  <div v-if="page">
    <UMain class="flex justify-center items-center">
      <div class="inset-0 animate-pulse z-[-1] absolute landing-grid [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
      <!-- TODO: add the thress js effect to bg: https://threejs.org/examples/#webgl_interactive_cubes_ortho -->
      <ULandingHero :description="page.hero.description" :links="page.hero.links">
        <template #title> <span class="text-rainbow animate-pulse">UNI Bridge</span> for All BlockChains </template>
        <template #headline>
          <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="rounded-full font-semibold animate-bounce relative">
            <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
              <span class="inset-0 absolute" aria-hidden="true" />
            </NuxtLink>

            {{ page.hero.headline.label }}

            <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="h-4 ml-1 w-4 pointer-events-none" />
          </UBadge>
        </template>
      </ULandingHero>
    </UMain>

    <ULandingSection class="!pt-0" v-if="false">
      <Placeholder />
    </ULandingSection>

    <template v-if="page.sections">
      <ULandingSection
        v-for="(section, index) in page.sections"
        :key="index"
        :title="section.title"
        :description="section.description"
        :align="section.align"
        :features="section.features"
      >
        <Placeholder />
      </ULandingSection>
    </template>

    <template v-if="page.features">
      <ULandingSection :title="page.features.title" :description="page.features.description">
        <UPageGrid>
          <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
        </UPageGrid>
      </ULandingSection>
    </template>

    <template v-if="page.testimonials">
      <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
        <UPageColumns class="xl:columns-4">
          <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
            <ULandingTestimonial v-bind="testimonial" class="bg-gray-100/50 dark:bg-gray-800/50" />
          </div>
        </UPageColumns>
      </ULandingSection>
    </template>

    <ULandingSection v-if="page.cta">
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-500)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-500)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image: linear-gradient(to right, rgb(var(--color-gray-500)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-500)) 1px, transparent 1px);
  }
}
</style>
