<script setup lang="ts">
let { isAddressBookOpen, toAddress } = $(uniConnectorStore());
const { addError, addSuccess } = $(notificationStore());

let addressBookList = $(useLocalStorage("uni-addressBookList", []));
let address = $ref("");
let label = $ref("");
let isShowAddForm = $ref(false);
onMounted(() => {
  if (addressBookList.length === 0) {
    isShowAddForm = true;
  }
});
const doAdd = async () => {
  if (addressBookList.find((item) => item.address === address)) {
    return addError("Address already exists");
  }
  if (addressBookList.find((item) => item.label === label)) {
    return addError("Label already exists");
  }
  addressBookList.push({
    address,
    label,
  });
  addSuccess("Address added successfully");
  address = "";
  label = "";
  isShowAddForm = false;
};

const doRemove = (item) => {
  useRemove(addressBookList, (i) => i.address === item.address);
  if (toAddress === item.address) {
    toAddress = "";
  }
};
const doSelectAddress = (item) => {
  toAddress = item.address;
  isAddressBookOpen = false;
};

const toAddressLabel = $computed(() => addressBookList.find((item) => item.address === toAddress)?.label);
</script>

<template>
  <div>
    <UButton class="group" v-if="toAddress" color="white" block @click="isAddressBookOpen = true">
      <div class="hidden group-hover:block">Change address</div>
      <div class="flex-bc space-x-1 group-hover:hidden">
        <div>
          {{ shortAddress(toAddress) }}
        </div>
        <div>[{{ toAddressLabel }}]</div>
      </div>
    </UButton>
    <UButton v-else label="Add Address" icon="material-symbols:add" color="primary" @click="isAddressBookOpen = true" />

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
        <div v-if="isShowAddForm" class="border rounded-md space-y-2 border-gray-700 text-sm mb-4 p-4 text-gray-400 relative">
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
            <UInput variant="none" placeholder="Please input your address label" v-model="label" class="flex-1" />
          </div>
          <UDivider />
          <div class="flex-bc">
            <div class="w-1/5">Address</div>
            <UInput variant="none" placeholder="Please input your wallet address" v-model="address" class="flex-1" />
          </div>
          <div class="pt-2">
            <UButton @click="doAdd" label="Add new address" block variant="soft" />
          </div>
        </div>
        <div class="space-y-3 py-4">
          <div v-for="item in addressBookList" :key="item.address" class="flex-bc space-x-2 group">
            <UButton class="flex-1" block :variant="toAddress === item.address ? 'soft' : 'ghost'" @click="doSelectAddress(item)">
              <UIcon v-if="toAddress === item.address" name="material-symbols:check" class="h-5 w-5" />
              <div v-else class="h-5 w-5"></div>
              <div class="flex-bc w-full">
                <div class="flex-1 text-left">
                  {{ shortAddress(item.address, 30) }}
                </div>
                <div class="flex-bc text-xs">
                  <i class="mr-3">{{ item.label }}</i>
                </div>
              </div>
            </UButton>
            <UButton icon="material-symbols:delete-outline" size="xs" class="opacity-0 group-hover:opacity-100" @click="doRemove(item)" />
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
