<script setup lang="ts">
const appConfig = useAppConfig();
const { isLoading, doLogin, address, doLogout } = $(authStore());
const { userId } = $(supabaseStore());
</script>

<template>
  <UHeader :links="appConfig.links">
    <template #logo>
      <div class="flex text-rainbow animate-pulse text-2xl justify-center items-center">
        {{ appConfig.title }} <UBadge :label="appConfig.titleBadge" variant="subtle" class="mb-0.5 ml-2" />
      </div>
    </template>

    <template #right>
      <UPopover v-if="address" :popper="{ placement: 'bottom-end' }">
        <UButton color="white" block>
          <!-- <UAvatar :src="selectedWallet.iconUrl" :alt="selectedWallet.label" size="2xs" />
        {{ currentChain }} -->
          <DicebearAvatar :seed="address" size="2xs" />
          {{ shortAddress(address) }}
          <!-- <span class="text-primary">{{ credBalance }} $CRED</span> -->
        </UButton>
        <template #panel>
          <UButton color="red" class="!text-white" @click="doLogout('metamask')"> Disconnect </UButton>
        </template>
      </UPopover>
      <UButton v-else label="Connect Wallet" :loading="isLoading" color="gray" @click="doLogin('metamask')" />
      <UButton v-if="!userId" label="Auth with X" :loading="isLoading" color="gray" @click="doLogin('twitter')" />
    </template>
  </UHeader>
</template>
