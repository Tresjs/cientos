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
      class="flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit shadow-sm"
      tabindex="-1"
    >
      <svg v-if="!active" class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
      <input
        ref="target"
        type="text"
        :value="value"
        class="border rounded-full px-5.5 w-full"
        style="background-color: var(--vp-c-gray-soft)"
        :style="{ opacity: active ? 1 : 0, position: active ? 'relative' : 'absolute' }"
        @keyup="keyup"
      />
      <template v-if="!active">
        {{ value }}
      </template>
    </button>
  </div>
</template>
