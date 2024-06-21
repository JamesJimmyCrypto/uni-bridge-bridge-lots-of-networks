<script setup lang="ts">
const appConfig = useAppConfig();
const { isLoading, doLogin, updateRedirectUrl } = $(authStore());
onMounted(updateRedirectUrl);
</script>

<template>
  <UHeader :links="appConfig.links">
    <template #logo>
      <div class="flex text-rainbow animate-pulse text-2xl justify-center items-center">
        {{ appConfig.title }} <UBadge :label="appConfig.titleBadge" variant="subtle" class="mb-0.5 ml-2" />
      </div>
    </template>

    <template #right>
      <UButton label="Auth with X" :loading="isLoading" color="gray" @click="doLogin('twitter')" />
      <!-- <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
    </template>
  </UHeader>
</template>
