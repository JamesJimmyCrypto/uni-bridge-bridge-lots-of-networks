<script setup lang="ts">
const { isOpen, currentAccount, currentWallet, fromChain, listProviders, connectOrJump, fromWalletAppList, fromChainList, isLoading } = $(
  uniConnectorStore()
);

onMounted(() => {
  listProviders();
});
</script>

<template>
  <div id="uni-connector">
    <UButton v-if="!currentAccount" label="Connect Wallet" :loading="isLoading" color="primary" @click="isOpen = true" />

    <UPopover v-if="currentAccount" :popper="{ placement: 'bottom-end' }">
      <UButton color="white" block>
        <!-- <DicebearAvatar :seed="currentAccount" size="2xs" /> -->
        {{ shortAddress(currentAccount) }}
        <Avatar v-bind="currentWallet" />

        <!-- <span class="text-primary">{{ credBalance }} $CRED</span> -->
      </UButton>
      <template #panel>
        <UButton color="red" class="!text-white" @click="doLogout('metamask')"> Disconnect </UButton>
      </template>
    </UPopover>

    <UModal v-model="isOpen">
      <div class="p-6">
        <h2 class="font-bold text-center pb-6">Connect Wallet</h2>
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
