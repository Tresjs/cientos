<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>

<template>
  <div class="control grid grid-cols-3 gap-4 p-x-4 text-sm">
    <div class="py-2 whitespace-nowrap">{{ props.label }}</div>
    <div class="py-2 relative col-span-2 block text-left w-full bg-inherit"><slot></slot></div>
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
