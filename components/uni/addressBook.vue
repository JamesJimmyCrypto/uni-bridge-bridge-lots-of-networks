<script setup lang="ts">
const {
  isAddressBookOpen,
  currentAccount,
  currentWallet,
  isWrongNetwork,
  forceSwitchChain,
  fromChain,
  connectOrJump,
  fromWalletAppList,
  fromChainList,
  isLoading,
} = $(uniConnectorStore());

let address = $ref("");
let addressLabel = $ref("");
let isShowAddForm = $ref(false);
const doAddAddress = async () => {};
</script>

<template>
  <div>
    <!-- <UButton color="red" v-if="isWrongNetwork" block @click="forceSwitchChain(fromChain, currentWallet)"> Switch network </UButton>
    <UButton class="group" v-else-if="currentAccount" color="white" block @click="isAddressBookOpen = true">
      <div class="hidden group-hover:block">Change wallet</div>
      <div class="flex-bc space-x-1 group-hover:hidden">
        <div>
          {{ shortAddress(currentAccount) }}
        </div>
        <Avatar v-bind="currentWallet" />
      </div>
    </UButton>
    <UButton v-else label="Add Address" icon="material-symbols:add" :loading="isLoading" color="primary" @click="isAddressBookOpen = true" /> -->
    <UButton label="Add Address" icon="material-symbols:add" :loading="isLoading" color="primary" @click="isAddressBookOpen = true" />

    <UModal v-model="isAddressBookOpen">
      <div class="p-6 relative">
        <h2 class="font-bold text-center pb-6">Address book</h2>
        <UButton
          icon="material-symbols:add"
          size="2xs"
          color="primary"
          @click="isShowAddForm = true"
          v-if="!isShowAddForm"
          variant="solid"
          class="top-6 right-6 absolute"
          :ui="{ rounded: 'rounded-full' }"
        />
        <div v-if="isShowAddForm" class="border rounded-md space-y-2 border-gray-700 text-sm p-4 text-gray-400 relative">
          <UButton
            icon="material-symbols:close-rounded"
            size="xs"
            color="primary"
            @click="isShowAddForm = false"
            variant="soft"
            class="-top-3 -right-3 absolute"
            :ui="{ rounded: 'rounded-full' }"
          />
          <div class="flex-bc">
            <div class="w-1/5">Label</div>
            <UInput variant="none" placeholder="Please input your address label" v-model="addressLabel" class="flex-1" />
          </div>
          <UDivider />
          <div class="flex-bc">
            <div class="w-1/5">Address</div>
            <UInput variant="none" placeholder="Please input your wallet address" v-model="address" class="flex-1" />
          </div>
          <div class="pt-2">
            <UButton @click="doAddAddress" label="Add new address" block variant="soft" />
          </div>
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
