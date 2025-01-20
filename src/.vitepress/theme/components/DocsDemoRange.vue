<script setup lang="ts">
import { clamp, useElementSize, useMouseInElement } from '@vueuse/core'
import { computed, ref } from 'vue'

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

const displayV = computed(() => (props.step % 1) ? Math.trunc(props.value * 100) / 100 : Math.floor(props.value))
const sliderV = computed(() => clamp((props.value - props.min) / (props.max - props.min) * elementWidth.value, 0, elementWidth.value))
const active = ref(false)
const hovered = ref(false)
const visible = computed(() => active.value || hovered.value)

function pointermove() {
  let nextValue = props.value
  if (elementX.value <= 0) {
    nextValue = props.min
  }
  else if (elementX.value >= elementWidth.value) {
    nextValue = props.max
  }
  else {
    const n = elementX.value / elementWidth.value
    const unstepped = (n * (props.max - props.min) + props.min)
    const unclamped = Math.floor(unstepped / props.step) * props.step
    nextValue = clamp(unclamped, props.min, props.max)
  }
  if (nextValue !== props.value) {
    emit('change', nextValue)
  }
}

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
function inc() { const nextValue = clamp(props.value + props.step, props.min, props.max); if (nextValue !== props.value) { emit('change', nextValue) } }
function dec() { const nextValue = clamp(props.value - props.step, props.min, props.max); if (nextValue !== props.value) { emit('change', nextValue) } }
function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit"
      @pointerenter="() => { hovered = true }"
      @pointerdown="() => { hovered = true }"
      @pointerleave="() => { hovered = false }"
      @keydown="keydown"
    >
      <div
        ref="el"
        class="slider-bar absolute overflow-hidden top-0 m-r-4 h-full w-95% rounded-full"
        style="border: 1px solid var(--vp-input-border-color); background-color: var(--vp-c-gray-soft);"
        @pointerdown="e => { (e.target as HTMLDivElement)!.setPointerCapture(e.pointerId); active = true }"
        @pointerup="e => { (e.target as HTMLDivElement)!.releasePointerCapture(e.pointerId); active = false }"
        @pointermove="e => { if (active) { pointermove() } }"
      >
        <div
          class="relative top-0 h-full w-full"
          :style="{ right: `${Math.max(elementWidth - sliderV, 0)}px` }"
          style="background-color: var(--vp-c-gray-1)"
        >
        </div>
      </div>
      <svg :style="{ visibility: visible ? 'hidden' : 'visible' }" class="z-10 -mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
      <div
        class="relative pointer-events-none px-4 right-4 rounded-full"
        style="background-color: var(--vp-c-bg)"
      >
        {{ displayV }}
      </div>
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
