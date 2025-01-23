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
const active = ref(false)
const canvas = ref()
const { elementX: canvasX, elementY: canvasY, elementWidth: canvasW } = useMouseInElement(canvas)

onClickOutside(canvas, () => active.value = false)

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
  active.value = false
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](e); e.stopPropagation(); e.preventDefault() }
}

function pointermove(e: PointerEvent) {
  const swatchesPerSide = Math.ceil(Math.sqrt(props.options.length))
  const swatchSize = Math.floor(canvasW.value / swatchesPerSide)
  const col = clamp(Math.floor(canvasX.value / swatchSize), 0, swatchesPerSide - 1)
  const row = clamp(Math.floor(canvasY.value / swatchSize), 0, swatchesPerSide - 1)
  const i = clamp(row * swatchesPerSide + col, 0, props.options.length - 1)
  const hex = props.options[i]
  if (hex !== props.value) { emit('change', hex) }
}

watch([canvas, props.options], ([canvas]) => {
  if (canvas && props.options?.length) {
    const context = canvas.getContext('2d')
    const w = canvas.width
    const swatchesPerSide = Math.ceil(Math.sqrt(props.options.length))
    const stride = w / swatchesPerSide

    for (let i = 0; i < props.options.length; i++) {
      const row = Math.floor(i / swatchesPerSide)
      const col = Math.floor(i % swatchesPerSide)
      context.fillStyle = props.options[i]
      context.fillRect(col * stride + 1, row * stride + 1, stride - 1, stride - 1)
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
    type="button"
    class="flex place-content-start w-full gap-x-1 rounded-md bg-inherit relative"

    @pointerdown="(e: PointerEvent) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); active = true }"
    @pointerup="(e: PointerEvent) => { (e.target as HTMLDivElement)!.releasePointerCapture(e.pointerId); active = false }"
    @pointermove="(e) => { if (active) { pointermove(e) } }"
    @keydown="keydown"
  >
    <div class="pl-1 block swatch" :style="{ color: hex }">&#9632;</div>
    <div>{{ hex }}</div>
    <div
      class="absolute z-100 -left-100px -top-100px shadow-2xl"
      style="padding: 5px; background-color: var(--vp-input-bg-color)"
      :style="{ display: active ? 'block' : 'none' }"
    >
      <canvas
        ref="canvas"
        height="200"
        width="200"
      ></canvas>
    </div>
  </button>
</template>

<style scoped>
.swatch {
  text-shadow:
    -1px -1px 0 var(--vp-input-border-color),
    1px -1px 0 var(--vp-input-border-color),
    -1px 1px 0 var(--vp-input-border-color),
    1px 1px 0 var(--vp-input-border-color);
}
</style>
