<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  value: string
  options: string[]
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  options: () => [],
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const expanded = ref(false)
const target = ref(null)

onClickOutside(target, () => expanded.value = false)

const keyCallbacks = {
  ArrowUp: inc,
  ArrowDown: dec,
  ArrowLeft: dec,
  ArrowRight: inc,
  KeyW: inc,
  KeyA: dec,
  KeyS: dec,
  KeyD: inc,
}

function inc() {
  // NOTE: Assumes no option exists twice
  const next = props.options[props.options.indexOf(props.value) + 1]
  if (next && next !== props.value) { emit('change', next) }
}

function dec() {
  // NOTE: Assumes no option exists twice
  const prev = props.options[props.options.indexOf(props.value) - 1]
  if (prev && prev !== props.value) { emit('change', prev) }
}

function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex gap-x-2 place-content-start w-full py-2 rounded-md bg-inherit"
      :aria-expanded="expanded"
      aria-haspopup="true"
      @keydown="keydown"
      @pointerup="expanded = true"
    >
      <svg
        class="-mr-1 size-4 text-gray-400 mt-0.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke-width="2"
          d="M 6,9
       L 6,9 12,16
       L 12,16 18,9
    "
        />
      </svg>
      {{ value }}
    </button>
  </div>
  <div
    v-if="expanded"
    ref="target"
    class="absolute left-0 top-6 z-10 mt-2 min-w-66 text-left origin-top-left rounded-md shadow-lg bg-inherit"
    style="background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider)"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div
      class="-m-10 p-10 select-none"
      role="none"
      @pointerleave="expanded = false"
    >
      <div class="py-1" role="none">
        <a
          v-for="option, i of options"
          :id="`menu-item-${i}`"
          :key="i"
          class="menu-item block px-5 py-1 bg-inherit"
          style="font-weight: normal; color: var(--vp-gray-1); cursor: pointer"
          role="menuitem"
          tabindex="-1"
          @pointerup="() => { emit('change', option); expanded = false }"
        >{{ option }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item:hover {
  background-color: var(--vp-c-gray-3);
}

svg {
  stroke: var(--vp-c-text-3);
  stroke-linecap: round;
}

button:hover svg {
  stroke: var(--vp-c-brand-1);
}

button:hover {
  color: var(--vp-c-brand-1);
}
</style>
