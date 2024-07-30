<script setup lang="ts">
interface item {
  id: string;
  label: string;
  avatar?: Object;
  icon?: string;
}
const { items } = $defineProps<{
  items: item[];
}>();

let { modelValue } = $defineModels<{
  modelValue?: item;
}>();

const updateModelValue = (value: item) => {
  modelValue = value;
};
</script>

<template>
  <UInputMenu :modelValue="modelValue" @update:modelValue="updateModelValue($event)" :options="items" v-bind="$attrs">
    <template #leading>
      <div v-if="modelValue" class="flex items-center">
        <UIcon v-if="modelValue?.icon" :name="(modelValue.icon as string)" class="h-5 w-5" />
        <UAvatar v-else-if="modelValue?.avatar" v-bind="modelValue.avatar" size="2xs" />
      </div>
      <div v-else></div>
    </template>
  </UInputMenu>
</template>
