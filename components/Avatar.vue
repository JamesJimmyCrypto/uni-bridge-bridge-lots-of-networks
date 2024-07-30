<script setup lang="ts">
const { icon, avatar, label } = $defineProps<{
  icon?: string;
  label?: string;
  avatar?: Avatar;
}>();
</script>

<template>
  <UIcon v-if="icon" :name="icon" class="h-5 w-5" />
  <UAvatar v-else-if="avatar" :alt="label" v-bind="avatar" size="2xs" />
</template>
