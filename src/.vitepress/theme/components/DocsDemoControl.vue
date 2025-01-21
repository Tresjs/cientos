<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>

<template>
  <div class="control grid grid-cols-5 gap-4 p-y-1 p-x-4 text-sm">
    <div class="py-1 whitespace-nowrap">{{ props.label }}</div>
    <div class="py-1 relative col-span-4 block text-left w-full bg-inherit"><slot></slot></div>
  </div>
</template>

<style scoped>
.control {
  border: 1px solid var(--vp-c-divider);
  border-width: 0 1px;
}
.control:last-child {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-width: 1px;
}
</style>
