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
    class="flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit"
    @click="toggle"
    @keydown="keydown"
  >
    <svg
      class="-mr-1 size-4 text-gray-400 ml-0.5 mt-0.5"
      style="stroke: var(--vp-c-text-3); stroke-linecap: round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Tick mark -->
      <path
        v-if="value"
        fill="none"
        stroke-width="2"
        d="M 20,4
       L 20,4 13,15
       L 13,15 9,10
    "
      />
      <!-- Ticked box -->
      <path
        v-if="value"
        fill="none"
        stroke-width="2"
        d="M 20,11
       L 20,11 20,20
       L 20,20 4,20
       L 4,20 4,4
       L 4,4 15,4
    "
      />
      <!-- Empty box -->
      <path
        v-if="!value"
        fill="none"
        stroke-width="2"
        d="M 20,4
       L 20,4 20,20
       L 20,20 4,20
       L 4,20 4,4
       L 4,4 20,4
    "
      />
    </svg>
    <span>{{ value }}</span>
  </button>
</template>
