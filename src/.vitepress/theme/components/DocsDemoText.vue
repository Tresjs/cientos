<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useActiveElement } from '@vueuse/core'

interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const target = ref<HTMLInputElement>()
const button = ref<HTMLButtonElement>()

const activeElement = useActiveElement()

const active = computed(() => {
  const a = activeElement.value
  return a === target.value || a === button.value
})

const keyCallbacks = {
  ArrowUp: () => {},
}

function keyup(e: KeyboardEvent) {
  // NOTE: Don't handle tab. Doing so would interfere with users
  // "tabbing" through controls and other HTML elements.
  if (e.key === 'Tab') { return }
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.target) { emit('change', (e.target as HTMLInputElement)!.value) }
}
</script>

<template>
  <div
    class="relative w-full bg-inherit py-1"
    tabindex="-1"
  >
    <input
      ref="target"
      type="text"
      :value="value"
      class="w-full h-full px-5 py-1 rounded-1"
      @keyup="keyup"
    />
  </div>
</template>

<style scoped>
input {
  background: var(--vp-input-bg-color);
}

input:hover {
  color: var(--vp-c-brand-1);
}
</style>
