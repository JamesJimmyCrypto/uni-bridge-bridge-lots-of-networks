<script setup lang="ts">
const {
  isConnectorOpen,
  currentAccount,
  currentWallet,
  isWrongNetwork,
  forceSwitchChain,
  fromChain,
  listProviders,
  connectOrJump,
  fromWalletAppList,
  fromChainList,
  isLoading,
} = $(uniConnectorStore());

onMounted(() => {
  listProviders();
});
</script>

<template>
  <div>
    <UButton color="red" v-if="isWrongNetwork" block @click="forceSwitchChain(fromChain, currentWallet)"> Switch network </UButton>
    <UButton class="group" v-else-if="currentAccount" color="white" block @click="isConnectorOpen = true">
      <div class="hidden group-hover:block">Change wallet</div>
      <div class="flex-bc space-x-1 group-hover:hidden">
        <div>
          {{ shortAddress(currentAccount) }}
        </div>
        <Avatar v-bind="currentWallet" />
      </div>
    </UButton>
    <UButton v-else label="Connect Wallet" :loading="isLoading" color="primary" @click="isConnectorOpen = true" />

    <UModal v-model="isConnectorOpen">
      <div class="p-6">
        <h2 class="font-bold text-center pb-6">{{ currentAccount ? "Change wallet" : "Connect wallet" }}</h2>
        <div class="flex space-x-2 justify-between items-center">
          <div>Supported wallet list</div>
          <BridgeInputMenu class="w-2/5" :items="fromChainList" v-model="fromChain" placeholder="Select chain" />
        </div>
        <div class="space-y-3 py-8">
          <div v-if="fromWalletAppList.length === 0" class="text-center text-red-400">Please select chain first.</div>
          <UButton block variant="soft" v-for="item in fromWalletAppList" :key="item.rdns" @click="connectOrJump(item.rdns)">
            <template #leading>
              <UIcon v-if="item?.icon" :name="(item.icon as string)" class="h-5 w-5" />
              <UAvatar v-else-if="item?.avatar" v-bind="(item.avatar as Avatar)" size="2xs" />
            </template>
            <div class="flex-bc w-full">
              <div>
                {{ item.label }}
              </div>
              <div class="flex-bc text-xs" v-if="!item.isInstalled">Click to install <UIcon name="pajamas:external-link" class="h-5 ml-2 w-5" /></div>
            </div>
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
