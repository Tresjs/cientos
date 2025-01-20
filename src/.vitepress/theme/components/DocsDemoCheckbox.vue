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
      <path
        v-if="value"
        fill="none"
        stroke-width="2"
        d="M 20,4
       L 20,4 13,15
       L 13,15 8,9
    "
      />
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

    <span class="ml-1">{{ value }}</span>
    <!--
    <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="red"
    stroke-width="2"
    d="M 1,1
       L 1,1 23,1
       L 23,23 1,23
       L 1,23 1,1
    " />
  <path
    fill="none"
    stroke="blue"
    stroke-width="2"
    d="M 6,9
       L 6,9 12,15
       L 12,15 18,9
    " />
  <path
    fill="none"
    stroke="black"
    stroke-width="2"
    d="M 21,3
       L 21,3 21,21
       L 21,21 3,21
       L 3,21 3,3
       L 3,3 21,3
    " />
  <path
    fill="none"
    stroke="black"
    stroke-width="2"
    d="M 21,9
       L 21,9 21,21
       L 21,21 3,21
       L 3,21 3,3
       L 3,3 15,3
    " />
  <path
    fill="none"
    stroke="black"
    stroke-width="2"
    d="M 21,3
       L 21,3 12,15
       L 12,15 9,9
    " />
</svg>
-->
  </button>
</template>
