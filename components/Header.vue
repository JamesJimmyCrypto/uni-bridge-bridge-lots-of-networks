<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const appConfig = useAppConfig();
</script>

<template>
  <UHeader :links="appConfig.links">
    <template #logo>{{ appConfig.title }} <UBadge :label="appConfig.titleBadge" variant="subtle" class="mb-0.5" /> </template>

    <template #right>
      <!-- <UButton label="Sign in" color="gray" to="/login" />
      <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
      <UButton to="https://twitter.com/HelloRWA" target="_blank" icon="i-simple-icons-twitter" aria-label="Twitter" color="gray" variant="ghost" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
