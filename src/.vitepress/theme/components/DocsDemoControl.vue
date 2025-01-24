<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>

<template>
  <div class="control grid grid-cols-3 gap-4 px-6 text-sm">
    <div class="py-2 whitespace-nowrap">{{ props.label }}</div>
    <div class="relative col-span-2 block text-left w-full bg-inherit"><slot></slot></div>
  </div>
</template>

<style scoped>
.control {
  border: 1px solid var(--vp-c-divider);
  border-width: 0.5px 1px;
  border-style: dotted solid;
}
.control:first-child {
  padding-top: 12px;
}
.control:last-child {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-width: 1px;
  padding-bottom: 12px;
  border-bottom-style: solid;
}
</style>
