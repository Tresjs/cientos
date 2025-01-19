<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>

<template>
  <div class="control grid grid-cols-2 gap-4 p-y-1 p-x-4">
    <div class="p-t-2">{{ props.label }}</div>
    <div class="relative block text-right w-full bg-inherit"><slot></slot></div>
  </div>
</template>

<style scoped>
.control {
  border: 1px solid var(--vp-c-divider);
  border-top: 0;
}
.control:last-child {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
