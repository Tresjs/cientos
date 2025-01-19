<script setup lang="ts">
import { clamp, useElementSize, useMouseInElement } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

interface Props {
  value: number
  min: number
  max: number
  step: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  min: 0,
  max: 1,
  step: 0.01,
})

const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const el = ref(null)
const { elementX, elementWidth } = useMouseInElement(el)

const v = ref(props.value)
const displayV = computed(() => (props.step % 1) ? Math.trunc(v.value * 100) / 100 : Math.floor(v.value))
const sliderV = computed(() => clamp((v.value - props.min) / (props.max - props.min) * elementWidth.value, 0, elementWidth.value))
const active = ref(false)
const hovered = ref(false)
const visible = computed(() => active.value || hovered.value)

watch(() => props.value, (value) => { v.value = value })

function pointermove(e) {
  if (elementX.value <= 0) {
    v.value = props.min
  }
  else if (elementX.value >= elementWidth.value) {
    v.value = props.max
  }
  else {
    const n = elementX.value / elementWidth.value
    const unstepped = (n * (props.max - props.min) + props.min)
    const unclamped = Math.floor(unstepped / props.step) * props.step
    v.value = clamp(unclamped, props.min, props.max)
    emit('change', v.value)
  }
}

const keyCallbacks = {
  ArrowUp: inc,
  ArrowDown: inc,
  ArrowLeft: dec,
  ArrowRight: inc,
  KeyW: inc,
  KeyA: dec,
  KeyS: dec,
  KeyD: inc,
}
function inc() { v.value = clamp(v.value + props.step, props.min, props.max) }
function dec() { v.value = clamp(v.value - props.step, props.min, props.max) }
function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation() }
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex place-content-end w-full text-base gap-x-1.5 rounded-md px-3 py-2 bg-inherit shadow-sm"
      @pointerenter="() => { hovered = true }"
      @pointerdown="() => { hovered = true }"
      @pointerleave="() => { hovered = false }"
      @keydown="keydown"
    >
      <div
        ref="el"
        class="slider-bar absolute overflow-hidden top-0 h-full w-full rounded-full "
        style="border: 1px solid var(--vp-input-border-color); background-color: var(--vp-c-brand-1);"
        @pointerdown="e => { e.target.setPointerCapture(e.pointerId); active = true }"
        @pointerup="e => { e.target.releasePointerCapture(e.pointerId); active = false }"
        @pointermove="e => { if (active) { pointermove(e) } }"
      >
        <div
          class="absolute top-0 h-full w-full"
          :style="{ left: `${Math.max(sliderV, 0)}px` }"
          style="background-color: var(--vp-input-bg-color);"
        >
        </div>
      </div>
      <div
        class="relative pointer-events-none px-2 left-2 rounded-full"
        style="background-color: var(--vp-c-bg);"
      >
        {{ displayV }}
      </div>
      <svg :style="{ visibility: visible ? 'hidden' : 'visible' }" class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.slider-bar {
  opacity: 0;
  transition: opacity 400ms;
}
.slider-bar:hover {
  opacity: 1;
}

button:hover {
  cursor: ew-resize;
}
</style>
