<script setup lang="ts">
const items = [
  {
    name: "ETH",
    icon: "token-branded:eth",
  },
  {
    name: "BTC",
    icon: "token-branded:btc",
  },
  {
    name: "Polygon",
    icon: "token-branded:polygon-zkevm",
  },
  {
    name: "Polkadot",
    icon: "token-branded:polkadot",
  },
  {
    name: "Arweave",
    icon: "token-branded:ar",
  },
];
</script>

<template>
  <ul role="list" class="divide-y divide-gray-800">
    <li v-for="item in items" :key="item.name" class="flex py-5 gap-x-6 justify-between">
      <div class="flex min-w-0 gap-x-4">
        <UIcon :name="item.icon" class="bg-white rounded-full flex-none h-12 p-1 w-12" />
        <div class="flex-auto min-w-0">
          <p class="font-semibold text-sm text-white leading-6">{{ item.name }}</p>
          <p class="mt-1 text-xs text-gray-400 leading-5 truncate">{{ item.email }}</p>
        </div>
      </div>
      <div v-if="false" class="hidden sm:flex sm:flex-col shrink-0 sm:items-end">
        <p class="text-sm text-white leading-6">{{ item.role }}</p>
        <p v-if="item.lastSeen" class="mt-1 text-xs text-gray-400 leading-5">
          Last seen <time :datetime="item.lastSeenDateTime">{{ item.lastSeen }}</time>
        </p>
        <div v-else class="flex mt-1 gap-x-1.5 items-center">
          <div class="rounded-full flex-none bg-emerald-500/20 p-1">
            <div class="rounded-full bg-emerald-500 h-1.5 w-1.5" />
          </div>
          <p class="text-xs text-gray-400 leading-5">Online</p>
        </div>
      </div>
    </li>
  </ul>
</template>
