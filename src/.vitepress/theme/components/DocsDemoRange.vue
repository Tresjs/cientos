<script setup lang="ts">
import { clamp, useMouseInElement } from '@vueuse/core'
import { computed, ref } from 'vue'

interface Props {
  value: number
  min: number
  max: number
  step?: number
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

const displayV = computed(() => {
  const vPrec = props.value.toPrecision(5)
  const vStr = `${Math.trunc(props.value * 100) / 100}`
  return vPrec.length < vStr.length ? vPrec : vStr
})
const sliderV = computed(() => clamp((props.value - props.min) / (props.max - props.min) * elementWidth.value, 0, elementWidth.value))
const active = ref(false)

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
    const lerped = (n * (props.max - props.min) + props.min)
    const stepped = Math.round(lerped / props.step) * props.step
    nextValue = clamp(stepped, props.min, props.max)
  }
  if (nextValue !== props.value) {
    emit('change', nextValue)
  }
}

const keyCallbacks = {
  ArrowUp: (e: KeyboardEvent) => doStep(e.shiftKey ? 10 : 1),
  ArrowDown: (e: KeyboardEvent) => doStep(e.shiftKey ? -10 : -1),
  ArrowLeft: (e: KeyboardEvent) => doStep(e.shiftKey ? -10 : -1),
  ArrowRight: (e: KeyboardEvent) => doStep(e.shiftKey ? 10 : 1),
  KeyW: (e: KeyboardEvent) => doStep(e.shiftKey ? 10 : 1),
  KeyA: (e: KeyboardEvent) => doStep(e.shiftKey ? -10 : -1),
  KeyS: (e: KeyboardEvent) => doStep(e.shiftKey ? -10 : -1),
  KeyD: (e: KeyboardEvent) => doStep(e.shiftKey ? 10 : 1),
}

function doStep(n: number) {
  const currI = Math.round(props.value / props.step)
  const nextValue = clamp(props.step * (currI + n), props.min, props.max)
  if (nextValue !== props.value) { emit('change', nextValue) }
}

function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex place-content-start w-full gap-x-1.5 rounded-md bg-inherit"
      @keydown="keydown"
    >
      <div
        class="relative pointer-events-none rounded-full w-36 text-left pl-5"
        style="background-color: var(--vp-c-bg)"
      >
        {{ displayV }}
      </div>

      <div
        class="relative w-full h-7 -my-1"
        @pointerdown="e => { (e.target as HTMLDivElement)!.setPointerCapture(e.pointerId); active = true; pointermove() }"
        @pointerup="e => { (e.target as HTMLDivElement)!.releasePointerCapture(e.pointerId); active = false }"
        @pointermove="e => { if (active) { pointermove() } }"
      >
        <div
          ref="el"
          class="slider-bar overflow-hidden top-0 mt-3 h-1 w-full rounded-full"
          style="border: 1px solid var(--vp-input-border-color);"
        >
          <!-- Filled Bar -->
          <div
            class="relative top-0 h-full w-full"
            :style="{ right: `${Math.max(elementWidth - sliderV, 0)}px` }"
            style="background-color: var(--vp-c-gray-1)"
          >
          </div>
        </div>
        <!-- Knob -->
        <div
          class="relative w-4"
          :style="{ left: `${Math.max(sliderV, 0)}px` }"
        >
          <div
            class="relative rounded-full h-3 w-3 -ml-2 -mt-2"
            style="background-color: var(--vp-c-gray-1); border: 1px solid var(--vp-input-border-color)"
          ></div>
        </div>
      </div>
    </button>
  </div>
</template>
