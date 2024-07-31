<script setup lang="ts">
const { isLoading } = $defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div v-bind="$attrs">
    <div v-if="isLoading" class="flex-bc space-x-2">
      <UIcon name="eos-icons:loading" class="h-5 w-5" />
    </div>
    <slot v-else />
  </div>
</template>
