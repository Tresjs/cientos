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

function doStep(i: number) {
  const currI = Math.round(props.value / props.step)
  const nextValue = clamp(props.step * (currI + i), props.min, props.max)
  if (nextValue !== props.value) { emit('change', nextValue) }
}

function keydown(e: KeyboardEvent) {
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
}
</script>

<template>
  <div class="w-full py-2">
    <button
      type="button"
      class="w-full relative"
      @keydown="keydown"
      @pointerdown="e => { (e.target as HTMLDivElement)!.setPointerCapture(e.pointerId); active = true; pointermove() }"
      @pointerup="e => { (e.target as HTMLDivElement)!.releasePointerCapture(e.pointerId); active = false; e.stopPropagation() }"
      @pointermove="e => { if (active) { pointermove() } }"
    >
      <div class="value relative pointer-events-none rounded-full w-full text-left -top-0.5">
        {{ displayV }}
      </div>

      <div class="absolute w-full h-7 -my-3">
        <div class="slider-bar overflow-hidden top-0 mt-2.5 h-0.5 w-full rounded-full">
          <!-- Filled Bar -->
          <div
            class="slider-bar-filled relative top-0 h-full w-full"
            :style="{ right: `${Math.max(elementWidth - sliderV, 0)}px` }"
          >
          </div>
        </div>
        <div ref="el" class="mr-2">
          <div
            class="knob relative w-3"
            :class="(sliderV === 0) ? 'is-empty' : 'is-not-empty'"
            :style="{ left: `${Math.max(sliderV, 0)}px` }"
          >
            <div
              class="relative rounded-full h-2 w-2 -mt-1.25"
            ></div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.slider-bar {
  background-color: var(--vp-c-gray-2);
}

.slider-bar-filled {
  background-color: var(--vp-c-brand-1);
}

button:hover .slider-bar-filled {
  background-color: var(--vp-c-brand-1);
}

.knob > div {
  background-color: var(--vp-c-brand-1);
}

.knob.is-empty > div {
  background-color: var(--vp-c-gray-1);
}

button:hover .knob > div {
  box-shadow: 0px 0px 0px 5px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}

button:hover .knob.is-empty > div {
  box-shadow: 0px 0px 0px 5px color-mix(in srgb, var(--vp-c-gray-1) 20%, transparent);
}

button:active .knob > div {
  z-index: 100;
  box-shadow: 0px 0px 0px 10px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}

button:active .knob.is-empty > div {
  box-shadow: 0px 0px 0px 10px color-mix(in srgb, var(--vp-c-gray-1) 20%, transparent);
}

button {
  cursor: grab;
}

button:active {
  cursor: grabbing;
}
</style>
