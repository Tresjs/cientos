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
  <div>
    <button
      ref="button"
      type="button"
      class="relative flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit"
      tabindex="-1"
    >
      <input
        ref="target"
        type="text"
        :value="value"
        class="absolute -top-1 h-7 px-4.5 ml-1 w-full rounded-1"
        style="border: 1px solid var(--vp-c-gray-1)"
        @keyup="keyup"
      />
    </button>
  </div>
</template>
