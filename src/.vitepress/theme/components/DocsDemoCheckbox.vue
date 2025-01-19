<script setup lang="ts">
interface Props {
  value: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: true,
})

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

const keyCallbacks = {
  ArrowUp: toggle,
  ArrowDown: toggle,
  ArrowLeft: toggle,
  ArrowRight: toggle,
  KeyW: toggle,
  KeyA: toggle,
  KeyS: toggle,
  KeyD: toggle,
}
function toggle() { emit('change', !props.value) }
function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
}
</script>

<template>
  <button
    type="button"
    class="flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit shadow-sm"
    @click="toggle"
    @keydown="keydown"
  >
    <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
    {{ props.value }}
  </button>
</template>
