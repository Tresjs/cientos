<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside, useMouseInElement } from '@vueuse/core'
import { clamp, lerp } from 'three/src/math/MathUtils'

interface Props {
  value: string
  options?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  value: '#FF0000',
  options: () => getNOptions(12 * 12),
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const SWATCH_SIZE = 14
const canvasSize = computed(() => SWATCH_SIZE * Math.ceil(Math.sqrt(props.options.length)) + 1)

function normalizeHexString(s: string) {
  if (!s.startsWith('#')) { s = `#${s}` }

  s = s.toUpperCase()
  const length = s.length
  if (length === 4) {
    const [_, a, b, c] = s.split('')
    return `#${a}${a}${b}${b}${c}${c}`
  }
  if (length === 7) {
    return s
  }

  return '#FF0000'
}

const hex = computed(() => normalizeHexString(props.value))
const expanded = ref(false)
const target = ref()
const canvas = ref()

const { elementX: canvasX, elementY: canvasY, isOutside: isOutsideCanvas } = useMouseInElement(canvas)
onClickOutside(target, () => expanded.value = false)

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
  const i = clamp(props.options.indexOf(props.value) + n, 0, props.options.length - 1)
  const nextValue = props.options[i]
  if (nextValue !== props.value) { emit('change', nextValue) }
}

function keydown(e: KeyboardEvent) {
  expanded.value = false
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
}

function pointermove(e: PointerEvent) {
  if (isOutsideCanvas.value) { return }
  const swatchesPerSide = Math.ceil(Math.sqrt(props.options.length))
  const col = clamp(Math.floor(canvasX.value / SWATCH_SIZE), 0, swatchesPerSide - 1)
  const row = clamp(Math.floor(canvasY.value / SWATCH_SIZE), 0, swatchesPerSide - 1)
  const i = clamp(row * swatchesPerSide + col, 0, props.options.length - 1)
  const hex = props.options[i]
  if (hex !== props.value) { emit('change', hex) }
}

watch([canvas, props.options], ([canvas]) => {
  if (canvas && props.options?.length) {
    const context = canvas.getContext('2d')
    const swatchesPerSide = Math.ceil(Math.sqrt(props.options.length))

    context.fillStyle = 'rgba(0, 0, 0, 0.5)'
    context.fillRect(0, 0, swatchesPerSide * SWATCH_SIZE + 1, swatchesPerSide * SWATCH_SIZE + 1)

    for (let i = 0; i < props.options.length; i++) {
      const row = Math.floor(i / swatchesPerSide)
      const col = Math.floor(i % swatchesPerSide)
      context.fillStyle = props.options[i]
      context.fillRect(col * SWATCH_SIZE + 1, row * SWATCH_SIZE + 1, SWATCH_SIZE - 1, SWATCH_SIZE - 1)
      context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      context.strokeRect(col * SWATCH_SIZE + 1, row * SWATCH_SIZE + 1, SWATCH_SIZE - 1, SWATCH_SIZE - 1)
    }
  }
})
</script>

<script lang="ts">
function getNOptions(n: number) {
  const swatchesPerSide = Math.ceil(Math.sqrt(n))
  const result: string[] = []

  // NOTE: First row: fully saturated colors
  for (let i = swatchesPerSide; i < swatchesPerSide * 2; i++) {
    const h = (i / swatchesPerSide) % 1
    result.push(hslToHex(h, 1, 0.5))
  }

  // NOTE: Second row: grayscale
  for (let i = 0; i < swatchesPerSide; i++) {
    result.push(hslToHex(0, 0, 1 - i / (swatchesPerSide - 1)))
  }

  // NOTE: Remaining rows: increasing luminosity by row
  const numRemainingRows = swatchesPerSide - 2
  for (let i = 0; i < numRemainingRows * swatchesPerSide; i++) {
    const row = Math.floor(i / swatchesPerSide)
    const h = (0.5 + i / swatchesPerSide) % 1
    const l = lerp(0.1, 1.0, row / numRemainingRows)

    result.push(hslToHex(h, 0.75, l))
  }
  return result
}

// NOTE: Source https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/
// All args in [0,1]
function hslToHex(h: number, s: number, l: number): string {
  const hDecimal = l
  const a = (s * Math.min(hDecimal, 1 - hDecimal))
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
</script>

<template>
  <button
    ref="target"
    type="button"
    class="relative py-2 flex place-content-start gap-x-2 rounded-md bg-inherit"
    :style="{ minWidth: `${canvasSize}px` }"
    @pointerup="expanded = true"
    @pointerleave="expanded = false"
    @pointermove="(e:PointerEvent) => { if (expanded) { pointermove(e) } }"
    @keydown="keydown"
  >
    <div class="swatch block" :style="{ color: hex }">&#9632;</div>
    <div class="hex">{{ hex }}</div>
    <div
      class="absolute z-100 -m-8 p-8 bottom-8"
      :style="{ display: expanded ? 'block' : 'none' }"
      @pointerleave="expanded = false"
    >
      <div
        class="relative p-2 rounded-md ring-1 ring-black-500/50 inset-shadow-sm inset-shadow-red shadow-lg bg-inherit"
        style="background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider)"
        @pointerup="e => { expanded = false; e.stopPropagation() }"
      >
        <canvas
          ref="canvas"
          :height="canvasSize"
          :width="canvasSize"
        ></canvas>
        <div
          class="absolute inset-ring-black-1 ring-1"
          :style="{
            border: `1px solid rgba(0.5, 0.5, 0.5, 0.5)`,
            backgroundColor: value,
            display: options.includes(value) ? 'block' : 'none',
            margin: '4px 4px',
            height: `${SWATCH_SIZE + 8}px`,
            width: `${SWATCH_SIZE + 8}px`,
            left: `${SWATCH_SIZE * (options.indexOf(value) % Math.floor(Math.sqrt(options.length)))}px`,
            top: `${SWATCH_SIZE * Math.floor(options.indexOf(value) / Math.sqrt(options.length))}px`,
          }"
        ></div>
      </div>
    </div>
  </button>
</template>

<style scoped>
button:hover .hex {
  color: var(--vp-c-brand-1);
}

.swatch {
  text-shadow:
    -1px -1px 0 var(--vp-input-border-color),
    1px -1px 0 var(--vp-input-border-color),
    -1px 1px 0 var(--vp-input-border-color),
    1px 1px 0 var(--vp-input-border-color);
}

button:hover .swatch {
  text-shadow:
    -1px -1px 0 var(--vp-c-brand-1),
    1px -1px 0 var(--vp-c-brand-1),
    -1px 1px 0 var(--vp-c-brand-1),
    1px 1px 0 var(--vp-c-brand-1);
}
</style>
